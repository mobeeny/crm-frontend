import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { Box } from "@mui/material";
import { auth, googleAuthProvider, db, instancesRef } from "../config/firebase";
import { getDoc, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { FieldValue } from "firebase/firestore";


export default function AddClientDialog() {
    // const username = useSelector((state) => state.config.username);

    const clientCollectionRef = collection(db, instancesRef + auth.currentUser.uid + "/client");


    const [open, setOpen] = React.useState();
    const [uName, setUName] = useState("");
    const [uEmail, setUEmail] = useState("");
    const [uFname, setUFName] = useState("");
    const [uAddress, setUAddress] = useState("");
    const [uCareOf, setUCareOf] = useState("");
    const [uCNIC, setUCNIC] = useState("");
    const [uPhone, setUPhone] = useState("");
    const [uCity, setUCity] = useState("");
    const [uNotes, setUNotes] = useState("");
    const [uSource, setUSource] = useState("");
    const [uDateContact, setUDateContact] = useState("2023-05-10");
    const [uDateBirth, setUDateBirth] = useState("2023-05-10");

    const [uDateIssue, setUDateIssue] = useState("2023-05-10");
    const [uDateExpiry, setUDateExpiry] = useState("2023-05-10");
    const [clientSid, setClientSid] = useState(0)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmitClient = async () => {
        try {
            const docRef = doc(db, instancesRef + auth.currentUser.uid + "/systemData/" + "sequenceIds");
            console.log("DocRef: ", docRef);

            try {
                const sIds = await getDoc(docRef);
                if (sIds.exists()) {
                    console.log("Current clientSid:", sIds.data());
                    // Get the current clientSid value
                    const currentSid = sIds.data().clientSid;
                    // Increment the clientSid value by 1
                    const updatedSid = currentSid + 1;

                    // Update the document with the new clientSid value
                    await updateDoc(docRef, { clientSid: updatedSid });

                    // Include the updated clientSid in the data object
                    await addDoc(clientCollectionRef, {
                        name: uName,
                        fname: uFname,
                        address: uAddress,
                        email: uEmail,
                        phone: uPhone,
                        cof: uCareOf,
                        source: uSource,
                        cnic: uCNIC,
                        city: uCity,
                        cDate: uDateContact,
                        bDate: uDateBirth,
                        iDate: uDateIssue,
                        eDate: uDateExpiry,
                        notes: uNotes,
                        clientSid: updatedSid, // Include the updated clientSid here
                    });
                } else {
                    console.log("Document does not exist.");
                    // Handle the case where the document doesn't exist, if necessary.
                }
            } catch (error) {
                console.error("Error fetching document:", error);
                // Handle any errors that may occur during the retrieval process.
            }

            // Close the dialog
            handleClose();
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen} startIcon={<PersonAddAltIcon />}>
                Client
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Client</DialogTitle>
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
                            autoFocus
                            id="fname"
                            label="Father's Name"
                            type="name"
                            variant="standard"
                            onChange={(e) => setUFName(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            id="address"
                            label="Address"
                            type="name"
                            variant="standard"
                            onChange={(e) => setUAddress(e.target.value)}
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
                            id="doi"
                            label="Date of Issuance"
                            type="date"
                            variant="standard"
                            value={uDateIssue}
                            onChange={(e) => setUDateIssue(e.target.value)}
                        />
                        <TextField
                            id="doe"
                            label="Date of Expiry"
                            type="date"
                            variant="standard"
                            value={uDateExpiry}
                            onChange={(e) => setUDateExpiry(e.target.value)}
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
                    <Button variant="contained" onClick={onSubmitClient}>
                        Add Client
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
