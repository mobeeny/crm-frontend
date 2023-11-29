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
import { Divider } from "@mui/material";
import { setPaymentDialog } from "../redux/reducers/dialogFlags";

export default function AddPaymentDialog() {
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState("sm");
    const [invoice, setInvoice] = useState();
    const [date, setDate] = useState();
    const [PaymentMethod, setPaymentMethod] = useState();
    const [transaction, setTransaction] = useState();
    const [amount, setAmount] = useState();

    // const username = useSelector((state) => state.config.username);
    const dispatch = useDispatch();
    const paymentCollectionRef = collection(db, instancesRef + auth.currentUser.uid + "/Payment");
    const paymentDialogOpen = useSelector((state) => state.dialogs.paymentDialogOpen);

    const handleClose = () => {
        dispatch(setPaymentDialog(false));
    };

    const onSubmitPayment = async () => {
        try {
            await addDoc(paymentCollectionRef, {
                invoice: invoice,
                date: date,
                PaymentMethod: PaymentMethod,
                transaction: transaction,
                amount: amount,
            });
        } catch (error) {
            console.log("error in writing payment Data");
        }
        handleClose();
    };

    return (
        <div>
            <Dialog open={paymentDialogOpen} onClose={handleClose} fullWidth={fullWidth} maxWidth={maxWidth}>
                <DialogTitle>Add New Payment</DialogTitle>
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
                            id="invoice"
                            label="Invoice #"
                            type="name"
                            variant="standard"
                            onChange={(e) => setInvoice(e.target.value)}
                        />

                        <TextField
                            id="date"
                            label="Date"
                            type="name"
                            variant="standard"
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <TextField
                            id="paymentMethod"
                            label="Payment Method#"
                            type="name"
                            variant="standard"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <TextField
                            id="transactionId"
                            label="Transacation Id #"
                            type="name"
                            variant="standard"
                            onChange={(e) => setTransaction(e.target.value)}
                        />
                        <TextField
                            id="amount"
                            label="Amount #"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={onSubmitPayment}>
                        Add Payment
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
