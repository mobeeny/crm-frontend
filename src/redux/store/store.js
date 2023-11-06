import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./reducers";
import cartReducer from "../reducers/cart";
import productsReducer from "../reducers/products";
import counterReducer from "../reducers/counter";
import clientReducer from "../reducers/clients";
import configReducer from "../reducers/config";
import proposalReducer from "../reducers/proposal";
import dialogFlagsReducer from "../reducers/dialogFlags";
import projectReducer from "../reducers/project";

const store = configureStore({
    // reducer: rootReducer,
    reducer: {
        cart: cartReducer,
        products: productsReducer,
        counter: counterReducer,
        clients: clientReducer,
        config: configReducer,
        proposal: proposalReducer,
        dialogs: dialogFlagsReducer,
        projects:projectReducer,
        
    },
});

export default store;
