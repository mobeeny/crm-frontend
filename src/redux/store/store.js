import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./reducers";
import cartReducer from "../reducers/cart";
import productsReducer from "../reducers/products";
import counterReducer from "../reducers/counter";
import clientsReducer from "../reducers/clients";
import configReducer from "../reducers/config";
import proposalReducer from "../reducers/proposal";
import dialogFlagsReducer from "../reducers/dialogFlags";
import projectReducer from "../reducers/project";
import companiesReducer from "../reducers/companies";
import companyCrudReducer from "../reducers/companyCrud";

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
        projects:projectReducer,
        companies:companiesReducer,
        companyCrud:companyCrudReducer,
    },
});

export default store;
