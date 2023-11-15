import { createSlice } from "@reduxjs/toolkit";

const companyCrudSlice = createSlice({
    name: "companyCrud",
    initialState: {
        companyContacts: [],
    },
    reducers: {
        setCompanyContacts(state, action) {
           state.project=action.payload;
        }
    },
});

export const { setCompanyContacts } = companyCrudSlice.actions;

export default companyCrudSlice.reducer;
