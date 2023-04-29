import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./reducers";
import cartReducer from "../reducers/cart";
import productsReducer from "../reducers/products";
import counterReducer from "../reducers/counter";

const store = configureStore({
  // reducer: rootReducer,
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    counter: counterReducer,
  },
});

export default store;
