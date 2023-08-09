import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Button, Container, Grid, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import AddClientDialog from "./D_NewClient";
import AddCompanyDialog from "./D_NewCompany";
import { auth, googleAuthProvider, db, instancesRef } from "../config/firebase";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import {
    setSelectedClient,
    setSelectedCompany,
    setSelectedUserCompaniesIds,
    setSelectedUserCompanies,
    setClient,
} from "../redux/reducers/clients";

export default function ClientCompanies() {
    // const username = useSelector((state) => state.config.username);
    const currentCompany = useSelector((state) => state.config.selectedCompany);
    const clientCollectionRef = collection(db, instancesRef + auth.currentUser.uid + "/client");
    const companyCollectionRef = collection(db, instancesRef + auth.currentUser.uid + "/company");
    const companiesIdList = useSelector((state) => state.clients.selectedUserCompaniesIds);
    const companiesList = useSelector((state) => state.clients.selectedUserCompanies);

    const dispatch = useDispatch();

    const fetchCompaniesData = async () => {
        // An array to store the results
        const companyDataArray = [];

        // Loop through each companyUid and fetch its data
        for (const companyUid of companiesIdList) {
            const companyCollectionRef = collection(db, instancesRef + auth.currentUser.uid + "/company");
            const companyRef = doc(companyCollectionRef, companyUid);

            try {
                // Fetch the document data from Firestore
                const docSnapshot = await getDoc(companyRef);

                if (docSnapshot.exists()) {
                    // Document found, store the data in the result array
                    const companyData = docSnapshot.data();
                    companyDataArray.push({ id: companyUid, ...companyData });
                } else {
                    // Document not found
                    console.log(`No such document for companyUid: ${companyUid}`);
                }
            } catch (error) {
                // Error occurred while fetching the document
                console.error(`Error getting document for companyUid: ${companyUid}`, error);
            }
        }

        // Once all the data is fetched, you can dispatch the data to the store or do whatever you want with it
        console.log("Fetched company data:", companyDataArray, companiesList);
        dispatch(setSelectedUserCompanies(companyDataArray));
        dispatch(setSelectedCompany(companyDataArray[0]));
    };

    useEffect(() => {
        fetchCompaniesData();
    }, []);

    // This not working, Too Bad
    useEffect(() => {
        console.log("CURRENT COMPANY CHANGED: ", currentCompany);
        fetchCompaniesData();
    }, [currentCompany]);

    console.log("CompanyList Count: ", companiesIdList.length);
    return (
        <div>
            <Grid container direction="column">
                <Grid item sx={{ textAlign: "right", margin: 2 }}>
                    <Button variant="contained" onClick={() => fetchCompaniesData()}>
                        Refresh
                    </Button>
                </Grid>
                <Grid item sx={{ width: "100%", maxWidth: 420, bgcolor: "background.paper", overflow: "auto" }}>
                    <List
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Client's Companies
                            </ListSubheader>
                        }
                    >
                        {companiesList?.map((company) => (
                            <>
                                <ListItemButton>
                                    <ListItem
                                        onClick={() => {
                                            console.log("Company Clicked", company, company.name);
                                            //dispatch(setSelectedCompany(company));
                                            //Pass the Company UID from the companies UID array in this map
                                            // setselectedCompanyUid(company.id);
                                            dispatch(setSelectedCompany(company));
                                        }}
                                    >
                                        <ListItemAvatar>
                                            <Avatar>
                                                <PersonIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={company.name} secondary={company.email} />
                                    </ListItem>
                                </ListItemButton>
                                <Divider component="li" />
                            </>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </div>
    );
}
