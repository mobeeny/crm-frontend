import { createSlice } from "@reduxjs/toolkit";

const orderCrudSlice = createSlice({
    name: "orderCrud",
    initialState: {
        orderClient: {},
        orderSelectedProducts: [],
        orderState: "quote",
    },
    reducers: {
        setOrderPrimaryClient(state, action) {
            state.orderClient = action.payload;
        },
        setOrderSelectedProducts(state, action) {
            state.orderSelectedProducts = action.payload;
        },
        setOrderState(state, action) {
            state.orderState = action.payload;
        },
    },
});

export const { setOrderPrimaryClient, setOrderSelectedProducts, setOrderState } = orderCrudSlice.actions;

export default orderCrudSlice.reducer;
