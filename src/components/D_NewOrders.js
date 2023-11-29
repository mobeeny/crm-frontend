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
import { getDoc, collection, writeBatch, arrayUnion, addDoc, doc, updateDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import SearchClientsCompanyForm from "./SearchClientsCompanyForm";
import { Divider } from "@mui/material";
import { setCompanyDialog, setOrderDialog } from "../redux/reducers/dialogFlags";

export default function AddOrderDialog() {
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState("sm");
    // const username = useSelector((state) => state.config.username);
    const [orderTitle, setOrderTitle] = useState();
    const [productInvolved, setProductInvolved] = useState();
    const [client, setClient] = useState();
    const [company, setCompany] = useState();
    const [orderTimeline, setOrderTimeline] = useState();
    const [dueAmount, setDueAmount] = useState();
    const [paidAmount, setPaidAmount] = useState();

    const orderCollectionRef = collection(db, instancesRef + auth.currentUser.uid + "/order");

    const orderDialogOpen = useSelector((state) => state.dialogs.orderDialogOpen);
    const dispatch = useDispatch();

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = () => {
        dispatch(setOrderDialog(false));
    };

    const onSubmitOrder = async () => {
        try {
            await addDoc(orderCollectionRef, {
                title: orderTitle,
                productInvolved: productInvolved,
                client: client,
                company: company,
                orderTimeline: orderTimeline,
                dueAmount: dueAmount,
                paidAmount: paidAmount,
            });
        } catch (error) {
            console.log("error in writing data");
        }
        handleClose();
    };

    return (
        <div>
            <Dialog open={orderDialogOpen} onClose={handleClose} fullWidth={fullWidth} maxWidth={maxWidth}>
                <DialogTitle>Add New Order</DialogTitle>
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
                            id="order"
                            label="Order Title"
                            type="name"
                            variant="standard"
                            onChange={(e) => setOrderTitle(e.target.value)}
                        />

                        <TextField
                            id="product"
                            label="Product Involved"
                            type="name"
                            variant="standard"
                            onChange={(e) => setProductInvolved(e.target.value)}
                        />

                        <TextField
                            id="company"
                            label="Company"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setCompany(e.target.value)}
                        />
                        <TextField
                            id="orderTimeline"
                            label="Order Timeline"
                            type="phone"
                            variant="standard"
                            onChange={(e) => setOrderTimeline(e.target.value)}
                        />
                        <TextField
                            id="dueAmount"
                            label="Amount Due"
                            type="name"
                            variant="standard"
                            onChange={(e) => setDueAmount(e.target.value)}
                        />
                        <TextField
                            id="paidAmount"
                            label="Paid Amount"
                            type="name"
                            variant="standard"
                            onChange={(e) => setPaidAmount(e.target.value)}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={onSubmitOrder}>
                        Add Order
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
