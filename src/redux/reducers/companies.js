import { createSlice } from "@reduxjs/toolkit";

const companiesSlice = createSlice({
    name: "companies",
    initialState: {
        companies: [],
    },
    reducers: {
        setCompanies(state, action) {
           state.companies=action.payload;
        }
    },
});

export const { setCompanies } = companiesSlice.actions;

export default companiesSlice.reducer;
