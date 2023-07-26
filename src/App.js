import "./App.css";
import ResponsiveAppBar from "./components/AppBar";
import Layout from "./components/Layout";
import LoginPage from "./components/LoginPage";
import { useEffect, useState } from "react";
import { auth, db } from "./config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import WelcomeFlow from "./components/WelcomeFlow";
import { useSelector, useDispatch } from "react-redux";
import { setEmail, setUserName } from "./redux/reducers/config";
import { getDocs, collection, query, where, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

function App() {
    // console.log("AUTH: ", auth?.currentUser);
    const dispatch = useDispatch();

    const [user, loading] = useAuthState(auth);
    const username = useSelector((state) => state.config.username);
    useEffect(() => {
        if (user) {
            console.log("User Info", auth, auth?.currentUser);
            const currentUser = auth?.currentUser;
            const fetchUserData = async (currentUser) => {
                try {
                    const usersCollection = collection(db, "users");
                    const userEmail = currentUser.email;

                    const userQuery = query(usersCollection, where("email", "==", userEmail));
                    const userSnapshot = await getDocs(userQuery);

                    if (!userSnapshot.empty) {
                        // User document found, read the username
                        const userData = userSnapshot.docs[0].data();
                        if ("username" in userData) {
                            const username = userData.username;
                            console.log("Username:", username);
                            dispatch(setUserName(username));
                        } else {
                            // Handle the case where the username field is not present
                            console.log("Username field is not present in the user document.");
                            // Perform any other action, e.g., set a default username or show an error message
                        }
                    } else {
                        // User document not found for the current user
                        console.log("User document not found for the current user.");
                        // Perform any other action to handle this scenario
                        // For example, you can set a default username or show an error message to the user
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            };
            fetchUserData(currentUser);
        }
    }, [user]);

    if (loading) {
        return <div>Authentication in Progress . . . </div>;
    }

    return (
        <div>
            {user ? (
                <>
                    {username ? (
                        <>
                            <ResponsiveAppBar />
                            <Layout />
                        </>
                    ) : (
                        <WelcomeFlow currentUser={auth?.currentUser} />
                    )}
                </>
            ) : (
                <>
                    <LoginPage />
                </>
            )}
        </div>
    );
}

export default App;
