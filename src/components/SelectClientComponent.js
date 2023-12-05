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

const SelectClientComponent = ({ dispatchAction }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOn, setSearchOn] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedResults, setSelectedResults] = useState([]);
    // const [showDialog, setShowDialog] = useState(false); // State to control dialog visibility
    const [selectedContact, setSelectedContact] = useState({});
    const [selectedUser, setSelectedUser] = useState();
    const [showChip, setShowChip] = useState(false);
    const createContactId = useSelector((state) => state.companyCrud.createContactId);

    const companyContacts = useSelector((state) => state.companyCrud.companyContacts) || [];

    const dispatch = useDispatch();
    let results = {};

    const handleClickChip = () => {
        console.info("You clicked the Chip.");
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
            console.log("User :", results);
            // results.push({ id: createContactId, name: "Create New" })
            setSearchResults(results);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
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
        setSelectedContact(client);
        setSearchQuery(""); // Update the search query with the client's name
        setSearchResults([]); // Clear the search suggestion list
        setSearchOn(false);
        dispatch(dispatchAction(client));
        // setShowDialog(true);
    };
    const handleMouseEnter = (id) => {
        console.log("Mouse Enter: ", id);
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
                value={
                    searchOn
                        ? searchQuery
                        : selectedContact.name
                        ? selectedContact.name + " - # " + selectedContact.clientSid
                        : "Start typing..."
                }
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={() => setSearchOn(true)}
                onMouseOut={() => setSearchOn(false)}
                label="Search for users by name..."
                variant="standard"
                InputLabelProps={{
                    shrink: true,
                }}
            />

            {searchResults.length > 0 && searchQuery.length > 0 && (
                <div style={listContainerStyles}>
                    <List dense>
                        {searchResults.map((client) => (
                            <ListItemButton
                                key={client.id}
                                onClick={() => handleUserClick(client)}
                                // onMouseEnter={()=>handleMouseEnter(client.id)}
                            >
                                <ListItemText primary={client.name} />
                            </ListItemButton>
                        ))}
                    </List>
                </div>
            )}
        </div>
    );
};

export default SelectClientComponent;
