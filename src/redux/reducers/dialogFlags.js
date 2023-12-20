import { createSlice } from "@reduxjs/toolkit";

const dialogFlagSlice = createSlice({
    name: "dialogFlags",
    initialState: {
        clientDialogOpen: false,
        companyDialogOpen: false,
        orderDialogOpen: false,
        invoiceDialogOpen: false,
        paymentDialogOpen: false,
        speedDialDialogOpen: false,
    },
    reducers: {
        setClientDialog(state, action) {
            state.clientDialogOpen = action.payload;
        },
        setCompanyDialog(state, action) {
            state.companyDialogOpen = action.payload;
        },
        setOrderDialog(state, action) {
            state.orderDialogOpen = action.payload;
        },
        setInvoiceDialog(state, action) {
            state.invoiceDialogOpen = action.payload;
        },
        setPaymentDialog(state, action) {
            state.paymentDialogOpen = action.payload;
        },
        setSpeedDialDialog(state, action) {
            state.speedDialDialogOpen = action.payload;
        },
    },
});

export const {
    setClientDialog,
    setCompanyDialog,
    setOrderDialog,
    setInvoiceDialog,
    setPaymentDialog,
    setSpeedDialDialog,
} = dialogFlagSlice.actions;

export default dialogFlagSlice.reducer;
