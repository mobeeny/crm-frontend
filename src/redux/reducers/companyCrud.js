import { createSlice } from "@reduxjs/toolkit";

const companyCrudSlice = createSlice({
    name: "companyCrud",
    initialState: {
        companyPrimaryClient:{},
        companyContacts: [],
        createContactId: 0,
       
    },
    reducers: {
        setCompanyContacts(state, action) {
            state.companyContacts = action.payload;
        },
        setCreateContactId(state, action) {
            state.createContactId = action.payload;
        },
        setcompanyPrimaryClient(state, action) {
            state.companyPrimaryClient = action.payload;
        },
       
    },
});

export const { setCompanyContacts, setCreateContactId, setcompanyPrimaryClient } = companyCrudSlice.actions;

export default companyCrudSlice.reducer;
