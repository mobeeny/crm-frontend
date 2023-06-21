import { auth, googleAuthProvider, db } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { Auth } from "./Auth";
import { useEffect, useState } from "react";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

export const SampleFirebaseComponent = () => {
    const [movieList, setMovieList] = useState([]);
    const [newMovieTitle, setNewMovieTitle] = useState("");
    const [newMovieDate, setNewMovieDate] = useState(0);
    const [newMovieOscar, setNewMovieOscar] = useState(false);
    const [updateMovieTitle, setUpdateMovieTitle] = useState("");
    const moviesCollectionRef = collection(db, "movies");

    const getMovies = async () => {
        //Read the Data
        //Set the Movie List
        try {
            const data = await getDocs(moviesCollectionRef);
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            console.log(filteredData);
            setMovieList(filteredData);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteMovie = async (id) => {
        console.log("Auth Email", auth?.currentUser?.email);
        console.log("Auth uid", auth?.uid);
        console.log("Auth currentUser.uid", auth?.currentUser?.uid);

        const movieDoc = doc(db, "movies", id);
        await deleteDoc(movieDoc);
    };

    const updateMovie = async (id) => {
        const movieDoc = doc(db, "movies", id);
        await updateDoc(movieDoc, { title: updateMovieTitle });
        getMovies();
    };

    useEffect(() => {
        getMovies();
    }, []);

    const onSubmitMovie = async () => {
        try {
            await addDoc(moviesCollectionRef, {
                title: newMovieTitle,
                releaseDate: newMovieDate,
                receivedOscar: newMovieOscar,
                userId: auth?.currentUser?.uid,
            });
            getMovies();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <Auth />
            {/* <div>
                <input placeholder="Title: " onChange={(e) => setNewMovieTitle(e.target.value)} />
                <input
                    placeholder="Release year: "
                    type="number"
                    onChange={(e) => setNewMovieDate(Number(e.target.value))}
                />
                <input type="checkbox" checked={newMovieOscar} onChange={(e) => setNewMovieOscar(e.target.checked)} />
                <label>Received Oscar</label>
                <button onClick={onSubmitMovie}>Submit</button>
            </div>
            <div>
                {movieList.map((movie) => (
                    <div>
                        <h3>{movie.title}</h3>
                        <p>{movie.releaseDate}</p>
                        <p>{movie.receivedOscar ? "Yes" : "No"}</p>
                        <button
                            onClick={() => {
                                deleteMovie(movie.id);
                            }}
                        >
                            Delete Movie
                        </button>
                        <input placeholder="New Title: " onChange={(e) => setUpdateMovieTitle(e.target.value)}></input>
                        <button onClick={() => updateMovie(movie.id)}>Update Title</button>
                    </div>
                ))}
            </div> */}
        </div>
    );
};
