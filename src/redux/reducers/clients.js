import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
    name: "clients",
    initialState: {
        clients: [],
    },
    reducers: {
        setClients(state, action) {
            state.clients = action.payload;
        },
    },
});

export const { setClients } = clientSlice.actions;

export default clientSlice.reducer;
