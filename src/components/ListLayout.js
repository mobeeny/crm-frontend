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
import AddUserDialog from "./D_NewUser";
import { auth, googleAuthProvider, db, baseRef } from "../config/firebase";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser, setUsers } from "../redux/reducers/users";

export default function ListLayout() {
    const usersCollectionRef = collection(db, baseRef + "/users");
    const usersList = useSelector((state) => state.users.users);
    const dispatch = useDispatch();

    const getUsers = async () => {
        //Read the Data
        //Set the Movie List
        try {
            const data = await getDocs(usersCollectionRef);
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            dispatch(setUsers(filteredData));
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        getUsers();
    }, []);

    console.log("UsersList Count: ", usersList.length);
    return (
        <div>
            <Grid container direction="column" maxWidth={420}>
                <Grid item sx={{ textAlign: "right", margin: 2 }}>
                    <AddUserDialog />
                </Grid>
                <Grid item sx={{ width: "100%", maxWidth: 420, bgcolor: "background.paper", overflow: "auto" }}>
                    <List
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Users/Projects
                            </ListSubheader>
                        }
                    >
                        {usersList?.map((user) => (
                            <>
                                <ListItemButton>
                                    <ListItem
                                        onClick={() => {
                                            console.log("User Clicked", user);
                                            dispatch(setSelectedUser(user));
                                        }}
                                    >
                                        <ListItemAvatar>
                                            <Avatar>
                                                <PersonIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={user.name} secondary={user.email} />
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
