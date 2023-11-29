import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { Box, Chip, Stack } from "@mui/material";
import AddBusiness from "@mui/icons-material/AddBusiness";
import { auth, googleAuthProvider, db, instancesRef } from "../config/firebase";
import { getDoc, collection, writeBatch, arrayUnion, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { Divider, Root } from "@mui/material";
import { setCompanyDialog } from "../redux/reducers/dialogFlags";
import { setCompanyPrimaryClient } from "../redux/reducers/companyCrud";
import SelectClientComponent from "./SelectClientComponent";

export default function AddCompanyDialog() {
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState("sm");
    // const username = useSelector((state) => state.config.username);
    const contactsDetails = {};
    const dispatch = useDispatch();
    const clientCollectionRef = collection(db, instancesRef + auth.currentUser.uid + "/company");

    const [open, setOpen] = React.useState();

    const [cName, setCName] = useState("");
    const [cEmail, setCEmail] = useState("");
    const cPrimaryClient = useSelector((state) => state.companyCrud.companyPrimaryClient);
    // const cContacts = useSelector((state) => state.companyCrud.companyContacts);
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
    const [companySid, setCompanySid] = useState(0);

    const companyDialogOpen = useSelector((state) => state.dialogs.companyDialogOpen);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = () => {
        dispatch(setCompanyDialog(false));
    };

    const updateClientsCompanyField = async (companyId) => {
        try {
            const batch = writeBatch(db);
            // console.log("COMPANY: Clients: ", cContacts);
            // Loop through each client id in cContacts and update the "company" field
            // cContacts.forEach((clientObject) => {
            //     const clientRef = doc(db, instancesRef + auth.currentUser.uid + "/client/" + clientObject.id);
            //     batch.update(clientRef, { company: arrayUnion(companyId) });
            //     console.log("COMPANY: LOOP: ", clientRef, clientObject, companyId);
            // });

            const clientRef = doc(db, instancesRef + auth.currentUser.uid + "/client/" + cPrimaryClient.id);
            updateDoc(clientRef, { company: arrayUnion(companyId) });

            // Commit the batched write to update all documents at once
            // await batch.commit();

            console.log("Company field updated for all clients in cContacts array.");
        } catch (error) {
            console.error("Error updating company field:", error);
        }
    };

    // useEffect(() => {
    //     console.log("New Directors: ", cContacts);
    // }, [cContacts]);

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
                // contacts: cContacts,
                primaryClientId: cPrimaryClient.id,
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
            <Dialog open={companyDialogOpen} onClose={handleClose} fullWidth={fullWidth} maxWidth={maxWidth}>
                <DialogTitle>Add New Company</DialogTitle>
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
                            label="Company Name"
                            type="name"
                            variant="standard"
                            onChange={(e) => setCName(e.target.value)}
                        />
                        <SelectClientComponent dispatchAction={setCompanyPrimaryClient} />

                        <TextField
                            id="email"
                            label="Company Email"
                            type="email"
                            variant="standard"
                            onChange={(e) => setCEmail(e.target.value)}
                        />
                        <TextField
                            id="ntn"
                            label="NTN #"
                            type="name"
                            variant="standard"
                            onChange={(e) => setCNtn(e.target.value)}
                        />
                        <TextField
                            id="inc"
                            label="Inc #"
                            type="name"
                            variant="standard"
                            onChange={(e) => setCInc(e.target.value)}
                        />
                        <TextField
                            id="gst"
                            label="GST #"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setCGST(e.target.value)}
                        />
                        <TextField
                            id="phone"
                            label="Company Phone #"
                            type="phone"
                            variant="standard"
                            onChange={(e) => setCPhone(e.target.value)}
                        />
                        <TextField
                            id="rto"
                            label="RTO City"
                            type="name"
                            variant="standard"
                            onChange={(e) => setCRtoCity(e.target.value)}
                        />
                        <TextField
                            id="electricity"
                            label="Electricity Ref. #"
                            type="name"
                            variant="standard"
                            onChange={(e) => setCElectricityRefNo(e.target.value)}
                        />
                        <TextField
                            id="pAcctivity"
                            label="Principal Activity"
                            type="name"
                            variant="standard"
                            onChange={(e) => setCPrincipalActivity(e.target.value)}
                        />
                        <TextField
                            id="address"
                            label="Company Address"
                            type="name"
                            variant="standard"
                            onChange={(e) => setCAddress(e.target.value)}
                        />
                        <Divider style={{ marginTop: "22px" }}>
                            <Chip label="Banking Details" />
                        </Divider>
                        <TextField
                            id="bankName"
                            label="Bank Name"
                            type="name"
                            variant="standard"
                            onChange={(e) => setCBankName(e.target.value)}
                        />
                        <TextField
                            id="bankAcc"
                            label="Account No #"
                            type="name"
                            variant="standard"
                            onChange={(e) => setCBankAccount(e.target.value)}
                        />
                        <TextField
                            id="bankCode"
                            label="Branch Code"
                            type="name"
                            variant="standard"
                            onChange={(e) => setCBankCode(e.target.value)}
                        />
                        <br />
                        <Divider style={{ marginBottom: "16px", marginTop: "10px" }}></Divider>
                        <TextField
                            id="contactDate"
                            label="Contact Date"
                            type="date"
                            variant="standard"
                            value={cDateContact}
                            onChange={(e) => setCDateContact(e.target.value)}
                        />
                        <TextField
                            id="notes"
                            label="Notes"
                            type="date"
                            variant="standard"
                            onChange={(e) => setCNotes(e.target.value)}
                        />
                        <TextField
                            id="regDate"
                            label="Comp. Reg Date"
                            type="date"
                            variant="standard"
                            value={cDateRegistration}
                            onChange={(e) => setCDateRegistration(e.target.value)}
                        />
                        <TextField
                            id="gstDate"
                            label="GST Date"
                            type="date"
                            variant="standard"
                            value={cDateGST}
                            onChange={(e) => setCDateGST(e.target.value)}
                        />
                        <TextField
                            id="source"
                            label="Source"
                            type="name"
                            variant="standard"
                            value={cSource}
                            onChange={(e) => setCSource(e.target.value)}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={onSubmitCompany}>
                        Add Company
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
