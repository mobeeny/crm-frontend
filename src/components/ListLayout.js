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
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedClient, setSelectedUserCompaniesIds, setClient } from "../redux/reducers/clients";

export default function ListLayout() {
    const username = useSelector((state) => state.config.username);

    const clientCollectionRef = collection(db, instancesRef + username + "/client");
    const clientList = useSelector((state) => state.clients.client);
    const dispatch = useDispatch();

    const getClient = async () => {
        //Read the Data
        //Set the Movie List
        try {
            const data = await getDocs(clientCollectionRef);
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            dispatch(setClient(filteredData));
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        getClient();
    }, []);

    console.log("ClientList Count: ", clientList.length);
    return (
        <div>
            <Grid container direction="column" maxWidth={420}>
                <Grid item sx={{ textAlign: "right", margin: 2 }}>
                    <Stack direction="row" spacing={2}>
                        <AddClientDialog />
                        <AddCompanyDialog />
                    </Stack>
                </Grid>
                <Grid item sx={{ width: "100%", maxWidth: 420, bgcolor: "background.paper", overflow: "auto" }}>
                    <List
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Client/Projects
                            </ListSubheader>
                        }
                    >
                        {clientList?.map((client) => (
                            <>
                                <ListItemButton>
                                    <ListItem
                                        onClick={() => {
                                            console.log("Client Clicked", client, client.name);
                                            dispatch(setSelectedClient(client));
                                            dispatch(setSelectedUserCompaniesIds(client.company));
                                        }}
                                    >
                                        <ListItemAvatar>
                                            <Avatar>
                                                <PersonIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={client.name} secondary={client.email} />
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
