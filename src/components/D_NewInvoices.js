import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { Box, Chip } from "@mui/material";
import { auth, db, instancesRef } from "../config/firebase";
import { getDoc, collection, writeBatch, arrayUnion, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import SearchClientsCompanyForm from "./SearchClientsCompanyForm";
import { Divider,  } from "@mui/material";
import { setInvoiceDialog } from "../redux/reducers/dialogFlags";

export default function AddInvoiceDialog() {
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    // const username = useSelector((state) => state.config.username);
    const dispatch = useDispatch();
    const clientCollectionRef = collection(db, instancesRef + auth.currentUser.uid + "/company");


    const [cName, setCName] = useState("");
    const [cEmail, setCEmail] = useState("");
    const cContacts = useSelector((state) => state.clients.companyContacts);
    const [cNtn, setCNtn] = useState("");
    const [cInc, setCInc] = useState("");
    const [cGST, setCGST] = useState("");
    const [cPhone, setCPhone] = useState("");
    const [cRtoCity, setCRtoCity] = useState("");
    const [cNotes, setCNotes] = useState("");
    const [cSource, setCSource] = useState("");
    const [cAddress, setCAddress] = useState("");
    const [cElectricityRefNo, setCElectricityRefNo] = useState("");
    const [cPrincipalActivity, setCPrincipalActivity] = useState("");
    const [cBankName, setCBankName] = useState("");
    const [cBankAccount, setCBankAccount] = useState("");
    const [cBankCode, setCBankCode] = useState("");
    const [cDateContact, setCDateContact] = useState("2023-05-10");
    const [cDateRegistration, setCDateRegistration] = useState("2023-05-10");
    const [cDateGST, setCDateGST] = useState("2023-05-10");

    const invoiceDialogOpen = useSelector((state)=>state.dialogs.invoiceDialogOpen)

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = () => {
       dispatch(setInvoiceDialog(false));
    };

    const updateClientsCompanyField = async (companyId) => {
        try {
            const batch = writeBatch(db);
            console.log("COMPANY: Clients: ", cContacts);
            // Loop through each client id in cContacts and update the "company" field
            cContacts.forEach((clientObject) => {
                const clientRef = doc(db, instancesRef + auth.currentUser.uid + "/client/" + clientObject.id);
                batch.update(clientRef, { company: arrayUnion(companyId) });
                console.log("COMPANY: LOOP: ", clientRef, clientObject, companyId);
            });

            // Commit the batched write to update all documents at once
            await batch.commit();

            console.log("Company field updated for all clients in cContacts array.");
        } catch (error) {
            console.error("Error updating company field:", error);
        }
    };

    useEffect(() => {
        console.log("New Directors: ", cContacts);
    }, [cContacts]);

    const onSubmitCompany = async () => {
        let updatedSid; // Define updatedSid variable

        try {
            // Get the document reference for the sequenceIds
            const docRef = doc(db, instancesRef + auth.currentUser.uid + "/systemData/" + "sequenceIds");
            console.log("DocRef: ", docRef);

            try {
                const sIds = await getDoc(docRef);
                if (sIds.exists()) {
                    console.log("Current companySid:", sIds.data());
                    // Get the current companySid value
                    const currentSid = sIds.data().companySid;
                    // Increment the companySid value by 1
                    updatedSid = currentSid + 1; // Assign the value to updatedSid

                    // Update the document with the new companySid value
                    await updateDoc(docRef, { companySid: updatedSid });
                } else {
                    console.log("Document does not exist.");
                    // Handle the case where the document doesn't exist, if necessary.
                }
            } catch (error) {
                console.error("Error fetching document:", error);
                // Handle any errors that may occur during the retrieval process.
            }

            // Create the company data object with the updated companySid
            const companyData = {
                name: cName,
                email: cEmail,
                phone: cPhone,
                ntn: cNtn,
                inc: cInc,
                source: cSource,
                gst: cGST,
                city: cRtoCity,
                cDate: cDateContact,
                rDate: cDateRegistration,
                notes: cNotes,
                contacts: cContacts,
                address: cAddress,
                electricity: cElectricityRefNo,
                pactivity: cPrincipalActivity,
                bankName: cBankName,
                bankAccountNo: cBankAccount,
                branchCode: cBankCode,
                gDate: cDateGST,
                companySid: updatedSid, // Include the updated companySid here
            };

            // Add the company data to Firestore
            const newCompanyRef = await addDoc(clientCollectionRef, companyData);

            // Update the clients' company field for all selected clients in cContacts array
            await updateClientsCompanyField(newCompanyRef.id);

            // Close the dialog
            handleClose();
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div>
            
            <Dialog open={invoiceDialogOpen} onClose={handleClose}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >
                <DialogTitle>Add New Invoice</DialogTitle>
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
                            id="client"
                            label="Client"
                            type="name"
                            variant="standard"
                            onChange={(e) => setCName(e.target.value)}
                        />

                        
                        <TextField
                            id="project"
                            label="Project"
                            type="email"
                            variant="standard"
                            onChange={(e) => setCEmail(e.target.value)}
                        />
                        <TextField
                            id="date"
                            label="Invoice Date #"
                            type="name"
                            variant="standard"
                            onChange={(e) => setCNtn(e.target.value)}
                        />
                        <TextField
                            id="dueDate"
                            label="Due Date #"
                            type="name"
                            variant="standard"
                            onChange={(e) => setCInc(e.target.value)}
                        />
                        <TextField
                            id="total"
                            label="Total #"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setCGST(e.target.value)}
                        />
                        <TextField
                            id="PaymentMethod"
                            label="Payment Method #"
                            type="phone"
                            variant="standard"
                            onChange={(e) => setCPhone(e.target.value)}
                        />
                        <TextField
                            id="status"
                            label="Status"
                            type="name"
                            variant="standard"
                            onChange={(e) => setCRtoCity(e.target.value)}
                        />
                        <TextField
                            id="description"
                            label="Description. #"
                            type="name"
                            variant="standard"
                            onChange={(e) => setCElectricityRefNo(e.target.value)}
                        />
                       
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={onSubmitCompany}>
                        Add Invoice
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
