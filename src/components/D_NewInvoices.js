import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { Box, Chip } from "@mui/material";
import { auth, db, instancesRef } from "../config/firebase";
import { getDoc, collection, writeBatch, arrayUnion, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import SearchClientsCompanyForm from "./SearchClientsCompanyForm";
import { Divider, } from "@mui/material";
import { setInvoiceDialog } from "../redux/reducers/dialogFlags";

export default function AddInvoiceDialog() {
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    // const username = useSelector((state) => state.config.username);

    const [client, setClient] = useState();
    const [order, setOrder] = useState();
    const [invoiceDate, setInvoiceDate] = useState();
    const [dueDate, setDueDate] = useState();
    const [total, setTotal] = useState();
    const [paymentMethod, setPaymentMethod] = useState()
    const [status, setStatus] = useState()
    const [description, setDescription] = useState()





    const invoiceCollectionRef = collection(db, instancesRef + auth.currentUser.uid + "/Invoice");
    const dispatch = useDispatch();

    const invoiceDialogOpen = useSelector((state) => state.dialogs.invoiceDialogOpen)

    const onSubmitInvoice = async () => {
        try {
            await addDoc(invoiceCollectionRef, {

                client: client,
                order: order,
                invoiceDate: invoiceDate,
                dueDate: dueDate,
                total: total,
                paymentMethod: paymentMethod,
                status: status,
                description: description

            })
        } catch(error){
            console.log("error in writing data")
        }
        handleClose();
    }



    const handleClose = () => {
        dispatch(setInvoiceDialog(false));
    };




    return (
        <div>

            <Dialog open={invoiceDialogOpen} onClose={handleClose}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >
                <DialogTitle>Add New Invoice</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        
                    </DialogContentText> */}
                    <Box
                        component="form"
                        sx={{
                            "& .MuiTextField-root": { m: 1, width: "28ch" },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            autoFocus
                            id="client"
                            label="Client"
                            type="name"
                            variant="standard"
                            onChange={(e) => setClient(e.target.value)}
                        />


                        <TextField
                            id="order"
                            label="Order"
                            type="email"
                            variant="standard"
                            onChange={(e) => setOrder(e.target.value)}
                        />
                        <TextField
                            id="date"
                            label="Invoice Date #"
                            type="name"
                            variant="standard"
                            onChange={(e) => setInvoiceDate(e.target.value)}
                        />
                        <TextField
                            id="dueDate"
                            label="Due Date #"
                            type="name"
                            variant="standard"
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                        <TextField
                            id="total"
                            label="Total #"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setTotal(e.target.value)}
                        />
                        <TextField
                            id="PaymentMethod"
                            label="Payment Method #"
                            type="phone"
                            variant="standard"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <TextField
                            id="status"
                            label="Status"
                            type="name"
                            variant="standard"
                            onChange={(e) => setStatus(e.target.value)}
                        />
                        <TextField
                            id="description"
                            label="Description. #"
                            type="name"
                            variant="standard"
                            onChange={(e) => setDescription(e.target.value)}
                        />

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={onSubmitInvoice}>
                        Add Invoice
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
