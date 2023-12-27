import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { Box, Card, Grid, InputLabel, Paper } from "@mui/material";
import { auth, db, instancesRef } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Checkbox, MenuItem, FormControlLabel } from "@mui/material";
import { getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setproductDetails } from "../redux/reducers/proposal";
import { Stack, Typography } from "@mui/material";
import { Fragment } from "react";
import { setOrderDialog } from "../redux/reducers/dialogFlags";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import ButtonBase from "@mui/material/ButtonBase";
import { setOrderPrimaryClient, setOrderSelectedProducts } from "../redux/reducers/orderCrud";
import SelectClientComponent from "./SelectClientComponent";
import SelectProductsComponent from "./SelectProductsComponent";

export default function AddOrderDialog() {
    const [maxWidth, setMaxWidth] = React.useState("sm");
    const [fullWidth, setFullWidth] = React.useState(true);
    const productCollectionRef = collection(db, instancesRef + auth.currentUser.uid + "/products&services");
    const quotationCollectionRef = collection(db, instancesRef + auth.currentUser.uid + "/quotation");

    const orderDialogOpen = useSelector((state) => state.dialogs.orderDialogOpen);
    const orderClient = useSelector((state) => state.orderCrud.orderClient);
    const selectedProducts = useSelector((state) => state.orderCrud.orderSelectedProducts) || [];
    const orderState = useSelector((state) => state.orderCrud.orderState);
    const [subtitle, setSubtitle] = useState("");
    const [timeline, setTimeline] = useState("");
    const [payments, setPayments] = useState("");

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setOrderDialog(false));
    };

    const onSubmitClient = async () => {
        // console.log("product Details ", productDetails);

        try {
            const docRef = doc(db, instancesRef + auth.currentUser.uid + "/systemData/" + "sequenceIds");
            console.log("DocRef: ", docRef);

            try {
                const sIds = await getDoc(docRef);
                if (sIds.exists()) {
                    console.log("Current quotationtSid:", sIds.data());
                    // Get the current clientSid value
                    const currentSid = sIds.data().quotationSid;
                    // Increment the clientSid value by 1
                    const updatedSid = currentSid + 1;

                    // Update the document with the new Sid value
                    await updateDoc(docRef, { quotationSid: updatedSid });

                    // Include the updated clientSid in the data object
                    await addDoc(quotationCollectionRef, {
                        quotationClient: orderClient,
                        selectedProducts: selectedProducts,
                        subtitle: subtitle,
                        timeline: timeline,
                        payments: payments,
                        quotationSid: updatedSid,
                        orderStatus: orderState,
                    });
                } else {
                    console.log("Order sId Document does not exist.");
                }
            } catch (error) {
                console.error("Error fetching document:", error);
            }
            handleClose();
        } catch (err) {
            console.error(err);
        }
    };

    const handleToggle = (product) => {
        const updatedProducts = selectedProducts.map((p) => {
            if (p.id === product.id) {
                return { ...p, totalPricingFlag: !product.totalPricingFlag };
            }
            return p;
        });
        dispatch(setOrderSelectedProducts(updatedProducts));
    };

    const handleUpdate = (product, updatedFields, arrayKey, index) => {
        let updatedSubtask;
        const updatedProducts = selectedProducts.map((p) => {
            if (p.id === product.id) {
                if (arrayKey) {
                    updatedSubtask = p[arrayKey].map((sub, i) => {
                        if (i === index) {
                            return { ...sub, ...updatedFields };
                        }
                        return sub;
                    });
                    return { ...p, [arrayKey]: updatedSubtask };
                } else {
                    return { ...p, ...updatedFields };
                }
            }
            return p;
        });
        dispatch(setOrderSelectedProducts(updatedProducts));
    };
    useEffect(() => {
        console.log("OrderStatus: ", orderState);
    }, []);
    return (
        <div>
            <Dialog open={orderDialogOpen} onClose={handleClose} fullWidth={fullWidth} maxWidth={maxWidth}>
                <DialogTitle>Add New {orderState === "quote" ? "Quote" : "Order"}</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{
                            "& .MuiTextField-root": { m: 1, width: "28ch" },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <SelectClientComponent dispatchAction={setOrderPrimaryClient} />
                        <SelectProductsComponent />

                        <TextField
                            autoFocus
                            id="Subtitle"
                            label="Proposal Subtitle"
                            variant="standard"
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                        />

                        <Stack direction={"row"}>
                            <TextField
                                id="timeline"
                                label="Estimated Timeline"
                                type="name"
                                variant="standard"
                                onChange={(e) => setTimeline(e.target.value)}
                            />
                        </Stack>

                        {selectedProducts.map((product) => (
                            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                                <Paper
                                    elevation={3}
                                    sx={{
                                        backgroundColor: "#D9DDDC",
                                        padding: "16px",
                                        borderRadius: "10px",
                                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                                    }}
                                >
                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item xs>
                                                <Typography
                                                    gutterBottom
                                                    variant="subtitle1"
                                                    component="div"
                                                    style={{
                                                        color: "#E9ECEF",
                                                        backgroundColor: "#3498DB",
                                                        padding: "10px",
                                                        borderRadius: "5px",
                                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                                        textAlign: "center",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {product.name}
                                                </Typography>
                                                <Stack direction={"row"}>
                                                    <TextField
                                                        fullWidth
                                                        label={"Scope Of Work "}
                                                        value={product.scope}
                                                        onChange={(e) =>
                                                            handleUpdate(product, { scope: e.target.value })
                                                        }
                                                        variant="standard"
                                                        multiline
                                                        maxRows={4}
                                                    />
                                                </Stack>
                                                <Stack direction={"row"}>
                                                    <TextField
                                                        label={"Fulfilled by Company"}
                                                        value={product.fulfilledBy}
                                                        onChange={(e) =>
                                                            handleUpdate(product, { fulfilledBy: e.target.value })
                                                        }
                                                        variant="standard"
                                                        multiline
                                                        maxRows={4}
                                                    />
                                                    <TextField
                                                        label={"Provided by Customer"}
                                                        value={product.providedBy}
                                                        onChange={(e) =>
                                                            handleUpdate(product, { providedBy: e.target.value })
                                                        }
                                                        variant="standard"
                                                        multiline
                                                        maxRows={4}
                                                    />
                                                </Stack>
                                                <Stack direction={"row"}>
                                                    <TextField
                                                        label={"Terms & Conditions"}
                                                        value={product.terms}
                                                        onChange={(e) =>
                                                            handleUpdate(product, { terms: e.target.value })
                                                        }
                                                        variant="standard"
                                                        multiline
                                                        maxRows={4}
                                                    />
                                                </Stack>
                                                <div
                                                    style={{
                                                        margin: "auto",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        width: "50%",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    <button
                                                        type="button"
                                                        onClick={() => handleToggle(product)}
                                                        style={{
                                                            padding: "12px 16px",
                                                            backgroundColor:
                                                                product.totalPricingFlag === true ? "#3498DB" : "#ddd",
                                                            color: product.totalPricingFlag === true ? "#fff" : "#000",
                                                            border: "none",
                                                            borderRadius: "5px 0 0 5px",
                                                            cursor: "pointer",
                                                            transition: "background-color 0.3s, color 0.3s",
                                                            fontSize: "16px",
                                                        }}
                                                    >
                                                        Total Price
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleToggle(product)}
                                                        style={{
                                                            padding: "12px 16px",
                                                            backgroundColor:
                                                                product.totalPricingFlag === false ? "#3498DB" : "#ddd",
                                                            color: product.totalPricingFlag === false ? "#fff" : "#000",
                                                            border: "none",
                                                            borderRadius: "0 5px 5px 0",
                                                            cursor: "pointer",
                                                            transition: "background-color 0.3s, color 0.3s",
                                                            fontSize: "16px",
                                                        }}
                                                    >
                                                        Price by Tasks
                                                    </button>
                                                </div>
                                                {product.totalPricingFlag === true ? (
                                                    <TextField
                                                        value={product.subtasks.reduce(
                                                            (acc, product) => acc + parseInt(product.price, 10),
                                                            0
                                                        )}
                                                        onChange={(e) =>
                                                            handleUpdate(product, { totalPrice: e.target.value })
                                                        }
                                                    />
                                                ) : (
                                                    product.subtasks.map((subTask, index) => (
                                                        <>
                                                            <TextField
                                                                value={subTask.name}
                                                                onChange={(e) =>
                                                                    handleUpdate(
                                                                        product,
                                                                        { name: e.target.value },
                                                                        "subtasks",
                                                                        index
                                                                    )
                                                                }
                                                            />
                                                            <TextField
                                                                value={subTask.price}
                                                                onChange={(e) =>
                                                                    handleUpdate(
                                                                        product,
                                                                        { price: e.target.value },
                                                                        "subtasks",
                                                                        index
                                                                    )
                                                                }
                                                            />
                                                        </>
                                                    ))
                                                )}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        ))}
                    </Box>

                    <DialogActions>
                        <Button variant="outlined" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={onSubmitClient}>
                            Create
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
}
