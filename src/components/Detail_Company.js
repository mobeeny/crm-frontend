//This is a Sample Redux Component
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/reducers/counter";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Alert, Box, FormControl, InputLabel, Snackbar, TextField } from "@mui/material";
import { setSelectedCompany, setSelectedCompanyId } from "../redux/reducers/selectedCompany";
import { db, instancesRef, auth } from "../config/firebase";
import { collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { current } from "@reduxjs/toolkit";
import SaveIcon from "@mui/icons-material/Save";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function DetailCompany() {
    const selectedCompany = useSelector((state) => state.selectedCompany.selectedCompany);
    const selectedCompanyId = useSelector((state) => state.selectedCompany.selectedCompanyId);
    const selectedClientId = useSelector((state) => state.selectedClient.selectedClientId);
    const [companyList, setCompanyList] = useState([]);
    let currentCompany = selectedCompany || {};

    useEffect(() => {
        currentCompany = selectedCompany || {};
        console.log("CHANGED CURRENT COMPANY: ", currentCompany);
    }, [selectedCompany]);

    const getCompaniesList = async () => {
        try {
            const clientCollectionRef = collection(db, instancesRef + auth.currentUser.uid + "/client");
            const childCollectionRef = collection(db, instancesRef + auth.currentUser.uid + "/company");
            const clientDocRef = doc(clientCollectionRef, selectedClientId);

            const itemList = [];
            const docSnapShot = await getDoc(clientDocRef);
            if (docSnapShot.exists()) {
                // dispatch(setSelectedClient(docSnapShot.data()))
                const childListIds = docSnapShot.data().company;

                for (const childId of childListIds) {
                    const childDocRef = doc(childCollectionRef, childId);
                    const childDoc = await getDoc(childDocRef);
                    itemList.push({
                        id: childId,
                        sid: childDoc.data().companySid ? childDoc.data().companySid : "NA",
                        title: childDoc.data().name,
                    });
                }
                //Set the fetched child list to component's hook
                setCompanyList(itemList);
            }
        } catch (err) {
            console.log("error", err);
        }
    };

    useEffect(() => {
        getCompaniesList();
    }, []);

    // const username = useSelector((state) => state.config.username);

    const dispatch = useDispatch();
    const [toastOpen, setToastOpen] = useState(false);

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        currentCompany = {
            ...currentCompany,
            [id]: value,
        };
        //Update the Value in Store
        console.log("Change: ", currentCompany);
        dispatch(setSelectedCompany(currentCompany));
        console.log("CURRENT COMPANY UPDATED:", currentCompany);
    };

    const handleDropDownChange = (e) => {
        dispatch(setSelectedCompanyId(e.target.value));
    };

    const updateCompanyProfile = async (id) => {
        const companyDoc = doc(db, instancesRef + auth.currentUser.uid + "/company", id);
        console.log("UPDATE COMPANY: ", companyDoc);
        await updateDoc(companyDoc, currentCompany);
        // dispatch(setUpdatedClient());
        setToastOpen(true);
    };

    const getCompanyData = async () => {
        try {
            const companyCollectionRef = collection(db, instancesRef + auth.currentUser.uid + "/company");
            const companyDocRef = doc(companyCollectionRef, selectedCompanyId);
            const docSnapShot = await getDoc(companyDocRef);
            if (docSnapShot.exists()) {
                dispatch(setSelectedCompany(docSnapShot.data()));
            }
        } catch (err) {
            console.log("error", err);
        }
    };

    useEffect(() => {
        getCompanyData();
    }, [selectedCompanyId]);

    return (
        <div>
            <Card width="100%">
                <CardMedia sx={{ height: 40 }} image="/static/images/banner1.jpg" title="" />
                <FormControl variant="filled" sx={{ m: 1, minWidth: 320 }}>
                    <InputLabel id="demo-simple-select-standard-label">Companies</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        // value={age}
                        onChange={handleDropDownChange} //={dispatch(setSelectedCompanyId(company.id))}
                        label="Age"
                    >
                        {companyList.map((company) => (
                            <MenuItem value={company.id}>{company.sid + " - " + company.title}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <CardContent>
                    <Box
                        component="form"
                        sx={{
                            "& .MuiTextField-root": { m: 1, width: "35ch" },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            autoFocus
                            id="id"
                            label="Company Id"
                            type="number"
                            variant="standard"
                            value={currentCompany.companySid}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                // shrink: !!currentUser.name
                                shrink: true,
                            }}
                        />
                        <TextField
                            autoFocus
                            id="name"
                            label="Company Name"
                            type="name"
                            variant="standard"
                            value={currentCompany.name}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                // shrink: !!currentUser.name
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="email"
                            label="Company Email"
                            type="email"
                            variant="standard"
                            value={currentCompany.email}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                // shrink: !!currentUser.name
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="ntn"
                            label="NTN #"
                            type="name"
                            value={currentCompany.ntn}
                            onChange={handleInputChange}
                            variant="standard"
                            InputLabelProps={{
                                // shrink: !!currentUser.name
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="inc"
                            label="Inc #"
                            type="name"
                            value={currentCompany.inc}
                            onChange={handleInputChange}
                            variant="standard"
                            InputLabelProps={{
                                // shrink: !!currentUser.name
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="gst"
                            label="GST #"
                            fullWidth
                            variant="standard"
                            value={currentCompany.gst}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="phone"
                            label="Company Phone #"
                            type="phone"
                            variant="standard"
                            value={currentCompany.phone}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="rto"
                            label="RTO City"
                            type="name"
                            variant="standard"
                            value={currentCompany.city}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="electricity"
                            label="Electricity Ref. #"
                            type="name"
                            variant="standard"
                            value={currentCompany.electricity}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="pAcctivity"
                            label="Principal Activity"
                            type="name"
                            variant="standard"
                            value={currentCompany.pactivity}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="address"
                            label="Company Address"
                            type="name"
                            variant="standard"
                            value={currentCompany.address}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="bankName"
                            label="Bank Name"
                            type="name"
                            variant="standard"
                            value={currentCompany.bankName}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="bankAcc"
                            label="Account No"
                            type="name"
                            variant="standard"
                            value={currentCompany.bankAccountNo}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="bankCode"
                            label="Branch Code"
                            type="name"
                            variant="standard"
                            value={currentCompany.branchCode}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="contactDate"
                            label="Contact Date"
                            type="date"
                            variant="standard"
                            value={currentCompany.cDate}
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
                            value={currentCompany.notes}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="regDate"
                            label="Comp. Reg Date"
                            type="date"
                            variant="standard"
                            value={currentCompany.rDate}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="gstDate"
                            label="GST Date"
                            type="date"
                            variant="standard"
                            value={currentCompany.gDate}
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
                            value={currentCompany.source}
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
                            onClick={() => updateCompanyProfile(selectedCompanyId)}
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

export default DetailCompany;
