import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./config/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import { setEmail, setUserName } from "./redux/reducers/config";
import LoginPage from "./components/LoginPage";
import ResponsiveAppBar from "./components/AppBar";
import Layout from "./components/Layout";
import WelcomeFlow from "./components/WelcomeFlow";

function App() {
    const dispatch = useDispatch();

    const [user, loading] = useAuthState(auth);
    const username = useSelector((state) => state.config.username);

    const [isUsernameFetching, setIsUsernameFetching] = useState(false);

    useEffect(() => {
        if (user) {
            setIsUsernameFetching(true); // Set the state to indicate username fetch in progress
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
                            console.log("Username field is not present in the user document.");
                        }
                    } else {
                        console.log("User document not found for the current user.");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                } finally {
                    setIsUsernameFetching(false); // Set the state to indicate username fetch is completed
                }
            };
            fetchUserData(user);
        }
    }, [user]);

    if (loading) {
        return <div>Authentication in Progress . . . </div>;
    }

    // Render the main content only when the username is available
    return (
        <div>
            {user ? (
                <>
                    {isUsernameFetching ? (
                        <div>Loading username...</div>
                    ) : username ? (
                        <>
                            <ResponsiveAppBar />
                            <Layout />
                        </>
                    ) : (
                        <WelcomeFlow currentUser={auth?.currentUser} />
                    )}
                </>
            ) : (
                <LoginPage />
            )}
        </div>
    );
}

export default App;
