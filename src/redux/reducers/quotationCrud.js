import { createSlice } from "@reduxjs/toolkit";

const quotationCrudSlice = createSlice({
    name: "quotationCrud",
    initialState: {
        quotationClient: {},
        quotationSelectedProducts: [],
        
    },
    reducers: {
        setQuotationPrimaryClient(state, action) {
            state.quotationClient = action.payload;
        },
        setQuotationSelectedProducts(state, action) {
            state.quotationSelectedProducts = action.payload;
        },
     
    },
});

export const { setQuotationPrimaryClient, setQuotationSelectedProducts } = quotationCrudSlice.actions;

export default quotationCrudSlice.reducer;
