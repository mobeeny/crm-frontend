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
import { setSelectedClient, setUpdatedClient } from "../redux/reducers/clients";
import { db, instancesRef, auth } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { current } from "@reduxjs/toolkit";
import SaveIcon from "@mui/icons-material/Save";

function Profile() {
    let currentClient = useSelector((state) => state.clients.selectedClient);
    // const username = useSelector((state) => state.config.username);

    const dispatch = useDispatch();
    const [toastOpen, setToastOpen] = useState(false);

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        currentClient = {
            ...currentClient,
            [id]: value,
        };
        //Update the Value in Store
        console.log("Change: ", currentClient);
        dispatch(setSelectedClient(currentClient));
    };
    const updateClientProfile = async (id) => {
        const clientDoc = doc(db, instancesRef + auth.currentUser.uid + "/client", id);
        await updateDoc(clientDoc, currentClient);
        dispatch(setUpdatedClient());
        setToastOpen(true);
        // getMovies();
    };

    if (!currentClient) {
        return null; // Or show a loading indicator, error message, etc.
    }

    return (
        <div>
            <Card width="100%">
                <CardMedia sx={{ height: 40 }} image="/static/images/banner1.jpg" title="green iguana" />
                <CardContent>
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
                            value={currentClient.name}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                // shrink: !!currentUser.name
                                shrink: true,
                            }}
                        />
                        <TextField
                            autoFocus
                            id="fname"
                            label="Father's Name"
                            type="name"
                            variant="standard"
                            value={currentClient.fname}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                // shrink: !!currentUser.name
                                shrink: true,
                            }}
                        />
                        <TextField
                            autoFocus
                            id="address"
                            label="Address"
                            type="name"
                            variant="standard"
                            value={currentClient.address}
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
                            value={currentClient.email}
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
                            value={currentClient.cof}
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
                            value={currentClient.cnic}
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
                            value={currentClient.phone}
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
                            value={currentClient.city}
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
                            value={currentClient.cDate}
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
                            value={currentClient.notes}
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
                            value={currentClient.bDate}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="iDate"
                            label="Date of Issue"
                            type="date"
                            variant="standard"
                            value={currentClient.iDate}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="eDate"
                            label="Date of Expiry"
                            type="date"
                            variant="standard"
                            value={currentClient.eDate}
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
                            value={currentClient.source}
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
                        <Button
                            variant="contained"
                            onClick={() => updateClientProfile(currentClient.id)}
                            startIcon={<SaveIcon />}
                        >
                            Save
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
