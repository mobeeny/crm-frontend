import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Textarea from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DescriptionIcon from '@mui/icons-material/Description';
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { Box, InputLabel } from "@mui/material";
import { auth, db, instancesRef } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Checkbox, MenuItem, FormControlLabel } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setproductDetails } from "../redux/reducers/proposal";
import {

    Card,
    Grid,
    IconButton,
    Stack,

    Typography,
} from "@mui/material";
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import ClientField from "./ClientField";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Fragment } from "react";
import PDFFile from "./Settings/PropsalSettings/PDFFile";
import { setQuotationDialog } from "../redux/reducers/dialogFlags";


export default function AddQuotaionDialog() {

    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [fullWidth, setFullWidth] = React.useState(true);


    const productCollectionRef = collection(
        db,
        instancesRef + auth.currentUser.uid + "/products&services"
    );





    const [quotation, setQuotation] = useState(
        {
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
                total: 0
            },
            payments: {
                task: [],
                due: [],
                amount: []
            },
            terms: []

        }
    );


    const quotationDialogOpen = useSelector((state) => state.dialogs.quotationDialogOpen)


    const handleClose = () => {
        dispatch(setQuotationDialog(false));
    };

    const onSubmitClient = async () => {

        console.log("Auth UID:", auth);
        console.log("product Name", quotation.productName)
        console.log("subtitle", quotation.subtitle)
        console.log("client", quotation.client)
        console.log("company", quotation.company)
        console.log("description", quotation.description)
        console.log(quotation.scope)
        console.log(quotation.pre_reqs)
        console.log(quotation.fulfilment)
        console.log(quotation.timeline)
        console.log(quotation.terms)
        console.log(quotation.charges)
        console.log(quotation.payments)
    };


    const productDetails = useSelector((state) => state.proposal.productDetails);
    const dispatch = useDispatch()
    const getProduct = async () => {
        // Read the Data
        // Set the Movie List
        try {
            const data = await getDocs(productCollectionRef);

            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            console.log(filteredData)
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
                productName: quotation.productName.filter((product, index) => index !== quotation.id.indexOf(productId)), // Remove corresponding product name
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
        console.log(quotation.id)

    };


    const s = () => {
        console.log(quotation.client)
    }


    const updateClientInQuotation = (clientValue) => {
        setQuotation((quotation) => ({
            ...quotation,
            client: clientValue,
        }));
    };



    return (
        <div>
            <Dialog open={quotationDialogOpen} onClose={handleClose}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >
                <DialogTitle>Add New Project</DialogTitle>
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
                                        return selectedProduct ? selectedProduct.name : '';
                                    });
                                    return selectedNames.join(', ');
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



                        <TextField  // No margin here

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
                            <ClientField updateClientInQuotation={updateClientInQuotation} />
                        </Stack>


                        {quotation.productName.length > 0 ? <Typography style={{ fontSize: 18 }}>Product Description</Typography> : null}
                        {quotation.productName.map((productName, index) => (
                            <TextField
                                key={productName}
                                label={productName}
                                onChange={(e) => {
                                    const newQuotation = { ...quotation };
                                    newQuotation.description[index] = e.target.value;
                                    setQuotation(newQuotation);
                                }}
                                variant="standard"

                            />
                        ))}




                        {quotation.productName.length > 0 ? <Typography style={{ fontSize: 18 }}>Scope Of Work</Typography> : null}

                        {quotation.productName.map((productName, index) => (
                            <TextField sx={{ width: "45ch" }}
                                key={productName}
                                label={productName}
                                onChange={(e) => {
                                    const newQuotation = { ...quotation };
                                    newQuotation.scope[index] = e.target.value;
                                    setQuotation(newQuotation);
                                }}
                                variant="standard"

                            />
                        ))}



                        {quotation.productName.length > 0 ? <Typography style={{ fontSize: 18 }} >Fulfilment By Client</Typography> : null}

                        {quotation.productName.map((productName, index) => (
                            <TextField
                                key={productName}
                                label={productName}
                                onChange={(e) => {
                                    const newQuotation = { ...quotation };
                                    newQuotation.fulfilment[index] = e.target.value;
                                    setQuotation(newQuotation);
                                }}
                                variant="standard"

                            />
                        ))}




                        {quotation.productName.length > 0 ? <Typography style={{ fontSize: 18 }}>Pre_Reqs from Client</Typography> : null}

                        {quotation.productName.map((productName, index) => (
                            <TextField
                                key={productName}
                                label={productName}
                                onChange={(e) => {
                                    const newQuotation = { ...quotation };
                                    newQuotation.pre_reqs[index] = e.target.value;
                                    setQuotation(newQuotation);
                                }}
                                variant="standard"

                            />
                        ))}




                        {quotation.productName.length > 0 ? <Typography style={{ fontSize: 18 }}>Project Timeline</Typography> : null}

                        {quotation.productName.map((productName, index) => (
                            <TextField
                                key={productName}
                                label={productName}
                                onChange={(e) => {
                                    const newQuotation = { ...quotation };
                                    newQuotation.timeline[index] = e.target.value;
                                    setQuotation(newQuotation);
                                }}
                                variant="standard"

                            />
                        ))}


                        {quotation.productName.length > 0 ? <Typography style={{ fontSize: 18 }}>Terms and Conditions</Typography> : null}

                        {quotation.productName.map((productName, index) => (
                            <TextField
                                key={productName}
                                label={productName}
                                variant="standard"
                                onChange={(e) => {
                                    const newQuotation = { ...quotation };
                                    newQuotation.terms[index] = e.target.value;
                                    setQuotation(newQuotation);
                                }} />
                        ))}


                        <table style={{ border: '1px solid #ccc', width: '100%', textAlign: 'center', borderCollapse: 'collapse', marginTop: "2%", marginBottom: "2%" }}>
                            <thead>
                                <tr>
                                    <th colSpan={3} style={{ padding: '10px', fontSize: '18px' }}>Charges</th>
                                </tr>
                                <tr>
                                    <th style={{ border: '1px solid #000', padding: '10px', }}>Sr.No</th>
                                    <th style={{ border: '1px solid #000', padding: '10px', }}>Task</th>
                                    <th style={{ border: '1px solid #000', padding: '10px', }}>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quotation.productName.map((productName, index) => (
                                    <Fragment key={index}>
                                        <tr>
                                            <td colSpan={3} align="center" style={{ border: '1px solid #000', padding: '10px', }}>
                                                <b>{productName}</b>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ border: '1px solid #000', padding: '10px' }}>1</td>
                                            <td contentEditable style={{ border: '1px solid #000', padding: '10px', width: '50%', backgroundColor: '#fff' }} onInput={(e) => {
                                                const newQuotation = { ...quotation };
                                                newQuotation.charges.task[index] = e.target.innerText;
                                                setQuotation(newQuotation);
                                            }}>
                                                sample
                                            </td>
                                            <td align="right" contentEditable style={{ border: '1px solid #000', padding: '10px', width: '20%', backgroundColor: '#fff' }} onInput={(e) => {
                                                const newQuotation = { ...quotation };
                                                newQuotation.charges.prices[index] = e.target.innerText;
                                                setQuotation(newQuotation);
                                            }}> price</td>
                                        </tr>
                                    </Fragment>
                                ))}
                                <tr>
                                    <td style={{ border: '1px solid #000', padding: '10px', }} >Included</td>
                                    <td
                                        onInput={(e) => {
                                            const newQuotation = { ...quotation };
                                            newQuotation.charges.included = e.target.innerText;
                                            setQuotation(newQuotation);
                                        }}
                                        contentEditable colSpan={2} style={{ border: '1px solid #000', padding: '10px', }}
                                    >{quotation.charges.included}</td>
                                </tr>
                                <tr>
                                    <td
                                        onInput={(e) => {
                                            const newQuotation = { ...quotation };
                                            newQuotation.charges.excluded = e.target.innerText;
                                            setQuotation(newQuotation);
                                        }}
                                        style={{ border: '1px solid #000', padding: '10px', }}>Excluded</td>
                                    <td contentEditable colSpan={2} style={{ border: '1px solid #000', padding: '10px', }}>{quotation.charges.excluded}</td>
                                </tr>
                                <tr>
                                    <td
                                        colSpan={2} align="center" style={{ border: '1px solid #000', padding: '10px', }}>Total</td>
                                    <td
                                        onInput={(e) => {
                                            const newQuotation = { ...quotation };
                                            newQuotation.charges.total = e.target.innerText;
                                            setQuotation(newQuotation);
                                        }}
                                        contentEditable style={{ border: '1px solid #000', padding: '10px', }}>{quotation.charges.total}</td>
                                </tr>
                                <tr>
                                    <td

                                        colSpan={2} align="center" style={{ border: '1px solid #000', padding: '10px', }}>Discount</td>
                                    <td
                                        onInput={(e) => {
                                            const newQuotation = { ...quotation };
                                            newQuotation.charges.discount = e.target.innerText;
                                            setQuotation(newQuotation);
                                        }}
                                        contentEditable style={{ border: '1px solid #000', padding: '10px', }}>    {quotation.charges.discount}</td>
                                </tr>
                            </tbody>
                        </table>



                        <table style={{ border: '1px solid #ccc', width: '100%', textAlign: 'center', borderCollapse: 'collapse', marginTop: "2%", marginBottom: "2%" }}>
                            <thead>
                                <tr>
                                    <th colSpan={4} style={{   padding: '10px', fontSize: '18px' }}>Payment Terms</th>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid #000', padding: '10px', }}>Sr. No</td>
                                    <td style={{ border: '1px solid #000', padding: '10px', }}>Task</td>
                                    <td style={{ border: '1px solid #000', padding: '10px', }}>Due %</td>
                                    <td style={{ border: '1px solid #000', padding: '10px', }}>Amount %</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ border: '1px solid #000', padding: '10px' }}>1</td>
                                    <td contentEditable style={{ border: '1px solid #000', padding: '10px', backgroundColor: '#fff' }} onInput={(e) => {
                                        const newQuotation = { ...quotation };
                                        newQuotation.payments.task = e.target.innerText;
                                        setQuotation(newQuotation);
                                    }}>
                                        Sample
                                    </td>
                                    <td align="right" contentEditable style={{ border: '1px solid #000', padding: '10px', backgroundColor: '#fff' }}>$100.00</td>
                                    <td align="right" contentEditable style={{ border: '1px solid #000', padding: '10px', backgroundColor: '#fff' }}>$100</td>
                                </tr>
                            </tbody>
                        </table>



                    </Box>

                    <DialogActions>
                        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" onClick={onSubmitClient}>
                            Update
                        </Button>
                    </DialogActions>

                </DialogContent>
            </Dialog >
        </div >
    );
}
