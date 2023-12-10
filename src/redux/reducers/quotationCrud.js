import { createSlice } from "@reduxjs/toolkit";

const quotationCrudSlice = createSlice({
    name: "quotationCrud",
    initialState: {
        quotationClient: {},
        quotationSelectedProducts: [],
        quotationList: [],
    },
    reducers: {
        setQuotationPrimaryClient(state, action) {
            state.quotationClient = action.payload;
        },
        setQuotationSelectedProducts(state, action) {
            state.quotationSelectedProducts = action.payload;
        },
        setQuotationList(state, action) {
            state.quotationList = action.payload;
        },
    },
});

export const { setQuotationPrimaryClient, setQuotationSelectedProducts ,setQuotationList} = quotationCrudSlice.actions;

export default quotationCrudSlice.reducer;
