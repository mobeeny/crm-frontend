import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./reducers";
import cartReducer from "../reducers/cart";
import productsReducer from "../reducers/products";
import counterReducer from "../reducers/counter";
import clientReducer from "../reducers/clients";
import configReducer from "../reducers/config";
import proposalReducer from "../reducers/proposal";

const store = configureStore({
    // reducer: rootReducer,
    reducer: {
        cart: cartReducer,
        products: productsReducer,
        counter: counterReducer,
        clients: clientReducer,
        config: configReducer,
        proposal: proposalReducer,
    },
});

export default store;
