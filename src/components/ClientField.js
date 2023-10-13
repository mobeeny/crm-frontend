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
import { setCompanyContacts } from "../redux/reducers/clients";
import { Avatar, Card, CardActions, CardContent, CardHeader, Chip, IconButton, Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Stack } from "@mui/system";
import ResponsiveDialog from './D_ClientRole'
import D_ClientRole from "./D_ClientRole";

const ClientField = (props) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedResults, setSelectedResults] = useState([]);
    const [showDialog, setShowDialog] = useState(false); // State to control dialog visibility
    const [selectedClient, setSelectedClient] = useState({})

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
        // Set the clicked client's name in the searchQuery state
        setSearchQuery(client.name);
        setSearchResults([]); // Clear the search suggestion list
        setShowDialog(true);
        setSelectedClient(client);
    
        // Call the callback function to update the quotation state in the parent component
        props.updateClientInQuotation(client.name);
      };

    const handleClientChange = (e) => {
        const newClientValue = e.target.value;
        setSearchQuery(newClientValue); // Assuming this is your searchQuery state
      
        // Call the callback function to update the quotation state
        props.updateClientInQuotation(newClientValue);
      };



    return (
        <div style={{ position: "relative" }}>
            <TextField
                sx={{ width: '45ch' }} // Remove marginTop
                type="text"
                value={searchQuery}
                onChange={handleClientChange }
                label="Search for Clients by name..."
                variant="standard"
                InputLabelProps={{
                    shrink: true,
                }}
            />

            {searchResults.length > 0 && searchQuery.length > 0 && (
                <div style={{
                    position: "absolute",
                    marginTop: 0,
                   
                    width: '45ch',
                    overflowY: "auto",
                    background: "#fff",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    borderRadius: '3%',
                  
                }}>
                    {searchResults.map((client) => (
                        <ListItemButton
                            key={client.id}
                            onClick={() => handleUserClick(client)}
                            style={{
                                borderBottom: "1px solid #ccc",
                                padding: "8px 16px",
                                transition: "background-color 0.3s",
                                marginTop: "0", // Remove marginTop
                            }}
                        >
                            <ListItemText primary={client.name} />
                        </ListItemButton>
                    
                    
                    
                    
                    
                    
                    ))}
                </div>
            )}

            <Stack direction="row" spacing={1}>
                {selectedResults.map((client) => (
                    <Chip
                        key={client.id}
                        label={client.name}
                        variant="outlined"
                        avatar={<Avatar>{client.name.charAt(0)}</Avatar>}
                        onDelete={() => {
                            // Handle chip deletion here
                        }}
                    />
                ))}
            </Stack>
        </div>
    );
};

export default ClientField;
