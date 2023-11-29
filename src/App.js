import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./config/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
// import { setEmail, setUserName } from "./redux/reducers/config";
import LoginPage from "./components/LoginPage";
import Layout from "./components/Layout";
import { Box, Divider } from "@mui/material";
import DetailsLayout from "./components/DetailsLayout";
import Routes from "./Routes/Routes";

// const HomeLayout = () => (
//     <>
//         <Divider orientation="vertical" variant="middle" flexItem />
//         <DetailsLayout />
//     </>
// );

function App() {
    const dispatch = useDispatch();
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <div>Authentication in Progress . . . </div>;
    }

    return (
        <div>
            {user ? (
                <>
                    <Routes />
                </>
            ) : (
                <LoginPage />
            )}
        </div>
    );
}

export default App;
