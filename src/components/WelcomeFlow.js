import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/reducers/counter";
import { db, instancesRef } from "../config/firebase";
import { getDocs, setDoc, collection, query, where, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { setEmail, setUserName } from "../redux/reducers/config";

const WelcomeFlow = ({ currentUser }) => {
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    console.log("Hello Welcome Page");

    // useEffect(() => {
    //
    // }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the entered username already exists in the "users" collection
        const usersCollection = collection(db, "users");
        const instancesCollection = collection(db, "instances");

        const userQuery = query(usersCollection, where("username", "==", username));
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
            setError("Username already exists. Please choose a different username.");
            return;
        }

        // Fetch the user document based on the email of the currently signed-in user
        const userEmail = currentUser.email;
        const userQueryByEmail = query(usersCollection, where("email", "==", userEmail));
        const userSnapshot = await getDocs(userQueryByEmail);

        if (!userSnapshot.empty) {
            // Update the current user's document with the entered username
            const userDocRef = userSnapshot.docs[0].ref;
            await updateDoc(userDocRef, { username });
            console.log("Username updated successfully.");
            dispatch(setUserName(username));

            //We are creating a New Doc for the New User Instance here based on their username
            const newInstanceDoc = doc(instancesCollection, username);
            const newInstanceData = {
                creationDate: new Date().getTime(),
                // You can add more fields as needed
            };

            await setDoc(newInstanceDoc, newInstanceData);
        } else {
            console.log("User document not found for the current user.");
        }

        // Clear the username field and any previous error message
        setUsername("");
        setError("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Enter your username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
            </div>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <button type="submit">Submit</button>
        </form>
    );
};

export default WelcomeFlow;
