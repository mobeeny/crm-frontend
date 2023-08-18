import React, { useState, useEffect, useContext } from "react";
import { TextField, Button, Grid, Paper } from "@mui/material";
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
        <Grid container justifyContent="center">
            <Grid item xs={10} sm={8} md={6} lg={4}>
                <Paper elevation={3} style={{ padding: "16px" }}>
                    <TextField
                        label="Name"
                        fullWidth
                        value={userData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        value={userData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        label="Phone Number"
                        fullWidth
                        value={userData.phoneNumber}
                        onChange={(e) =>
                            handleChange("phoneNumber", e.target.value)
                        }
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleSave()}
                    >
                        Save
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default GeneralSettings;
