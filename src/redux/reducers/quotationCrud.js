import { createSlice } from "@reduxjs/toolkit";

const quotationCrudSlice = createSlice({
    name: "quotationCrud",
    initialState: {
        quotationPrimaryClient: {},
    },
    reducers: {
        setQuotationPrimaryClient(state, action) {
            state.quotationPrimaryClient = action.payload;
        },
    },
});

export const { setQuotationPrimaryClient } = quotationCrudSlice.actions;

export default quotationCrudSlice.reducer;
