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
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import { setQuotationSelectedProducts } from "../redux/reducers/quotationCrud";

const SelectProductsComponent = () => {
    const [products, setProducts] = useState([]);
    const selectedProducts = useSelector((state) => state.quotationCrud.quotationSelectedProducts) || [];
    const [productNames, setProductNames] = React.useState([]);
    const [productIds, setProductIds] = React.useState([]);

    const dispatch = useDispatch();

    const fetchProductsList = async () => {
        try {
            const productsCollectionRef = collection(db, instancesRef + auth.currentUser.uid + "/products&services");
            const rawData = await getDocs(productsCollectionRef);
            const results = rawData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            console.log("Loaded Products", results);
            setProducts(results);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    useEffect(() => {
        fetchProductsList();
    }, []);

    const handleClick = (payload) => {
        console.log(payload);

        const productIndex = productIds.indexOf(payload.id);

        if (productIndex > -1) {
            const updatedProductIds = [...productIds];
            const updatedProductNames = [...productNames];
            const updatedSelectedProducts = [...selectedProducts];
            updatedSelectedProducts.splice(productIndex, 1);
            updatedProductIds.splice(productIndex, 1);
            updatedProductNames.splice(productIndex, 1);
            setProductIds(updatedProductIds);
            setProductNames(updatedProductNames);
            dispatch(setQuotationSelectedProducts(updatedSelectedProducts));
        } else {
            dispatch(setQuotationSelectedProducts([...selectedProducts, payload]));
            setProductIds([...productIds, payload.id]);
            setProductNames([...productNames, payload.name]);
        }
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
            <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
                <InputLabel variant="standard" id="demo-multiple-checkbox-label"></InputLabel>
                <Select
                    variant="standard"
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={productNames}
                    // onChange={() => handleClick(selected)}
                    // input={<OutlinedInput />}
                    renderValue={(selected) => selected.join(", ")}
                    // MenuProps={MenuProps}
                >
                    {products.map((product) => (
                        <MenuItem key={product} value={product}>
                            <Checkbox variant="standard" checked={productIds.indexOf(product.id) > -1} />
                            <ListItemText primary={product.name} onClick={() => handleClick(product)} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default SelectProductsComponent;
