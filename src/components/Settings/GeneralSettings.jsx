import React, { useState, useEffect, useContext } from "react";
import { TextField, Button, Paper, Stack } from "@mui/material";
import { auth, db } from "../../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NotificationContext } from "../NotificationSnackbar";

const GeneralSettings = () => {
    const currentUser = auth.currentUser;
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
    });

    const showNotification = useContext(NotificationContext);

    useEffect(() => {
        const fetchUser = async () => {
            let userRef = doc(db, "instances", currentUser.uid);
            let userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                console.log("Document data:", userSnap.data());
                setUserData(userSnap.data());
            } else {
                console.log("No such document!");
                showNotification("error", "No such Document exists");
            }
        };
        fetchUser();
    }, [currentUser.uid]);

    const handleChange = (field, value) => {
        setUserData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSave = async () => {
        let userRef = doc(db, "instances", currentUser.uid);
        try {
            await updateDoc(userRef, userData);
            showNotification("success", "information Updated");
        } catch (error) {
            showNotification("error", "Error fetching Template");
        }
    };

    return (
        <Paper elevation={1} sx={{ padding: "24px", maxWidth: "295px" }}>
            <Stack spacing={2}>
                <TextField
                    label="Name"
                    variant="standard"
                    sx={{ width: "250px" }}
                    value={userData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Email"
                    variant="standard"
                    sx={{ width: "250px" }}
                    value={userData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Phone Number"
                    variant="standard"
                    sx={{ width: "250px" }}
                    value={userData.phoneNumber}
                    onChange={(e) =>
                        handleChange("phoneNumber", e.target.value)
                    }
                    margin="normal"
                />
                <Button
                    variant="contained"
                    sx={{ width: "250px" }}
                    color="primary"
                    onClick={() => handleSave()}
                >
                    Save
                </Button>
            </Stack>
        </Paper>
    );
};

export default GeneralSettings;
