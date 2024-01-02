//This is a Sample Redux Component
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/reducers/counter";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Alert, Box, FormControl, InputLabel, Snackbar, TextField } from "@mui/material";
import { setSelectedCompany, setSelectedCompanyId } from "../redux/reducers/selectedCompany";
import { db, instancesRef, auth } from "../config/firebase";
import { collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { current } from "@reduxjs/toolkit";
import SaveIcon from "@mui/icons-material/Save";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Grid, Stack } from "@mui/material";
import { Paper } from "@mui/material";

function DetailOrder() {
    const selectedCompany = useSelector((state) => state.selectedCompany.selectedCompany);


    const selectedOrder = useSelector((state) => state.selectedOrder.selectedOrder)



    return (
        <div>
            <Card width="100%">
                <CardMedia sx={{ height: 40 }} image="/static/images/banner1.jpg" title="" />
                <FormControl variant="filled" sx={{ m: 1, minWidth: 320 }}>
                    <InputLabel id="demo-simple-select-standard-label">Orders</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        // value={age}
                        // onChange={handleDropDownChange} //={dispatch(setSelectedCompanyId(company.id))}
                        label="Age"
                    >
                        {/* {companyList.map((company) => (
                            <MenuItem value={company.id}>{company.sid + " - " + company.title}</MenuItem>
                        ))} */}
                    </Select>
                </FormControl>
                <CardContent>
                    <Box
                        component="form"
                        sx={{
                            "& .MuiTextField-root": { m: 1, width: "35ch" },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            autoFocus
                            id="id"
                            label="Order Id"

                            variant="standard"
                            value={selectedOrder.orderSid}
                            // onChange={handleInputChange}
                            InputLabelProps={{
                                // shrink: !!currentUser.name
                                shrink: true,
                            }}
                        />
                        <TextField
                            autoFocus
                            id="name"
                            label="Client Name"
                            type="name"
                            variant="standard"
                            value={selectedOrder.quotationClient.name}
                            // onChange={handleInputChange}
                            InputLabelProps={{
                                // shrink: !!currentUser.name
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="title "
                            label="Proposal Subtitle"
                            type="title"
                            variant="standard"
                            value={selectedOrder.subtitle}
                            // onChange={handleInputChange}
                            InputLabelProps={{
                                // shrink: !!currentUser.name
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="time"
                            label="Estimated Time "
                            type="time "
                            value={selectedOrder.timeline}
                            // onChange={handleInputChange}
                            variant="standard"
                            InputLabelProps={{
                                // shrink: !!currentUser.name
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="inc"
                            label="Inc #"
                            type="name"
                            // value={currentCompany.inc}
                            // onChange={handleInputChange}
                            variant="standard"
                            InputLabelProps={{
                                // shrink: !!currentUser.name
                                shrink: true,
                            }}
                        />
                        <Stack direction={"row"} sx={{ gap: 4,mt:5 }}>
                            {selectedOrder.selectedProducts.map((product, index) => (
                                <Grid key={index} item xs={12} sm={6} md={1} lg={3}>
                                    <Paper
                                        elevation={3}
                                        sx={{
                                            backgroundColor: "#E5E5E5",
                                            padding: "16px",
                                            borderRadius: "10px",
                                        }}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Typography
                                                    gutterBottom
                                                    variant="subtitle1"
                                                    component="div"
                                                    sx={{
                                                        color: "#E9ECEF",
                                                        backgroundColor: "#3498DB",
                                                        padding: "10px",
                                                        borderRadius: "5px",
                                                        textAlign: "center",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {product.name}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    label={"Scope Of Work "}
                                                    value={product.scope}
                                                    variant="standard"
                                                    multiline
                                                    maxRows={4}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label={"Fulfilled by Company"}
                                                    value={product.fulfilledBy}
                                                    variant="standard"
                                                    multiline
                                                    maxRows={4}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                                <TextField
                                                    label={"Provided by Customer"}
                                                    value={product.providedBy}
                                                    variant="standard"
                                                    multiline
                                                    maxRows={4}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label={"Terms & Conditions"}
                                                    value={product.terms}
                                                    variant="standard"
                                                    multiline
                                                    maxRows={4}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid >
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
                                                    {product.subtasks.totalPricingFlag === true ? (
                                                        <Typography
                                                            gutterBottom
                                                            variant="subtitle1"
                                                            component="div"
                                                            sx={{
                                                                color: "#E9ECEF",
                                                                backgroundColor: "#3498DB",
                                                                padding: "10px",
                                                                borderRadius: "5px",
                                                                textAlign: "center",
                                                                fontWeight: "bold",
                                                            }}
                                                        >
                                                            Total Price
                                                        </Typography>
                                                    ) : (
                                                        <Stack direction={"row"}>
                                                            <Typography
                                                                gutterBottom
                                                                variant="subtitle1"
                                                                component="div"
                                                                sx={{
                                                                    color: "#E9ECEF",
                                                                    backgroundColor: "#3498DB",
                                                                    padding: "10px",
                                                                    borderRadius: "5px",
                                                                    textAlign: "center",
                                                                    fontWeight: "bold",
                                                                }}
                                                            >
                                                                Pricing with subtask
                                                            </Typography></Stack>
                                                    )}
                                                </div>
                                                <Grid item xs={6}>
                                                    {product.subtasks.totalPricingFlag === true ? (
                                                        <TextField
                                                            value={selectedOrder.subtasks.reduce(
                                                                (acc, product) => acc + parseInt(product.price, 10),
                                                                0
                                                            )}
                                                        />
                                                    ) : (
                                                        product.subtasks.map((subTask, index) => (
                                                            <React.Fragment key={index}>
                                                                <TextField value={subTask.name} />
                                                                <TextField value={subTask.price} />
                                                            </React.Fragment>
                                                        ))
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            ))}
                        </Stack>


                    </Box>


                </CardContent>
                <CardActions>
                    <Box
                        sx={{
                            m: 2,
                        }}
                    >
                        <Button
                            variant="contained"
                            // onClick={() => updateCompanyProfile(selectedCompanyId)}
                            startIcon={<SaveIcon />}
                        >
                            Save
                        </Button>
                    </Box>
                </CardActions>
            </Card>
            {/* <Snackbar
                autoHideDuration={2000}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                open={toastOpen}
                // onClose={() => setToastOpen(false)}
                key={{ vertical: "bottom", horizontal: "left" }}
            >
                <Alert onClose={() => setToastOpen(false)} severity="success" sx={{ width: "100%" }}>
                    Changes Saved Successfully
                </Alert>
            </Snackbar> */}
        </div>
    );
}

export default DetailOrder;
