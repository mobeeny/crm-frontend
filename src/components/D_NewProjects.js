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
import { Divider, } from "@mui/material";
import { setCompanyDialog, setProjectDialog } from "../redux/reducers/dialogFlags";

export default function AddProjectDialog() {
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    // const username = useSelector((state) => state.config.username);
    const [projectTitle, setProjectTitle] = useState();
    const [productInvolved, setProductInvolved] = useState();
    const [client, setClient] = useState();
    const [company, setCompany] = useState();
    const [projectTimeline, setProjectTimeline] = useState();
    const [dueAmount, setDueAmount] = useState();
    const [paidAmount, setPaidAmount] = useState();



    const projectCollectionRef = collection(db, instancesRef + auth.currentUser.uid + "/project");

    const projectDialogOpen = useSelector((state) => state.dialogs.projectDialogOpen);
    const dispatch = useDispatch();


    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = () => {
        dispatch(setProjectDialog(false));
    };

    const onSubmitProject = async () => {
        try {
            await addDoc(projectCollectionRef, {
                title: projectTitle,
                productInvolved: productInvolved,
                client: client,
                company: company,
                projectTimeline: projectTimeline,
                dueAmount: dueAmount,
                paidAmount: paidAmount
            })
        } catch (error) {
            console.log("error in writing data")
        }
        handleClose();
    }

    return (
        <div>

            <Dialog open={projectDialogOpen} onClose={handleClose}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >
                <DialogTitle>Add New Project</DialogTitle>
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
                            id="project"
                            label="Project Title"
                            type="name"
                            variant="standard"
                            onChange={(e) => setProjectTitle(e.target.value)}
                        />

                        <TextField
                            id="product"
                            label="Product Involved"
                            type="name"
                            variant="standard"
                            onChange={(e) => setProductInvolved(e.target.value)}
                        />
                        <TextField
                            id="client"
                            label="Client"
                            type="name"
                            variant="standard"
                            onChange={(e) => setClient(e.target.value)}
                        />
                        <TextField
                            id="company"
                            label="Company"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setCompany(e.target.value)}
                        />
                        <TextField
                            id="projectTimeline"
                            label="Project Timeline"
                            type="phone"
                            variant="standard"
                            onChange={(e) => setProjectTimeline(e.target.value)}
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
                    <Button variant="contained" onClick={onSubmitProject}>
                        Add Project
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
