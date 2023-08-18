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

const ProductDetail = ({ selectedProduct }) => {
    const showNotification = useContext(NotificationContext);
    let productCollectionRef = collection(
        db,
        instancesRef + auth.currentUser.uid + "/products&services"
    );
    const [product, setProduct] = useState(selectedProduct);

    useEffect(() => {
        console.log("gee", selectedProduct);
        setProduct(selectedProduct);
    }, [selectedProduct]);

    const updateSubtasks = (index, field, value) => {
        const updatedSubtasks = [...product.subtasks];
        updatedSubtasks[index][field] = value;
        return updatedSubtasks;
    };

    const handleChange = (field, value) => {
        setProduct((prevData) => ({
            ...prevData,
            [field]: value,
        }));
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
        console.log("i have", product);
        try {
            let productDocRef = doc(productCollectionRef, product.id);
            console.log("i reavheddddd", productDocRef);
            await updateDoc(productDocRef, { ...product });

            showNotification("success", "Product updated successfully");
        } catch (err) {
            console.log(err);
            showNotification("error", "Error while updating product");
        }
    };

    return (
        <Card sx={{ width: "80vw", minHeight: "70vh", p: 5 }}>
            <Typography variant="h6">Product Detail</Typography>

            <Grid container my={2} spacing={4}>
                <Grid item sm={4}>
                    <Stack spacing={2}>
                        <TextField
                            label="Name"
                            variant="standard"
                            value={product.name}
                            onChange={(e) =>
                                handleChange("name", e.target.value)
                            }
                        />
                        <TextField
                            label="Total Price"
                            variant="standard"
                            disabled
                        />
                        <Button
                            variant="contained"
                            sx={{ width: "100px" }}
                            onClick={handleSubmit}
                        >
                            Update
                        </Button>
                    </Stack>
                </Grid>
                <Grid item sm={8}>
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
                                    sx={{ width: "100%" }}
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
            </Grid>
        </Card>
    );
};

export default ProductDetail;
