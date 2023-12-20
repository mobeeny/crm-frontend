import { createSlice } from "@reduxjs/toolkit";

const quotationCrudSlice = createSlice({
    name: "quotationCrud",
    initialState: {
        quotationClient: {},
        quotationSelectedProducts: [],
    },
    reducers: {
        setOrderPrimaryClient(state, action) {
            state.quotationClient = action.payload;
        },
        setOrderSelectedProducts(state, action) {
            state.quotationSelectedProducts = action.payload;
        },
    },
});

export const { setOrderPrimaryClient, setOrderSelectedProducts } = quotationCrudSlice.actions;

export default quotationCrudSlice.reducer;
