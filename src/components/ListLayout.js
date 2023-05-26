import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Avatar from "@mui/material/Avatar";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Button, Container, Grid, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import AddUserDialog from "./D_NewUser";
import { auth, googleAuthProvider, db } from "../config/firebase";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

export default function ListLayout() {
    const usersCollectionRef = collection(db, "users");
    const [usersList, setUsersList] = useState([]);

    const getUsers = async () => {
        //Read the Data
        //Set the Movie List
        try {
            const data = await getDocs(usersCollectionRef);
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            console.log(filteredData);
            setUsersList(filteredData);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        getUsers();
    }, []);
    return (
        <>
            <Grid container direction="column" maxWidth={360}>
                <Grid item sx={{ textAlign: "right", margin: 2 }}>
                    <AddUserDialog />
                </Grid>
                <Grid item sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                    <List
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Users/Projects
                            </ListSubheader>
                        }
                    >
                        {usersList.map((user) => (
                            <>
                                <ListItemButton>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <BeachAccessIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={user.name} secondary={user.cDate} />
                                    </ListItem>
                                </ListItemButton>
                                <Divider component="li" />
                            </>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </>
    );
}
