import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
    name: "clients",
    initialState: {
        client: [],
        selectedClient: {},
    },
    reducers: {
        setClient(state, action) {
            state.client = action.payload;
        },
        setSelectedClient(state, action) {
            state.selectedClient = action.payload;
        },
        setUpdatedClient(state, action) {
            return {
                ...state,
                client: state.client.map((client) =>
                    client.id === state.selectedClient.id ? state.selectedClient : client
                ),
            };
        },
        readClient(state, action) {
            console.log("All Client are read and available in Redux State");
        },
        addProduct(state, action) {
            // logic to add a product to the store
        },
        removeProduct(state, action) {
            // logic to remove a product from the store
        },
        // other product-related actions
    },
});

export const { setSelectedClient, setUpdatedClient, setClient } = clientSlice.actions;

export default clientSlice.reducer;
