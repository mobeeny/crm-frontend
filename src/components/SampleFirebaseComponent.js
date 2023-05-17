import { auth, googleAuthProvider, db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { Auth } from "./Auth";

import { useState } from "react";

export const SampleFirebaseComponent = () => {
  <div>
    <Auth />
  </div>;
};
