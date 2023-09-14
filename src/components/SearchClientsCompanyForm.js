import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
// import "firebase/firestore";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { auth, googleAuthProvider, db, instancesRef } from "../config/firebase";
import { getDocs, collection, addDoc, query, where, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { setDirectorsNewCompany } from "../redux/reducers/clients";
import { Avatar, Card, CardActions, CardContent, CardHeader, Chip, IconButton, Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Stack } from "@mui/system";
import  ResponsiveDialog from './D_ClientRole'
import D_ClientRole from "./D_ClientRole";

const SelectUser_AddCompanySearch = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const [selectedResults, setSelectedResults] = useState([]);

    // const username = useSelector((state) => state.config.username);
    const dispatch = useDispatch();
    let results = {};
    // Your Firebase configuration and initialization
    // firebase.initializeApp(yourConfig);
    //   const db = firebase.firestore();

    const handleClickChip = () => {
        console.info("You clicked the Chip.");
    };

    const handleDeleteChip = () => {
        console.info("You clicked the delete icon.");
    };

    const fetchSearchResults = async (squery) => {

        try {
            const usersRef = collection(db, instancesRef + auth.currentUser.uid + "/client");
            const q = query(usersRef, where("name", ">=", squery), where("name", "<=", squery + "\uf8ff"));
            const snapshot = await getDocs(q);

            results = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            //   console.log("User :", results);
            setSearchResults(results);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    const addselectedResults = (clientId) => {
        
        setSelectedResults((prevContacts) => [...prevContacts, clientId]);
        console.log("Directors: ", selectedResults);
    };

    useEffect(() => {
        if (searchQuery.trim() !== "") {
            fetchSearchResults(searchQuery);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    const handleUserClick = (client) => {
        // Do whatever you want with the userId, e.g., store it in state, perform an action, etc.
        console.log("Clicked user ID:", client);

        addselectedResults(client);
        dispatch(setDirectorsNewCompany(client.id));
        setSearchResults([]);
    };

    return (
        <div>
            <TextField
                type="text"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                label="Search for users by name..."
                variant="standard"
                InputLabelProps={{
                    shrink: true,
                }}
            />

            {searchResults.length > 0 && searchQuery.length > 0 && (
             <>
             <List dense>
                    {searchResults.map((client) => (
                        <ListItemButton key={client.id} onClick={() => handleUserClick(client)}>
                            <ListItemText primary={client.name} />
                        </ListItemButton>
                    ))}
                </List>
                <D_ClientRole/>
                </>
            )}
            <Stack direction="row" spacing={1}>
                {selectedResults.map((client) => (
                    // <ListItemButton key={client.id}>
                    //     <ListItemText primary={client.name} />
                    // </ListItemButton>

                    // <Card sx={{ maxWidth: 300 }}>
                    //     <CardHeader
                    //         action={
                    //             <IconButton aria-label="settings">
                    //                 <HighlightOffIcon />
                    //             </IconButton>
                    //         }
                    //         subheader={
                    //             <>
                    //                 <Typography paragraph color="text.secondary">
                    //                     {client.name}
                    //                 </Typography>
                    //                 <Typography paragraph color="text.secondary">
                    //                     {client.email}
                    //                 </Typography>
                    //             </>
                    //         }
                    //     />
                    // </Card>

                    <Chip
                        label={client.name}
                        variant="outlined"
                        avatar={<Avatar>{client.name.charAt(0)}</Avatar>}
                        onClick={handleClickChip}
                        onDelete={handleDeleteChip}
                    />
                ))}
            </Stack>
        </div>
    );
};

export default SelectUser_AddCompanySearch;
