import React, { useState, useContext, useEffect } from "react";
import {
    TextField,
    Button,
    Grid,
    Typography,
    Stack,
    IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { NotificationContext } from "../NotificationSnackbar";
import { auth, db, instancesRef } from "../../config/firebase";
import {
    addDoc,
    collection,
    doc,
    getDocs,
    updateDoc,
} from "firebase/firestore";

const MultiInput = ({ state, setState }) => {
    const addSubtask = () => {
        setState([...state, ""]);
    };

    const deleteSubtask = (subtaskIndex) => {
        const updatedSubtasks = state.filter(
            (_, index) => index !== subtaskIndex
        );
        setState(updatedSubtasks);
    };
    const handleSubtaskChange = (index, value) => {
        const updatedSubtasks = [...state];
        updatedSubtasks[index] = value;
        setState(updatedSubtasks);
    };

    return (
        <Stack
            p={4}
            spacing={2}
            alignItems="center"
            sx={{
                borderRadius: "10px",
                backgroundColor: "#fbfbfb",
                maxWidth: "40vw",
            }}
        >
            {state.length > 0 &&
                state.map((subtask, i) => (
                    <Stack
                        key={i}
                        direction="row"
                        spacing={2}
                        alignItems="center"
                    >
                        <TextField
                            multiline
                            label={`SubTask ${i + 1}`}
                            value={subtask}
                            variant="standard"
                            onChange={(e) =>
                                handleSubtaskChange(i, e.target.value)
                            }
                        />

                        <IconButton
                            size="small"
                            onClick={() => deleteSubtask(i)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Stack>
                ))}
            <Button
                size="small"
                sx={{ width: "200px" }}
                onClick={addSubtask}
                endIcon={<AddCircleIcon />}
            >
                Add a sub task
            </Button>
        </Stack>
    );
};

const ProposalSettings = () => {
    const [scope, setScope] = useState([]);
    const [providedBy, setProvidedBy] = useState([]);
    const [fulfilledBy, setfulfilledBy] = useState([]);
    const [timeLine, setTimeLine] = useState([]);
    const [terms, setTerms] = useState([]);
    const [template, setTemplate] = useState();

    const showNotification = useContext(NotificationContext);
    const TemplateCollectionRef = collection(
        db,
        instancesRef + auth.currentUser.uid + "/proposalTemplate"
    );

    const handleSubmit = async () => {
        try {
            let data = {
                scope: scope,
                providedBy: providedBy,
                fulfilledBy: fulfilledBy,
                timeLine: timeLine,
                terms: terms,
            };
            await addDoc(TemplateCollectionRef, data);
            showNotification("success", "propsal template added successfully");
        } catch (err) {
            console.error(err);
            showNotification("error", "Error while adding Template");
        }
    };

    const updateTemplate = async () => {
        let data = {
            scope: scope,
            providedBy: providedBy,
            fulfilledBy: fulfilledBy,
            timeLine: timeLine,
            terms: terms,
        };
        try {
            let TemplateDocRef = doc(TemplateCollectionRef, template.id);
            await updateDoc(TemplateDocRef, { ...data });

            showNotification("success", "Template updated successfully");
        } catch (err) {
            console.log(err);
            showNotification("error", "Error while updating Template");
        }
    };

    const getTemplate = async () => {
        try {
            const TemplateSnap = await getDocs(TemplateCollectionRef);
            let docs = TemplateSnap.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setTemplate(docs[0]);
            console.log("here is the Template", docs[0]);
        } catch (error) {
            showNotification("error", "Error fetching Template");
        }
    };

    useEffect(() => {
        getTemplate();
    }, []);

    useEffect(() => {
        if (template) {
            setScope(template.scope);
            setProvidedBy(template.providedBy);
            setfulfilledBy(template.fulfilledBy);
            setTimeLine(template.timeLine);
            setTerms(template.terms);
        }
    }, [template]);

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                    Proposal Preferences
                </Typography>
            </Grid>

            <Grid item md={6}>
                <Typography gutterBottom>scope of work</Typography>
                <MultiInput state={scope} setState={setScope} />
            </Grid>
            <Grid item md={6}>
                <Typography gutterBottom>Provided by</Typography>
                <MultiInput state={providedBy} setState={setProvidedBy} />
            </Grid>
            <Grid item md={6}>
                <Typography gutterBottom>Fulfilled by</Typography>
                <MultiInput state={fulfilledBy} setState={setfulfilledBy} />
            </Grid>
            <Grid item md={6}>
                <Typography gutterBottom>Requirments Timeline</Typography>
                <MultiInput state={timeLine} setState={setTimeLine} />
            </Grid>
            <Grid item md={6}>
                <Typography gutterBottom>Terms & Condition</Typography>
                <MultiInput state={terms} setState={setTerms} />
            </Grid>

            <Grid item xs={12} sx={{ textAlign: "center" }}>
                {template ? (
                    <Button
                        variant="contained"
                        sx={{ width: "200px" }}
                        onClick={updateTemplate}
                    >
                        update
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        sx={{ width: "200px" }}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                )}
            </Grid>
        </Grid>
    );
};

export default ProposalSettings;
