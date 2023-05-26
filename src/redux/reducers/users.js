import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
    },
    reducers: {
        // increment: (state) => {
        //   state.value += 1;
        // },
        // decrement: (state) => {
        //   state.value -= 1;
        // },
        readUsers(state, action) {
            console.log("All Users are read and available in Redux State");
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

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
