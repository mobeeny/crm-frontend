import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./reducers";
import cartReducer from "../reducers/cart";
import productsReducer from "../reducers/products";
import counterReducer from "../reducers/counter";
import clientsReducer from "../reducers/clients";
import configReducer from "../reducers/config";
import proposalReducer from "../reducers/proposal";
import dialogFlagsReducer from "../reducers/dialogFlags";
import orderReducer from "../reducers/order";
import companiesReducer from "../reducers/companies";
import companyCrudReducer from "../reducers/companyCrud";
import selectedCompanyReducer from "../reducers/selectedCompany";
import uiControlsReducer from "../reducers/uiControls";
import selectedClientReducer from "../reducers/selectedClient"

const store = configureStore({
    // reducer: rootReducer,
    reducer: {
        cart: cartReducer,
        products: productsReducer,
        counter: counterReducer,
        clients: clientsReducer,
        config: configReducer,
        proposal: proposalReducer,
        dialogs: dialogFlagsReducer,
        orders:orderReducer,
        companies:companiesReducer,
        companyCrud:companyCrudReducer,
        selectedCompany:selectedCompanyReducer,
        uiControls: uiControlsReducer,
        selectedClient:selectedClientReducer
    },
});

export default store;
