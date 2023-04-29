import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    addItem(state, action) {
      // logic to add an item to the cart
    },
    removeItem(state, action) {
      // logic to remove an item from the cart
    },
    // other cart-related actions
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
