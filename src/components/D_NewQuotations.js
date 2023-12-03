import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { Box, Card, Grid, InputLabel, Paper } from "@mui/material";
import { auth, db, instancesRef } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Checkbox, MenuItem, FormControlLabel } from "@mui/material";
import { getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setproductDetails } from "../redux/reducers/proposal";
import { Stack, Typography } from "@mui/material";
import { Fragment } from "react";
import { setQuotationDialog } from "../redux/reducers/dialogFlags";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import ButtonBase from '@mui/material/ButtonBase';

export default function AddQuotaionDialog() {
    const [maxWidth, setMaxWidth] = React.useState("sm");
    const [fullWidth, setFullWidth] = React.useState(true);
    const productCollectionRef = collection(db, instancesRef + auth.currentUser.uid + "/products&services");
    const quotationCollectionRef = collection(db, instancesRef + auth.currentUser.uid + "/quotation");

    const [quotation, setQuotation] = useState({
        id: [],
        productName: [],
        subtitle: "",
        client: "",
        company: "",
        description: [],
        scope: [],
        pre_reqs: [],
        fulfilment: [],
        timeline: [],
        charges: {
            task: [],
            prices: [],
            included: "",
            excluded: "",
            discount: 0,
            total: 0,
        },
        payments: {
            task: [],
            due: [],
            amount: [],
        },
        terms: [],
    });

    const quotationDialogOpen = useSelector((state) => state.dialogs.quotationDialogOpen);

    const handleClose = () => {
        dispatch(setQuotationDialog(false));
    };

    const onSubmitClient = async () => {
        console.log("product Details ", productDetails)
        try {
            const docRef = doc(db, instancesRef + auth.currentUser.uid + "/systemData/" + "sequenceIds");
            console.log("DocRef: ", docRef);

            try {
                const sIds = await getDoc(docRef);
                if (sIds.exists()) {
                    console.log("Current quotationtSid:", sIds.data());
                    // Get the current clientSid value
                    const currentSid = sIds.data().quotationSid;
                    // Increment the clientSid value by 1
                    const updatedSid = currentSid + 1;

                    // Update the document with the new clientSid value
                    await updateDoc(docRef, { quotationSid: updatedSid });

                    // Include the updated clientSid in the data object
                    await addDoc(quotationCollectionRef, {
                        productId: quotation.id,
                        productName: quotation.productName,
                        subtitle: quotation.subtitle,
                        client: quotation.client,
                        company: quotation.company,
                        description: quotation.description,
                        scope: quotation.scope,
                        pre_reqs: quotation.pre_reqs,
                        fulfilment: quotation.fulfilment,
                        timeline: quotation.timeline,
                        charges: quotation.charges,
                        payments: quotation.payments,
                        terms: quotation.terms,
                        quotationSid: updatedSid,
                    });
                } else {
                    console.log("Document does not exist.");
                    // Handle the case where the document doesn't exist, if necessary.
                }
            } catch (error) {
                console.error("Error fetching document:", error);
                // Handle any errors that may occur during the retrieval process.
            }

            // Close the dialog
            handleClose();
        } catch (err) {
            console.error(err);
        }
    };

    const productDetails = useSelector((state) => state.proposal.productDetails);
    const dispatch = useDispatch();
    const getProduct = async () => {
        // Read the Data
        // Set the Movie List
        try {
            const data = await getDocs(productCollectionRef);

            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            console.log(filteredData);
            dispatch(setproductDetails(filteredData));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    const handleCheckboxChange = (productId) => {
        if (quotation.id.includes(productId)) {
            setQuotation({
                ...quotation,
                id: quotation.id.filter((product) => product !== productId),
                productName: quotation.productName.filter(
                    (product, index) => index !== quotation.id.indexOf(productId)
                ), // Remove corresponding product name
            });
        } else {
            const selectedProduct = productDetails.find((product) => product.id === productId);
            if (selectedProduct) {
                setQuotation({
                    ...quotation,
                    id: [...quotation.id, productId],
                    productName: [...quotation.productName, selectedProduct.name], // Add product name
                });
            }
        }
        console.log(quotation.id);
    };



    const handleToggle = () => {
        setSelectedButton((prev) => (prev === 'Right' ? 'Left' : 'Right'));

    };
    const [selectedButton, setSelectedButton] = useState("Right")

    return (
        <div>
            <Dialog open={quotationDialogOpen} onClose={handleClose} fullWidth={fullWidth} maxWidth={maxWidth}>
                <DialogTitle>Add New Quotation</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{
                            "& .MuiTextField-root": { m: 1, width: "28ch" },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            select
                            label="Select Products"
                            variant="standard"
                            value={quotation.id}
                            onChange={(e) => setQuotation({ ...quotation, id: e.target.value })}
                            SelectProps={{
                                multiple: true, // Allow multiple selections
                                renderValue: (selected) => {
                                    const selectedNames = selected.map((id) => {
                                        const selectedProduct = productDetails.find((product) => product.id === id);
                                        return selectedProduct ? selectedProduct.name : "";
                                    });
                                    return selectedNames.join(", ");
                                }, // Display selected items as comma-separated text
                            }}
                        >
                            {productDetails.map((product) => (
                                <MenuItem key={product.id} value={product.id}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={quotation.id.includes(product.id)}
                                                onChange={() => handleCheckboxChange(product.id)}
                                            />
                                        }
                                        label={product.name}
                                    />
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField // No margin here
                            autoFocus
                            id="Subtitle"
                            label="Proposal Subtitle"
                            variant="standard"
                            onChange={(e) => setQuotation({ ...quotation, subtitle: e.target.value })}
                        />

                        <Stack direction={"row"}>
                            <TextField
                                id="company"
                                label="Client Company"
                                type="name"
                                variant="standard"
                                onChange={(e) => setQuotation({ ...quotation, company: e.target.value })}
                            />
                        </Stack>




                        {quotation.productName.map((productName, index) => (

                            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                                <Paper
                                    elevation={3}
                                    sx={{
                                        backgroundColor: '#F8F9FA',
                                        padding: '16px',
                                        borderRadius: '10px',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',

                                    }}>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item xs>
                                                <Typography gutterBottom variant="subtitle1" component="div" style={{
                                                    color: '#E9ECEF',
                                                    backgroundColor: '#343A40',
                                                    padding: '10px',
                                                    borderRadius: '5px',
                                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                                    textAlign: 'center',
                                                    fontWeight: 'bold',
                                                }}>
                                                    {productName}
                                                </Typography>
                                                <Stack direction={"row"}>
                                                    <TextField
                                                        key={productName}
                                                        label={"Product Description"}
                                                        onChange={(e) => {
                                                            const newQuotation = { ...quotation };
                                                            newQuotation.description[index] = e.target.value;
                                                            setQuotation(newQuotation);
                                                        }}
                                                        variant="standard"
                                                    />
                                                    <TextField
                                                        key={productName}
                                                        label={"Scope Of Work "}
                                                        onChange={(e) => {
                                                            const newQuotation = { ...quotation };
                                                            newQuotation.description[index] = e.target.value;
                                                            setQuotation(newQuotation);
                                                        }}
                                                        variant="standard"
                                                    />
                                                </Stack>
                                                <Stack direction={"row"}>
                                                    <TextField
                                                        key={productName}
                                                        label={"Fulfilment"}
                                                        onChange={(e) => {
                                                            const newQuotation = { ...quotation };
                                                            newQuotation.description[index] = e.target.value;
                                                            setQuotation(newQuotation);
                                                        }}
                                                        variant="standard"
                                                    />
                                                    <TextField
                                                        key={productName}
                                                        label={"Pre_Reqs"}
                                                        onChange={(e) => {
                                                            const newQuotation = { ...quotation };
                                                            newQuotation.description[index] = e.target.value;
                                                            setQuotation(newQuotation);
                                                        }}
                                                        variant="standard"
                                                    />
                                                </Stack>
                                                <Stack direction={"row"}>
                                                    <TextField
                                                        key={productName}
                                                        label={'Timeline '}
                                                        onChange={(e) => {
                                                            const newQuotation = { ...quotation };
                                                            newQuotation.description[index] = e.target.value;
                                                            setQuotation(newQuotation);
                                                        }}
                                                        variant="standard"
                                                    />
                                                    <TextField
                                                        key={productName}
                                                        label={"Terms & Conditions"}
                                                        onChange={(e) => {
                                                            const newQuotation = { ...quotation };
                                                            newQuotation.description[index] = e.target.value;
                                                            setQuotation(newQuotation);
                                                        }}
                                                        variant="standard"
                                                    />

                                                </Stack>
                                                <div style={{ margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%', textAlign: 'center' }}>
                                                    <button
                                                        type="button"
                                                        onClick={handleToggle}
                                                        style={{
                                                            padding: '12px 16px',
                                                            backgroundColor: selectedButton === 'Right' ? '#343A40' : '#ddd',
                                                            color: selectedButton === 'Right' ? '#fff' : '#000',
                                                            border: 'none',
                                                            borderRadius: '5px 0 0 5px',
                                                            cursor: 'pointer',
                                                            transition: 'background-color 0.3s, color 0.3s',
                                                            fontSize: '16px',  // Adjust the font size
                                                        }}
                                                    >
                                                        Total  Price
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={handleToggle}
                                                        style={{
                                                            padding: '12px 16px',
                                                            backgroundColor: selectedButton === 'Left' ? '#3498DB' : '#ddd',
                                                            color: selectedButton === 'Left' ? '#fff' : '#000',
                                                            border: 'none',
                                                            borderRadius: '0 5px 5px 0',
                                                            cursor: 'pointer',
                                                            transition: 'background-color 0.3s, color 0.3s',
                                                            fontSize: '16px',  // Adjust the font size
                                                        }}
                                                    >
                                                        Price by Tasks
                                                    </button>
                                                </div>
                                                {selectedButton === "Right" ?
                                                    <TextField label={"price "} /> :
                                                    productDetails[index].subtasks.map((product) => (
                                                        <>
                                                            <TextField value={product.name} />
                                                            <TextField value={product.price} />
                                                        </>
                                                    ))
                                                }
                                            </Grid>

                                        </Grid>

                                    </Grid>
                                </Paper>
                            </Grid>
                        ))}

                        <table
                            style={{
                                border: "1px solid #ccc",
                                width: "100%",
                                textAlign: "center",
                                borderCollapse: "collapse",
                                marginTop: "2%",
                                marginBottom: "2%",
                            }}
                        >
                            <thead>
                                <tr>
                                    <th colSpan={3} style={{ padding: "10px", fontSize: "18px" }}>
                                        Charges
                                    </th>
                                </tr>
                                <tr>
                                    <th style={{ border: "1px solid #000", padding: "10px" }}>Sr.No</th>
                                    <th style={{ border: "1px solid #000", padding: "10px" }}>Task</th>
                                    <th style={{ border: "1px solid #000", padding: "10px" }}>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quotation.productName.map((productName, index) => (
                                    <Fragment key={index}>
                                        <tr>
                                            <td
                                                colSpan={3}
                                                align="center"
                                                style={{ border: "1px solid #000", padding: "10px" }}
                                            >
                                                <b>{productName}</b>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ border: "1px solid #000", padding: "10px" }}>1</td>
                                            <td
                                                contentEditable
                                                style={{
                                                    border: "1px solid #000",
                                                    padding: "10px",
                                                    width: "50%",
                                                    backgroundColor: "#fff",
                                                }}
                                                onInput={(e) => {
                                                    const newQuotation = { ...quotation };
                                                    newQuotation.charges.task[index] = e.target.innerText;
                                                    setQuotation(newQuotation);
                                                }}
                                            >
                                                sample
                                            </td>
                                            <td
                                                align="right"
                                                contentEditable
                                                style={{
                                                    border: "1px solid #000",
                                                    padding: "10px",
                                                    width: "20%",
                                                    backgroundColor: "#fff",
                                                }}
                                                onInput={(e) => {
                                                    const newQuotation = { ...quotation };
                                                    newQuotation.charges.prices[index] = e.target.innerText;
                                                    setQuotation(newQuotation);
                                                }}
                                            >
                                                {" "}
                                                price
                                            </td>
                                        </tr>
                                    </Fragment>
                                ))}
                                <tr>
                                    <td style={{ border: "1px solid #000", padding: "10px" }}>Included</td>
                                    <td
                                        onInput={(e) => {
                                            const newQuotation = { ...quotation };
                                            newQuotation.charges.included = e.target.innerText;
                                            setQuotation(newQuotation);
                                        }}
                                        contentEditable
                                        colSpan={2}
                                        style={{ border: "1px solid #000", padding: "10px" }}
                                    >
                                        {quotation.charges.included}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        onInput={(e) => {
                                            const newQuotation = { ...quotation };
                                            newQuotation.charges.excluded = e.target.innerText;
                                            setQuotation(newQuotation);
                                        }}
                                        style={{ border: "1px solid #000", padding: "10px" }}
                                    >
                                        Excluded
                                    </td>
                                    <td
                                        contentEditable
                                        colSpan={2}
                                        style={{ border: "1px solid #000", padding: "10px" }}
                                    >
                                        {quotation.charges.excluded}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        colSpan={2}
                                        align="center"
                                        style={{ border: "1px solid #000", padding: "10px" }}
                                    >
                                        Total
                                    </td>
                                    <td
                                        onInput={(e) => {
                                            const newQuotation = { ...quotation };
                                            newQuotation.charges.total = e.target.innerText;
                                            setQuotation(newQuotation);
                                        }}
                                        contentEditable
                                        style={{ border: "1px solid #000", padding: "10px" }}
                                    >
                                        {quotation.charges.total}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        colSpan={2}
                                        align="center"
                                        style={{ border: "1px solid #000", padding: "10px" }}
                                    >
                                        Discount
                                    </td>
                                    <td
                                        onInput={(e) => {
                                            const newQuotation = { ...quotation };
                                            newQuotation.charges.discount = e.target.innerText;
                                            setQuotation(newQuotation);
                                        }}
                                        contentEditable
                                        style={{ border: "1px solid #000", padding: "10px" }}
                                    >
                                        {" "}
                                        {quotation.charges.discount}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <table
                            style={{
                                border: "1px solid #ccc",
                                width: "100%",
                                textAlign: "center",
                                borderCollapse: "collapse",
                                marginTop: "2%",
                                marginBottom: "2%",
                            }}
                        >
                            <thead>
                                <tr>
                                    <th colSpan={4} style={{ padding: "10px", fontSize: "18px" }}>
                                        Payment Terms
                                    </th>
                                </tr>
                                <tr>
                                    <td style={{ border: "1px solid #000", padding: "10px" }}>Sr. No</td>
                                    <td style={{ border: "1px solid #000", padding: "10px" }}>Task</td>
                                    <td style={{ border: "1px solid #000", padding: "10px" }}>Due %</td>
                                    <td style={{ border: "1px solid #000", padding: "10px" }}>Amount %</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ border: "1px solid #000", padding: "10px" }}>1</td>
                                    <td
                                        contentEditable
                                        style={{ border: "1px solid #000", padding: "10px", backgroundColor: "#fff" }}
                                        onInput={(e) => {
                                            const newQuotation = { ...quotation };
                                            newQuotation.payments.task = e.target.innerText;
                                            setQuotation(newQuotation);
                                        }}
                                    >
                                        Sample
                                    </td>
                                    <td
                                        align="right"
                                        contentEditable
                                        style={{ border: "1px solid #000", padding: "10px", backgroundColor: "#fff" }}
                                    >
                                        $100.00
                                    </td>
                                    <td
                                        align="right"
                                        contentEditable
                                        style={{ border: "1px solid #000", padding: "10px", backgroundColor: "#fff" }}
                                    >
                                        $100
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Box>

                    <DialogActions>
                        <Button variant="outlined" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={onSubmitClient}>
                            Update
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
}
