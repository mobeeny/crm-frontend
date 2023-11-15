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
import { setCompanyContacts } from "../redux/reducers/companyCrud";
import { Avatar, Card, CardActions, CardContent, CardHeader, Chip, IconButton, Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Stack } from "@mui/system";
import D_ContactRole from "./D_ContactRole";

const SelectUser_AddCompanySearch = (props) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedResults, setSelectedResults] = useState([]);
    const [showDialog, setShowDialog] = useState(false); // State to control dialog visibility
    const [selectedContact, setSelectedContact] = useState({})
    const [selectedUser, setSelectedUser] = useState()
    const [showChip, setShowChip] = useState(false)


    const companyContacts = useSelector((state) => state.companyCrud.companyContacts);

    // const username = useSelector((state) => state.config.username);
    const dispatch = useDispatch();
    let results = {};
    // Your Firebase configuration and initialization
    // firebase.initializeApp(yourConfig);
    //   const db = firebase.firestore();

    const handleClickChip = () => {
        console.info("You clicked the Chip.");
    };

    const handleDeleteChip = (clientId) => {
        setSelectedResults((prevContacts) => prevContacts.filter(client => client.id !== clientId));
    };

    const fetchSearchResults = async (squery) => {

        try {
            const usersRef = collection(db, instancesRef + auth.currentUser.uid + "/client");
            const q = query(usersRef, where("name", ">=", squery), where("name", "<=", squery + "\uf8ff"));
            const snapshot = await getDocs(q);
            console.log("User :", results);

            results = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log("User :", results);

            results.push({ id: 0, name: "Create New" })



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


    // Do whatever you want with the userId, e.g., store it in state, perform an action, etc.
    const handleUserClick = (client) => {

        // addselectedResults(client);
        dispatch(setCompanyContacts(client.id));
        setSelectedContact(client);
        setSearchQuery(""); // Update the search query with the client's name
        setSearchResults([]); // Clear the search suggestion list
        setShowDialog(true);
    };


    const listContainerStyles = {
        position: "absolute",
        width: "80%",
        maxHeight: "200px", // Adjust the max-height as needed
        overflowY: "auto",
        border: "1px solid #ccc",
        borderTop: "none",
        backgroundColor: "#fff",
        borderRadius: "0 0 5px 5px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        zIndex: "1",
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
                < div style={listContainerStyles}>
                    <List dense >
                        {searchResults.map((client) => (
                            <ListItemButton key={client.id} onClick={() => handleUserClick(client)}>
                                <ListItemText primary={client.name} />
                            </ListItemButton>
                        ))}
                    </List>
                </div>
            )}
            <D_ContactRole open={showDialog} setShowDialog={setShowDialog} contact={selectedContact} /> {/* Render the dialog when showDialog is true */}
            <Stack direction="row" spacing={1}>
                {companyContacts.map((client) => (
                    <Chip
                        label={selectedContact.name}
                        variant="outlined"
                        onDelete={() => setSelectedContact(false)}
                        avatar={<Avatar>{selectedContact.name ? selectedContact.name.charAt(0) : ""}</Avatar>}
                    />
                ))}
            </Stack>
        </div>
    );
};

export default SelectUser_AddCompanySearch;