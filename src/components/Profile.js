//This is a Sample Redux Component
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/reducers/counter";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Alert, Box, FormControl, InputLabel, Snackbar, TextField } from "@mui/material";
import { setSelectedUser, setUpdatedUser } from "../redux/reducers/users";
import { db, baseRef } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { current } from "@reduxjs/toolkit";

function Profile() {
    let currentUser = useSelector((state) => state.users.selectedUser);
    const dispatch = useDispatch();
    const [toastOpen, setToastOpen] = useState(false);

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        currentUser = {
            ...currentUser,
            [id]: value,
        };
        //Update the Value in Store
        console.log("Change: ", currentUser);
        dispatch(setSelectedUser(currentUser));
    };
    const updateUserProfile = async (id) => {
        const userDoc = doc(db, baseRef + "/users", id);
        await updateDoc(userDoc, currentUser);
        dispatch(setUpdatedUser());
        setToastOpen(true);
        // getMovies();
    };

    if (!currentUser) {
        return null; // Or show a loading indicator, error message, etc.
    }

    return (
        <div>
            <Card width="100%">
                <CardMedia sx={{ height: 40 }} image="/static/images/banner1.jpg" title="green iguana" />
                <CardContent>
                    {/* <Typography gutterBottom variant="h5" component="div">
                        {currentUser.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Short Description / Notes for the person
                    </Typography> */}
                    <Box
                        component="form"
                        sx={{
                            "& .MuiTextField-root": { m: 1, width: "35ch" },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        {/* <InputLabel shrink htmlFor="name">
                                Name
                            </InputLabel> */}
                        <TextField
                            autoFocus
                            id="name"
                            label="Name"
                            type="name"
                            variant="standard"
                            value={currentUser.name}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                // shrink: !!currentUser.name
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="email"
                            label="Email Address"
                            type="email"
                            variant="standard"
                            value={currentUser.email}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="cof"
                            label="Care Of (Ref. Person)"
                            type="name"
                            variant="standard"
                            value={currentUser.cof}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="cnic"
                            label="CNIC"
                            fullWidth
                            variant="standard"
                            value={currentUser.cnic}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="phone"
                            label="Phone #"
                            type="phone"
                            variant="standard"
                            value={currentUser.phone}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="city"
                            label="City"
                            type="name"
                            variant="standard"
                            value={currentUser.city}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="cDate"
                            label="Contact Date"
                            type="date"
                            variant="standard"
                            value={currentUser.cDate}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="notes"
                            label="Notes"
                            type="textarea"
                            variant="standard"
                            value={currentUser.notes}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="bDate"
                            label="Date of Birth"
                            type="date"
                            variant="standard"
                            value={currentUser.bDate}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="source"
                            label="Source"
                            type="name"
                            variant="standard"
                            value={currentUser.source}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Box>
                </CardContent>
                <CardActions>
                    <Box
                        sx={{
                            m: 2,
                        }}
                    >
                        <Button variant="contained" onClick={() => updateUserProfile(currentUser.id)}>
                            Save Changes
                        </Button>
                    </Box>
                </CardActions>
            </Card>
            <Snackbar
                autoHideDuration={2000}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                open={toastOpen}
                onClose={() => setToastOpen(false)}
                key={{ vertical: "bottom", horizontal: "left" }}
            >
                <Alert onClose={() => setToastOpen(false)} severity="success" sx={{ width: "100%" }}>
                    Changes Saved Successfully
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Profile;
