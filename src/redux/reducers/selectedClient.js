import { createSlice } from "@reduxjs/toolkit";

const selectedClientSlice = createSlice({
    name: "selectedClient",
    initialState: {
        selectedClient: {},
        selectedClientId:""
    },
    reducers: {
        setSelectedClient(state, action) {
            state.selectedClient = action.payload;
        },
        setSelectedClientId(state, action) {
            state.selectedClientId = action.payload;
        }
    },
});

export const { setSelectedClient, setSelectedClientId} = selectedClientSlice.actions;

export default selectedClientSlice.reducer;
