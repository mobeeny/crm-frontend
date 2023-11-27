import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "orders",
    initialState: {
        order: [],
    },
    reducers: {
        setOrder(state, action) {
           state.order=action.payload;
        }
    },
});

export const { setOrder } = orderSlice.actions;

export default orderSlice.reducer;
