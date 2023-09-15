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


export default function AddProposalDialog(props) {
    // const username = useSelector((state) => state.config.username);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('lg');
    const [open, setOpen] = React.useState();
    const [proposalNo, setProposalNo] = useState(0);
    const [clientName, setClientName] = useState("");
    const [uEmail, setUEmail] = useState("");
    const [selectedProduct, setSelectedProduct] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [scopeOfWork, setScopeOfWork] = useState("");
    const [preReqs, setPreReqs] = useState("");
    const [fulfilment, setFulfilment] = useState("");
    const [discount, setDiscount] = useState("2023-05-10");
    const [termsAndConditions, setTermsAndConditions] = useState("");
    // For Product 1
    const [showTextFieldProduct1, setShowTextFieldProduct1] = useState(false);
    const [showDatePickerProduct1, setShowDatePickerProduct1] = useState(false);
    const [textFieldValueProduct1, setTextFieldValueProduct1] = useState('');

    // For Product 2
    const [showTextFieldProduct2, setShowTextFieldProduct2] = useState(false);
    const [showDatePickerProduct2, setShowDatePickerProduct2] = useState(false);
    const [textFieldValueProduct2, setTextFieldValueProduct2] = useState('');





    const [data, setData] = useState([
        { id: 1, task: '', cost: '0' },
        { id: 2, task: '', cost: '0' },
        { id: 3, task: '', cost: '0' },
    ]);

    const
        handleTaskChange = (id, value) => {
            const updatedData = data.map(item =>
                item.id === id ? { ...item, task: value } : item
            );
            setData(updatedData);
        };

    const handleCostChange = (id, value) => {
        const updatedData = data.map(item =>
            item.id === id ? { ...item, cost: value } : item
        );
        setData(updatedData);
    };


    const handleTextFieldChangeProduct1 = (event) => {
        setTextFieldValueProduct1(event.target.value);
    };



    const handleTextFieldChangeProduct2 = (event) => {
        setTextFieldValueProduct2(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmitClient = async () => {
        console.log("Auth UID:", auth);


    };


    const productCollectionRef = collection(db, instancesRef + auth.currentUser.uid + "/products&services");
    const productDetails = useSelector((state) => state.proposal.productDetails);
    const dispatch = useDispatch()
    const getProduct = async () => {
        // Read the Data
        // Set the Movie List
        try {
            const data = await getDocs(productCollectionRef);
            const filteredData = data.docs.map((doc) => ({ ...doc.data() }));
            dispatch(setproductDetails(filteredData));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getProduct();
    }, []);


    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen} startIcon={<DescriptionIcon />}>
                Proposal
            </Button>
            <Dialog open={open} onClose={handleClose}
                // PaperProps={{
                //     style: {
                //         minHeight: '800px', // Adjust the height as needed
                //         // You can also use a percentage of the viewport height
                //     },
                // }}
                fullWidth={fullWidth}
                maxWidth={maxWidth}>
                <DialogTitle>Add New proposal</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        
                    </DialogContentText> */}
                    <Box
                        component="form"
                        sx={{
                            "& .MuiTextField-root": { m: 3 },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField style={{ width: '35%', marginRight: '15%' }}
                            autoFocus
                            id="proposalNo"
                            label="Proposal Number"
                            type="number"
                            variant="standard"
                            onChange={(e) => setProposalNo(e.target.value)}
                        />
                        <TextField style={{ width: '40%' }} // No margin here
                            autoFocus
                            id="clientName"
                            label="Client Name"
                            type="name"
                            variant="standard"
                            onChange={(e) => setClientName(e.target.value)}
                        />
                        <TextField
                            style={{ width: '35%', marginRight: '15%' }}
                            select
                            label="Select Product"
                            onChange={(e) => setSelectedProduct(e.target.value)}
                            variant="standard"
                        >
                            <MenuItem value="None">None</MenuItem>
                            {productDetails.map((product) => (
                                <MenuItem key={product.name} value={product.name}>
                                    {product.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField style={{ width: '40%' }}
                            id="email"
                            label="Email Address"
                            type="email"
                            variant="standard"
                            onChange={(e) => setUEmail(e.target.value)}
                        />
                        <Textarea style={{ width: '35%', marginRight: '15%' }}
                            multiline
                            rows={3}
                            id="productDescription"
                            label="Product Description"
                            type="name"
                            variant="standard"
                            onChange={(e) => setProductDescription(e.target.value)}
                        />
                        <Textarea style={{ width: '40%' }}
                            multiline
                            rows={3}
                            id="scopeOfWork"
                            label="Scope Of Work"
                            type="name"
                            variant="standard"
                            onChange={(e) => setScopeOfWork(e.target.value)}
                        />
                        <TextField style={{ width: '35%', marginRight: '15%' }}
                            autoFocus
                            id="pre_reqs"
                            label='Pre_reqs from client'
                            type="name"
                            variant="standard"
                            onChange={(e) => setPreReqs(e.target.value)}
                        />
                        <TextField style={{ width: '40%' }} // No margin here
                            autoFocus
                            id="fulfilment"
                            label="Fulfilment by E-axon"
                            type="name"
                            variant="standard"
                            onChange={(e) => setFulfilment(e.target.value)}
                        />
                        <h3 style={{ marginLeft: '20px' }}>Project Timeline : </h3>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <InputLabel style={{ marginRight: '20px', marginLeft: '2%' }}>
                                <b>Product 1 : </b>
                            </InputLabel>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={showTextFieldProduct1}

                                        onChange={() => {
                                            setShowTextFieldProduct1(true);
                                            setShowDatePickerProduct1(false);
                                        }}
                                    />
                                }
                                label="Add Text Manually"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={showDatePickerProduct1}
                                        onChange={() => {
                                            setShowTextFieldProduct1(false);
                                            setShowDatePickerProduct1(true);
                                        }}
                                    />
                                }
                                label="Select By Date"
                            />
                            {showTextFieldProduct1 && (
                                <TextField
                                    style={{ width: '40%' }}
                                    label="Describe about Product"
                                    variant="outlined"
                                    value={textFieldValueProduct1}
                                    onChange={handleTextFieldChangeProduct1}
                                />
                            )}
                            {showDatePickerProduct1 && (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker label="Basic date picker" />
                                    </DemoContainer>
                                </LocalizationProvider>
                            )}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <InputLabel style={{ marginRight: '20px', marginLeft: '2%' }}>
                                <b>Product 2 : </b>
                            </InputLabel>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={showTextFieldProduct2}
                                        onChange={() => {
                                            setShowTextFieldProduct2(true);
                                            setShowDatePickerProduct2(false);
                                        }}
                                    />
                                }
                                label="Add Text Manually"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={showDatePickerProduct2}
                                        onChange={() => {
                                            setShowTextFieldProduct2(false);
                                            setShowDatePickerProduct2(true);
                                        }}
                                    />
                                }
                                label="Select By Date"
                            />
                            {showTextFieldProduct2 && (
                                <TextField
                                    style={{ width: '40%' }}
                                    label="Describe about Product"
                                    variant="outlined"
                                    value={textFieldValueProduct2}
                                    onChange={handleTextFieldChangeProduct2}
                                />
                            )}
                            {showDatePickerProduct2 && (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker label="Basic date picker" />
                                    </DemoContainer>
                                </LocalizationProvider>
                            )}
                        </div>
                        <h3 style={{ marginLeft: '20px', width: '40%' }}>Charges : </h3>
                        <div style={{ margin: '20px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr >
                                        <th style={{ border: '3px solid #ddd', textAlign: 'left', backgroundColor: '#f2f2f2', paddingLeft: '2%' }}>S.NO</th>
                                        <th style={{ border: '3px solid #ddd', textAlign: 'left', backgroundColor: '#f2f2f2', paddingLeft: '2%' }}>Task</th>
                                        <th style={{ border: '3px solid #ddd', textAlign: 'left', backgroundColor: '#f2f2f2', paddingLeft: '2%' }}>Cost(pkr)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map(item => (
                                        <tr key={item.id}>
                                            <td style={{ border: '1px solid #ddd', textAlign: 'center', Width: '10px' }}>{item.id}</td>
                                            <td style={{ border: '1px solid #ddd', textAlign: 'left', width: '70%' }}>
                                                <TextField style={{ width: '90%' }} // No margin here
                                                    autoFocus
                                                    id="task"
                                                    label="Enter Task"
                                                    type="name"
                                                    variant="standard"
                                                    onChange={handleTaskChange}

                                                />
                                            </td>
                                            <td style={{ border: '1px solid #ddd', textAlign: 'left', width: '20%' }}>
                                                <TextField style={{ width: '80%', marginRight: '15%' }}
                                                    autoFocus
                                                    id="cost"
                                                    label='0'
                                                    type="number"
                                                    variant="standard"
                                                    onChange={handleCostChange}

                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <TextField style={{ width: '35%', marginRight: '15%' }}
                            autoFocus
                            id="discount"
                            label="Discount"
                            type="number"
                            variant="standard"
                            onChange={(e) => setDiscount(e.target.value)}
                        />
                        <Textarea
                            style={{
                                width: '60%',
                                border: '2px solid #ccc',
                                borderRadius: '5px', // Add rounded corners
                                padding: '10px', // More padding for better spacing
                                boxSizing: 'border-box',
                                fontSize: '14px', // Adjust font size
                                fontFamily: 'Arial, sans-serif', // Change font family if desired
                                resize: 'vertical', // Allow vertical resizing
                                outline: 'none', // Remove default outline
                                transition: 'border-color 0.2s',
                            }}
                            autoFocus
                            multiline
                            rows={3}
                            id="terms"
                            variant="standard"
                            label='Terms and Conditions'
                            onChange={(e) => setTermsAndConditions(e.target.value)}
                        />


                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={onSubmitClient}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}
