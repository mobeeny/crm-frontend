import React, { useState, useContext } from "react";
import {
    Button,
    Card,
    Grid,
    IconButton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { addDoc, collection } from "firebase/firestore";
import { auth, db, instancesRef } from "../../../config/firebase";
import { NotificationContext } from "../../NotificationSnackbar";

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
        <Grid
            container
            p={2}
            spacing={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
                borderRadius: "10px",
                backgroundColor: "#fbfbfb",
            }}
        >
            {state.length > 0 &&
                state.map((subtask, i) => (
                    <Grid
                        item
                        container
                        key={i}
                        spacing={2}
                        display="flex"
                        alignItems="center"
                        xs={12}
                    >
                        <Grid item md={11}>
                            <TextField
                                multiline
                                label={`SubTask ${i + 1}`}
                                value={subtask}
                                fullWidth
                                variant="standard"
                                onChange={(e) =>
                                    handleSubtaskChange(i, e.target.value)
                                }
                            />
                        </Grid>
                        <Grid item md={1}>
                            <IconButton
                                size="small"
                                onClick={() => deleteSubtask(i)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                ))}
            <Grid item>
                <Button
                    size="small"
                    sx={{ width: "200px" }}
                    onClick={addSubtask}
                    endIcon={<AddCircleIcon />}
                >
                    Add a sub task
                </Button>
            </Grid>
        </Grid>
    );
};

const AddProduct = () => {
    const [scope, setScope] = useState([]);
    const [providedBy, setProvidedBy] = useState([]);
    const [fulfilledBy, setfulfilledBy] = useState([]);
    const [timeLine, setTimeLine] = useState([]);
    const [terms, setTerms] = useState([]);

    const showNotification = useContext(NotificationContext);
    const productCollectionRef = collection(
        db,
        instancesRef + auth.currentUser.uid + "/products&services"
    );

    const [product, setProduct] = useState({
        name: "",
        totalPrice: "",
        subtasks: [],
    });

    const updateSubtasks = (index, field, value) => {
        const updatedSubtasks = [...product.subtasks];
        updatedSubtasks[index][field] = value;
        return updatedSubtasks;
    };

    const handleChange = (field, value) => {
        setProduct((prevData) => ({ ...prevData, [field]: value }));
    };

    const handleChangeSubtask = (index, field, value) => {
        setProduct((prevData) => ({
            ...prevData,
            subtasks: updateSubtasks(index, field, value),
        }));
    };

    const addSubtask = () => {
        setProduct((prevData) => ({
            ...prevData,
            subtasks: [...prevData.subtasks, { name: "", price: "" }],
        }));
    };

    const deleteSubtask = (subtaskIndex) => {
        const updatedSubtasks = product.subtasks.filter(
            (_, index) => index !== subtaskIndex
        );
        setProduct((prevData) => ({ ...prevData, subtasks: updatedSubtasks }));
    };

    const handleSubmit = async () => {
        try {
            let data = {
                name: product.name,
                totalPrice: product.totalPrice,
                subtasks: product.subtasks,
                scope: scope,
                providedBy: providedBy,
                fulfilledBy: fulfilledBy,
                timeLine: timeLine,
                terms: terms,
            };
            await addDoc(productCollectionRef, data);
            showNotification("success", "Product added successfully");
        } catch (err) {
            console.error(err);
            showNotification("error", "Error while adding product");
        }
    };

    return (
        <Card sx={{ width: "92vw", minHeight: "70vh", p: 5 }}>
            <Typography variant="h5">Add Product/Service</Typography>

            <Grid container mt={1} spacing={6}>
                <Grid item md={6}>
                    <TextField
                        label="Name"
                        variant="standard"
                        onChange={(e) => handleChange("name", e.target.value)}
                    />
                </Grid>
                <Grid item md={6}>
                    <TextField
                        label="Total Price"
                        variant="standard"
                        onChange={(e) => handleChange("totalPrice", e.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom>Subtasks</Typography>
                    <Stack
                        p={4}
                        spacing={2}
                        alignItems="center"
                        sx={{
                            borderRadius: "10px",
                            backgroundColor: "#fbfbfb",
                        }}
                    >
                        {product.subtasks.map((subtask, i) => (
                            <Stack
                                key={i}
                                direction="row"
                                spacing={2}
                                alignItems="center"
                            >
                                <TextField
                                    label={`SubTask ${i + 1}`}
                                    value={subtask.name}
                                    variant="standard"
                                    sx={{ width: "35vw" }}
                                    onChange={(e) =>
                                        handleChangeSubtask(
                                            i,
                                            "name",
                                            e.target.value
                                        )
                                    }
                                />
                                <TextField
                                    label={`SubTask ${i + 1} Price`}
                                    value={subtask.price}
                                    variant="standard"
                                    onChange={(e) =>
                                        handleChangeSubtask(
                                            i,
                                            "price",
                                            e.target.value
                                        )
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
                </Grid>
                <Grid item md={6}>
                    <Typography mb={3}>Scope of work</Typography>
                    <MultiInput state={scope} setState={setScope} />
                </Grid>
                <Grid item md={6}>
                    <Typography mb={3}>Provided by</Typography>
                    <MultiInput state={providedBy} setState={setProvidedBy} />
                </Grid>
                <Grid item md={6}>
                    <Typography mb={3}>Fulfilled by</Typography>
                    <MultiInput state={fulfilledBy} setState={setfulfilledBy} />
                </Grid>
                <Grid item md={6}>
                    <Typography mb={3}>Requirments Timeline</Typography>
                    <MultiInput state={timeLine} setState={setTimeLine} />
                </Grid>
                <Grid item md={6}>
                    <Typography mb={3}>Terms & Condition</Typography>
                    <MultiInput state={terms} setState={setTerms} />
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
                        <Button
                            variant="contained"
                            sx={{ width: "200px" }}
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Card>
    );
};

export default AddProduct;
