import { createSlice } from "@reduxjs/toolkit";

const selectedCompanySlice = createSlice({
    name: "selectedCompany",
    initialState: {
        selectedCompany:{} ,
        selectedCompanyId:""
    
    },
    reducers: {
        setSelectedCompany(state, action) {
            state.selectedCompany = action.payload;
        },
        setSelectedCompanyId(state, action) {
            state.selectedCompanyId = action.payload;
        }
    },
});

export const { setSelectedCompany,setSelectedCompanyId } = selectedCompanySlice.actions;

export default selectedCompanySlice.reducer;