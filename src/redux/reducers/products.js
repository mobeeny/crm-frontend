import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
  },
  reducers: {
    addProduct(state, action) {
      // logic to add a product to the store
    },
    removeProduct(state, action) {
      // logic to remove a product from the store
    },
    // other product-related actions
  },
});

export const { addProduct, removeProduct } = productsSlice.actions;

export default productsSlice.reducer;
