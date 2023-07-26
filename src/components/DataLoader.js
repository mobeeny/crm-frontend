//This is a Sample Redux Component
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/reducers/counter";
import client from "../data/clients";
import { auth, googleAuthProvider, db, instancesRef } from "../config/firebase";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

export default function DataLoader() {
    const count = useSelector((state) => state.counter.value);
    const username = useSelector((state) => state.config.username);

    const dispatch = useDispatch();
    const clientCollectionRef = collection(db, instancesRef + username + "/client");

    const submitClient = async (client) => {
        try {
            await addDoc(clientCollectionRef, {
                name: client.firstname + " " + client.lastname,
                email: client.email,
                phone: client.phonenumber,
                cof: "hosterlink",
                source: "hosterlink",
                cnic: "NA",
                city: client.city,
                cDate: client.created_at,
                bDate: "NA",
                notes: client.notes,
            });
        } catch (err) {
            console.error(err);
        }
    };
    const LoadDataToFirebase = async () => {
        client.forEach(async (client) => {
            try {
                await submitClient(client);
            } catch (err) {
                console.error(err);
            }
        });
    };
    console.log("Client: ", client);

    return (
        <div>
            <button onClick={() => LoadDataToFirebase()}>Load Data</button>
            {/* <button onClick={() => dispatch(decrement())}>Decrement</button> */}
        </div>
    );
}
