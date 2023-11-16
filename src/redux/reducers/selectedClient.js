import { createSlice } from "@reduxjs/toolkit";

const selectedClientSlice = createSlice({
    name: "selectedClient",
    initialState: {
        client: [],
        companiesIds:[],
        companies:[]
    },
    reducers: {
        setClient(state, action) {
            state.client = action.payload;
        },
        setCompaniesIds(state, action) {
            state.companiesIds = action.payload;
        },
        setCompanies(state, action) {
            state.companies = action.payload;
        }
    },
});

export const { setClient, } = selectedClientSlice.actions;

export default selectedClientSlice .reducer;
