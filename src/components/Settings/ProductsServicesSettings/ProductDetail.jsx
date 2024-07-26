import React, { useState, useContext, useEffect } from "react";
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
import { collection, doc, updateDoc } from "firebase/firestore";
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
            {state?.length > 0 &&
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

const ProductDetail = ({ selectedProduct }) => {
    // Separate state variables for individual fields
    const [name, setName] = useState(selectedProduct.name);
    const [totalPrice, setTotalPrice] = useState(selectedProduct.totalPrice);
    const [scope, setScope] = useState(selectedProduct.scope);
    const [providedBy, setProvidedBy] = useState(selectedProduct.providedBy);
    const [fulfilledBy, setFulfilledBy] = useState(selectedProduct.fulfilledBy);
    const [timeLine, setTimeLine] = useState(selectedProduct.timeLine);
    const [terms, setTerms] = useState(selectedProduct.terms);
    const [subtasks, setSubtasks] = useState(selectedProduct.subtasks);

    const showNotification = useContext(NotificationContext);
    let productCollectionRef = collection(
        db,
        instancesRef + auth.currentUser.uid + "/products&services"
    );

    useEffect(() => {
        if (selectedProduct) {
            setName(selectedProduct.name);
            setTotalPrice(selectedProduct.totalPrice);
            setScope(selectedProduct.scope);
            setProvidedBy(selectedProduct.providedBy);
            setFulfilledBy(selectedProduct.fulfilledBy);
            setTimeLine(selectedProduct.timeLine);
            setTerms(selectedProduct.terms);
            setSubtasks(selectedProduct.subtasks);
        }
    }, [selectedProduct]);

    const updateSubtasks = (index, field, value) => {
        const updatedSubtasks = [...subtasks];
        updatedSubtasks[index][field] = value;
        setSubtasks(updatedSubtasks);
    };

    const handleChange = (field, value) => {
        switch (field) {
            case "name":
                setName(value);
                break;
            case "totalPrice":
                setTotalPrice(value);
                break;

            default:
                break;
        }
    };

    const handleChangeSubtask = (index, field, value) => {
        updateSubtasks(index, field, value);
    };

    const addSubtask = () => {
        setSubtasks([...subtasks, { name: "", price: "" }]);
    };

    const deleteSubtask = (subtaskIndex) => {
        const updatedSubtasks = subtasks.filter(
            (_, index) => index !== subtaskIndex
        );
        setSubtasks(updatedSubtasks);
    };

    const handleSubmit = async () => {
        try {
            // Create a new product object with updated fields
            const updatedProduct = {
                id: selectedProduct.id, // You may need to include the ID
                name,
                totalPrice,
                scope,
                providedBy,
                fulfilledBy,
                timeLine,
                terms,
                subtasks,
            };

            // Update the product in your database
            let productDocRef = doc(
                productCollectionRef,
                selectedProduct.id // Make sure to include the correct ID
            );
            await updateDoc(productDocRef, updatedProduct);

            showNotification("success", "Product updated successfully");
        } catch (err) {
            console.log(err);
            showNotification("error", "Error while updating product");
        }
    };

    return (
        <Card sx={{ width: "auto", minHeight: "70vh", p: 5 }}>
            <Typography variant="h5">Add Product/Service</Typography>

            <Grid container mt={1} spacing={6}>
                <Grid item md={6}>
                    <TextField
                        label="Name"
                        variant="standard"
                        value={name}
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
                    <Typography gutterBottom>Services</Typography>
                    <Stack
                        p={4}
                        spacing={2}
                        alignItems="center"
                        sx={{
                            borderRadius: "10px",
                            backgroundColor: "#fbfbfb",
                        }}
                    >
                        {subtasks.map((subtask, i) => (
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
                                    sx={{ width: "60%" }}
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
                                    sx={{ width: "30%" }}
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
                    <MultiInput state={fulfilledBy} setState={setFulfilledBy} />
                </Grid>
                <Grid item md={6}>
                    <Typography mb={3}>Requirements Timeline</Typography>
                    <MultiInput state={timeLine} setState={setTimeLine} />
                </Grid>
                <Grid item md={6}>
                    <Typography mb={3}>Terms & Conditions</Typography>
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

export default ProductDetail;
