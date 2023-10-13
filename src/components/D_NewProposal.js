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


export default function AddProposalDialog(props) {

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
            charges: [],
            payments: [],
            terms: []

        }
    );

    const [open, setOpen] = React.useState();


    const handleClose = () => {
        setOpen(false);
    };

    const onSubmitClient = async () => {
      
        console.log("Auth UID:", auth);
        console.log(quotation.productName)
        console.log(quotation.subtitle)
        console.log(quotation.client)
        console.log(quotation.company)
        console.log(quotation.description)
        console.log(quotation.scope)
        console.log(quotation.pre_reqs)
        console.log(quotation.fulfilment)
        console.log(quotation.timeline)
        console.log(quotation.terms)
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
            <Card sx={{ width: "65vw", minHeight: "70vh", p: 5 }}>
                <Typography variant="h5">Make Proposal</Typography>

                <Grid container mt={1} spacing={6}>
                    <Grid item md={6}>
                        <TextField
                            sx={{ width: '45ch' }}
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
                    </Grid>

                    <Grid item md={6}>
                        <TextField  // No margin here
                            sx={{ width: '45ch' }}
                            autoFocus
                            id="Subtitle"
                            label="Proposal Subtitle"
                            variant="standard"
                            onChange={(e) => setQuotation({ ...quotation, subtitle: e.target.value })}

                        />
                    </Grid>

                    <Grid item md={6}>
                        <ClientField updateClientInQuotation={updateClientInQuotation} />

                    </Grid>

                    <Grid item md={6}>
                        <TextField
                            style={{ width: '45ch' }}
                            id="company"
                            label="Client Company"
                            type="name"
                            variant="standard"
                            onChange={(e) => setQuotation({ ...quotation, company: e.target.value })}
                        />
                    </Grid>

                    <Grid item xs={6} >
                        <Typography gutterBottom><b>Product Description :</b></Typography>
                        <Stack

                            spacing={2}
                            sx={{
                                borderRadius: "10px",

                            }}
                        >
                            {quotation.productName.map((productName) => (
                                <TextField sx={{ width: "45ch" }}
                                    key={productName}
                                    label={productName}
                                    onChange={(e) => setQuotation({
                                        ...quotation, description: [...quotation.description, e.target.value]
                                    })}
                                    variant="standard"

                                />
                            ))}
                        </Stack>
                    </Grid>

                    <Grid item md={6}>
                        <Typography gutterBottom><b>Scope Of Work</b></Typography>
                        <Stack

                            spacing={2}
                            sx={{
                                borderRadius: "10px",

                            }}
                        >
                            {quotation.productName.map((productName) => (
                                <TextField sx={{ width: "45ch" }}
                                    key={productName}
                                    label={productName}
                                    onChange={(e) => setQuotation({ ...quotation, scope: e.target.value })}
                                    variant="standard"

                                />
                            ))}
                        </Stack>
                    </Grid>

                    <Grid item md={6}>
                        <Typography gutterBottom ><b>Fulfilment By Client</b></Typography>
                        <Stack

                            spacing={2}
                            sx={{
                                borderRadius: "10px",

                            }}
                        >
                            {quotation.productName.map((productName) => (
                                <TextField sx={{ width: "45ch" }}
                                    key={productName}
                                    label={productName}
                                    onChange={(e) => setQuotation({ ...quotation, fulfilment: e.target.value })}
                                    variant="standard"

                                />
                            ))}
                        </Stack>
                    </Grid>

                    <Grid item md={6}>
                        <Typography gutterBottom><b>Pre_Reqs from Client</b></Typography>
                        <Stack

                            spacing={2}
                            sx={{
                                borderRadius: "10px",

                            }}
                        >
                            {quotation.productName.map((productName) => (
                                <TextField sx={{ width: "45ch" }}
                                    key={productName}
                                    label={productName}
                                    onChange={(e) => setQuotation({ ...quotation, pre_reqs: e.target.value })}
                                    variant="standard"

                                />
                            ))}
                        </Stack>
                    </Grid>

                    <Grid item md={6}>
                        <Typography gutterBottom><b>Project Timeline</b></Typography>
                        <Stack

                            spacing={2}
                            sx={{
                                borderRadius: "10px",

                            }}
                        >
                            {quotation.productName.map((productName) => (
                                <TextField sx={{ width: "45ch" }}
                                    key={productName}
                                    label={productName}
                                    onChange={(e) => setQuotation({ ...quotation, timeline: e.target.value })}
                                    variant="standard"

                                />
                            ))}
                        </Stack>
                    </Grid>
                    <Grid item md={6}>
                        <Typography gutterBottom><b>Terms and Conditions</b></Typography>
                        <Stack

                            spacing={2}

                            sx={{
                                borderRadius: "10px",

                            }}
                        >
                            {quotation.productName.map((productName) => (
                                <TextField sx={{ width: "45ch" }}
                                    key={productName}
                                    label={productName}
                                    variant="standard"
                                    onChange={(e) => setQuotation({ ...quotation, terms: e.target.value })}
                                />
                            ))}
                        </Stack>
                    </Grid>
                    <Grid md={12} sx={{ m: 5 }}>
                        <Typography gutterBottom><b>Charges </b></Typography>
                        <TableContainer component={Paper} sx={{ maxWidth: 1200, }}>
                            <Table aria-label="spanning table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>Sr. No</b></TableCell>
                                        <TableCell><b>Task</b></TableCell>
                                        <TableCell align="right"><b>Price</b></TableCell>
                                    </TableRow>

                                </TableHead>
                                <TableBody>
                                    {quotation.productName.map((productName, index) => (
                                        <Fragment key={index}>
                                            <TableRow>
                                                <TableCell colSpan={3} align="center" contentEditable sx={{ overflowWrap: 'break-word', maxWidth: '30ch' }}>
                                                    <b>{productName}</b>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>1</TableCell>
                                                <TableCell contentEditable sx={{ overflowWrap: 'break-word', maxWidth: '20ch' }}>Sample</TableCell>
                                                <TableCell align="right" contentEditable sx={{ overflowWrap: 'break-word', maxWidth: '10ch' }}>$100.00</TableCell>
                                            </TableRow>
                                        </Fragment>
                                    ))}
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell ><b>Included</b></TableCell>
                                        <TableCell align="right" contentEditable sx={{ overflowWrap: 'break-word', maxWidth: '20ch' }}>Sample</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell ><b>Excluded</b></TableCell>
                                        <TableCell align="right" contentEditable sx={{ overflowWrap: 'break-word', maxWidth: '20ch' }}>Sample</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell align="right">Discount</TableCell>
                                        <TableCell align="right" contentEditable sx={{ overflowWrap: 'break-word', maxWidth: '10ch' }}>$100.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right" contentEditable sx={{ overflowWrap: 'break-word', maxWidth: '10ch' }}>$100.00</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                    <Grid md={12} sx={{ m: 5, marginTop: 2 }}>
                        <Typography gutterBottom><b>Payment Terms</b></Typography>
                        <TableContainer component={Paper} sx={{ maxWidth: 1200, }}>
                            <Table aria-label="spanning table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>Sr. No</b></TableCell>
                                        <TableCell><b>Task</b></TableCell>
                                        <TableCell align="right"><b>Due %</b></TableCell>
                                        <TableCell align="right"><b>Amount%</b></TableCell>
                                    </TableRow>

                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>1</TableCell>
                                        <TableCell contentEditable sx={{ overflowWrap: 'break-word', maxWidth: '20ch' }}>Sample</TableCell>
                                        <TableCell align="right" contentEditable sx={{ overflowWrap: 'break-word', maxWidth: '10ch' }}>$100.00</TableCell>
                                        <TableCell align="right" contentEditable sx={{ overflowWrap: 'break-word', maxWidth: '10ch' }} >$100</TableCell>

                                    </TableRow>


                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sx={{
                            marginTop: 5,
                            marginLeft: 2,
                            padding: "24px",
                            backgroundColor: "#fbfbfb",

                        }}
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Typography variant="info" fontSize="12px" color="grey">
                                *Make sure to save all changes
                            </Typography>
                            <Stack spacing={2} direction="row">
                                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                                <Button variant="contained" onClick={onSubmitClient}>
                                    Update
                                </Button>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </Card>
        </div >
    );
}
