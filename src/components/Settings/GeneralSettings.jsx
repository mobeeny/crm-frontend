import React, { useState, useEffect, useContext } from "react";
import {
    TextField,
    Button,
    Paper,
    Stack,
    Grid,
    Typography,
    Avatar,
    IconButton,
    Box,
} from "@mui/material";
import { auth, db } from "../../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NotificationContext } from "../NotificationSnackbar";
import ClearIcon from "@mui/icons-material/Clear";

const GeneralSettings = () => {
    const currentUser = auth.currentUser;
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        profilePicture: "",
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

    const handleImageUpload = (event) => {
        const imageFile = event.target.files[0];
        if (imageFile) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64Image = reader.result;
                setUserData((prevData) => ({
                    ...prevData,
                    profilePicture: base64Image,
                }));
            };

            reader.readAsDataURL(imageFile);
        }
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

    const clearImage = () => {
        setUserData((prevData) => ({
            ...prevData,
            profilePicture: "",
        }));
        console.log("here is user ", userData);
    };

    return (
        <Grid container direction="row" gap={2}>
            <Grid
                item
                xs={5}
                sx={{
                    padding: "24px",
                    boxShadow:
                        " rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                }}
            >
                <Typography>Profile Picture</Typography>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Stack spacing={2}>
                        <Avatar
                            sx={{ width: 180, height: 180 }}
                            src={
                                userData.profilePicture !== ""
                                    ? userData.profilePicture
                                    : null
                            }
                        />
                        <Stack spacing={2} direction="row">
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                id="image-upload"
                                onChange={handleImageUpload}
                            />
                            <label htmlFor="image-upload">
                                <Button variant="contained" component="span">
                                    Upload
                                </Button>
                            </label>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={clearImage}
                            >
                                <ClearIcon />
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Grid>
            <Grid
                item
                xs={3}
                sx={{
                    padding: "24px",
                    boxShadow:
                        " rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                }}
            >
                <Typography>Personel</Typography>
                <Stack spacing={2}>
                    <TextField
                        label="Name"
                        variant="standard"
                        // sx={{ width: "250px" }}
                        value={userData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        variant="standard"
                        // sx={{ width: "250px" }}
                        value={userData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        label="Phone Number"
                        variant="standard"
                        // sx={{ width: "250px" }}
                        value={userData.phoneNumber}
                        onChange={(e) =>
                            handleChange("phoneNumber", e.target.value)
                        }
                        margin="normal"
                    />
                </Stack>
            </Grid>
            <Grid
                item
                xs={8.1}
                sx={{
                    padding: "24px",
                    backgroundColor: "#fbfbfb",
                }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography variant="info" fontSize="12px" color="grey">
                        *Make sure to save all changes
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ width: 250 }}
                        onClick={() => handleSave()}
                    >
                        Save
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default GeneralSettings;
