import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
    name: "clients",
    initialState: {
        client: [],
        selectedClient: {},
        selectedUserCompaniesIds: [],
        selectedUserCompanies: [],
        selectedCompany: {},
        companyContacts: [],
    },
    reducers: {
        setClient(state, action) {
            state.client = action.payload;
        },
        setSelectedClient(state, action) {
            state.selectedClient = action.payload;
        },
        setSelectedUserCompaniesIds(state, action) {
            state.selectedUserCompaniesIds = action.payload;
        },
        setSelectedUserCompanies(state, action) {
            state.selectedUserCompanies = action.payload;
        },
        setSelectedCompany(state, action) {
            state.selectedCompany = action.payload;
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
            console.log("All Clients are read and available in Redux State");
        },
        addProduct(state, action) {
            // logic to add a product to the store
        },
        removeProduct(state, action) {
            // logic to remove a product from the store
        },
        setCompanyContacts(state, action) {
            const clientRelation = action.payload;
            state.companyContacts.push(clientRelation);
        },
        clearDirectorsNewCompany(state, action) {
            state.companyContacts = [];
        },
        // other product-related actions
    },
});

export const {
    setSelectedClient,
    setSelectedCompany,
    setSelectedUserCompaniesIds,
    setSelectedUserCompanies,
    setUpdatedClient,
    setClient,
    setCompanyContacts,
    clearDirectorsNewCompany,
} = clientSlice.actions;

export default clientSlice.reducer;
