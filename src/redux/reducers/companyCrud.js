import { createSlice } from "@reduxjs/toolkit";

const companyCrudSlice = createSlice({
    name: "companyCrud",
    initialState: {
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
       
    },
});

export const { setCompanyContacts, setCreateContactId,  } = companyCrudSlice.actions;

export default companyCrudSlice.reducer;
