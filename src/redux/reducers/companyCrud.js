import { createSlice } from "@reduxjs/toolkit";

const companyCrudSlice = createSlice({
    name: "companyCrud",
    initialState: {
        companyPrimaryClient: {},
    },
    reducers: {
        setCompanyPrimaryClient(state, action) {
            state.companyPrimaryClient = action.payload;
        },
    },
});

export const { setCompanyPrimaryClient } = companyCrudSlice.actions;

export default companyCrudSlice.reducer;
