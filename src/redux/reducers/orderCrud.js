import { createSlice } from "@reduxjs/toolkit";

const orderCrudSlice = createSlice({
    name: "orderCrud",
    initialState: {
        orderPrimaryClient: [],
    },
    reducers: {
        setOrderPrimaryClient(state, action) {
            state.orderPrimaryClient = action.payload;
        }
    },
});

export const { setOrderPrimaryClient } = orderCrudSlice.actions;

export default orderCrudSlice.reducer;
