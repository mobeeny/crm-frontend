import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { Box, Chip } from "@mui/material";
import AddBusiness from "@mui/icons-material/AddBusiness";
import { auth, googleAuthProvider, db, instancesRef } from "../config/firebase";
import { getDocs, collection, writeBatch, arrayUnion, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import SearchClientsCompanyForm from "./SearchClientsCompanyForm";
import { clearDirectorsNewCompany } from "../redux/reducers/clients";
import {Divider,Root} from "@mui/material";

export default function AddCompanyDialog() {
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    // const username = useSelector((state) => state.config.username);
    const contactsDetails = {};
    const dispatch = useDispatch();
    const clientCollectionRef = collection(db, instancesRef + auth.currentUser.uid + "/company");

    const [open, setOpen] = React.useState();

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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        //Clear Clients/Directors added to new company for clean slate Next time
        dispatch(clearDirectorsNewCompany());
        setOpen(false);
    };

    const updateClientsCompanyField = async (companyId) => {
        try {
            const batch = writeBatch(db);
            console.log("COMPANY: Clients: ", cContacts);
            // Loop through each client id in cContacts and update the "company" field
            cContacts.forEach((clientId) => {
                const clientRef = doc(db, instancesRef + auth.currentUser.uid + "/client/" + clientId);
                batch.update(clientRef, { company: arrayUnion(companyId) });
                console.log("COMPANY: LOOP: ", clientRef, clientId, companyId);
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

    const onSubmitClient = async () => {
        try {
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
                bankAccountNo : cBankAccount,
                branchCode:cBankCode,
                gDate: cDateGST,
            };
            
            const newCompanyRef = await addDoc(clientCollectionRef, companyData);

            await updateClientsCompanyField(newCompanyRef.id);
            // setOpen(false);
            handleClose();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen} startIcon={<AddBusiness />}>
                Company
            </Button>
            <Dialog open={open} onClose={handleClose}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >
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

                        <SearchClientsCompanyForm />
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
                        <Divider style={{marginTop:'22px'}}>
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
                        /><br/>
                        <Divider style={{marginBottom:'16px',marginTop:'10px'}}>
                                
                            </Divider>
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
                            type="textarea"
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
                    <Button variant="contained" onClick={onSubmitClient}>
                        Add Company
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
