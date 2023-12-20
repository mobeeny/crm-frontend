import { createSlice } from "@reduxjs/toolkit";

const quotationCrudSlice = createSlice({
    name: "quotationCrud",
    initialState: {
        quotationClient: {},
        quotationSelectedProducts: [],
        quotationList: [],
    },
    reducers: {
        setOrderPrimaryClient(state, action) {
            state.quotationClient = action.payload;
        },
        setOrderSelectedProducts(state, action) {
            state.quotationSelectedProducts = action.payload;
        },
        setQuotationList(state, action) {
            state.quotationList = action.payload;
        },
    },
});

export const { setOrderPrimaryClient, setOrderSelectedProducts } = quotationCrudSlice.actions;

export default quotationCrudSlice.reducer;
