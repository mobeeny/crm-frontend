import logo from "./logo.svg";
import "./App.css";
import ResponsiveAppBar from "./components/AppBar";
import Layout from "./components/Layout";
import LoginPage from "./components/LoginPage";
import { useEffect, useState } from "react";
import { auth, db } from "./config/firebase";
import FileUpload from "./components/Upload";
import FileUploadForm from "./components/UploadProgress";
import UploadComponent from "./components/Upload2";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
    // console.log("AUTH: ", auth?.currentUser);
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        if (user) {
            console.log("User Info", auth, auth?.currentUser);
        }
    }, [user]);

    if (loading) {
        return <div>Authentication in Progress . . . </div>;
    }

    return (
        <div>
            {user ? (
                <>
                    <ResponsiveAppBar />
                    <Layout />
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
