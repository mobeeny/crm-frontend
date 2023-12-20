import { createSlice } from "@reduxjs/toolkit";

const quotationListSlice = createSlice({
    name: "quotationList",
    initialState: {
        quotationList: [],
    },
    reducers: {
        setQuotationList(state, action) {
            state.quotationList = action.payload;
        },
    },
});

export const { setQuotationList } = quotationListSlice.actions;

export default quotationListSlice.reducer;
