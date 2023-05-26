import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { auth, googleAuthProvider, db } from "../config/firebase";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

export default function AddUserDialog() {
    const usersCollectionRef = collection(db, "users");

    const [open, setOpen] = React.useState();
    const [uName, setUName] = useState("");
    const [uEmail, setUEmail] = useState("");
    const [uCareOf, setUCareOf] = useState("");
    const [uCNIC, setUCNIC] = useState("");
    const [uPhone, setUPhone] = useState("");
    const [uCity, setUCity] = useState("");
    const [uNotes, setUNotes] = useState("");
    const [uSource, setUSource] = useState("");
    const [uDateContact, setUDateContact] = useState("2023-05-10");
    const [uDateBirth, setUDateBirth] = useState("2023-05-10");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmitUser = async () => {
        try {
            await addDoc(usersCollectionRef, {
                name: uName,
                email: uEmail,
                phone: uPhone,
                cof: uCareOf,
                source: uSource,
                cnic: uCNIC,
                city: uCity,
                cDate: uDateContact,
                bDate: uDateBirth,
                notes: uNotes,
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                Add User
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New User</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        
                    </DialogContentText> */}
                    <Box
                        component="form"
                        sx={{
                            "& .MuiTextField-root": { m: 1, width: "28ch" },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            autoFocus
                            id="name"
                            label="Name"
                            type="name"
                            variant="standard"
                            onChange={(e) => setUName(e.target.value)}
                        />
                        <TextField
                            id="email"
                            label="Email Address"
                            type="email"
                            variant="standard"
                            onChange={(e) => setUEmail(e.target.value)}
                        />
                        <TextField
                            id="careof"
                            label="Care Of (Ref. Person)"
                            type="name"
                            variant="standard"
                            onChange={(e) => setUCareOf(e.target.value)}
                        />
                        <TextField
                            id="cnic"
                            label="CNIC"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setUCNIC(e.target.value)}
                        />
                        <TextField
                            id="phone"
                            label="Phone #"
                            type="phone"
                            variant="standard"
                            onChange={(e) => setUPhone(e.target.value)}
                        />
                        <TextField
                            id="city"
                            label="City"
                            type="name"
                            variant="standard"
                            onChange={(e) => setUCity(e.target.value)}
                        />
                        <TextField
                            id="contactDate"
                            label="Contact Date"
                            type="date"
                            variant="standard"
                            value={uDateContact}
                            onChange={(e) => setUDateContact(e.target.value)}
                        />
                        <TextField
                            id="notes"
                            label="Notes"
                            type="textarea"
                            variant="standard"
                            onChange={(e) => setUNotes(e.target.value)}
                        />
                        <TextField
                            id="dob"
                            label="Date of Birth"
                            type="date"
                            variant="standard"
                            value={uDateBirth}
                            onChange={(e) => setUDateBirth(e.target.value)}
                        />
                        <TextField
                            id="source"
                            label="Source"
                            type="name"
                            variant="standard"
                            value={uSource}
                            onChange={(e) => setUSource(e.target.value)}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={onSubmitUser}>Add User</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
