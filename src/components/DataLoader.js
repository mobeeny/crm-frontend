//This is a Sample Redux Component
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/reducers/counter";
import users from "../data/clients";
import { auth, googleAuthProvider, db, baseRef } from "../config/firebase";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

export default function DataLoader() {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();
    const usersCollectionRef = collection(db, baseRef + "/users");

    const submitUsers = async (user) => {
        try {
            await addDoc(usersCollectionRef, {
                name: user.firstname + " " + user.lastname,
                email: user.email,
                phone: user.phonenumber,
                cof: "hosterlink",
                source: "hosterlink",
                cnic: "NA",
                city: user.city,
                cDate: user.created_at,
                bDate: "NA",
                notes: user.notes,
            });
        } catch (err) {
            console.error(err);
        }
    };
    const LoadDataToFirebase = async () => {
        users.forEach(async (user) => {
            try {
                await submitUsers(user);
            } catch (err) {
                console.error(err);
            }
        });
    };
    console.log("Users: ", users);

    return (
        <div>
            <button onClick={() => LoadDataToFirebase()}>Load Data</button>
            {/* <button onClick={() => dispatch(decrement())}>Decrement</button> */}
        </div>
    );
}
