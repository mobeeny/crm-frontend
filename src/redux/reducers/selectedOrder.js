import { createSlice } from "@reduxjs/toolkit";

const selectedOrderSlice = createSlice({
    name: "selectedOrder",
    initialState: {
        selectedOrder:{} ,
        selectedOrderId:""
    
    },
    reducers: {
        setSelectedOrder(state, action) {
            state.selectedOrder = action.payload;
        },
        setSelectedOrderId(state, action) {
            state.selectedOrderId = action.payload;
        }
    },
});

export const { setSelectedOrder,setSelectedOrderId } = selectedOrderSlice.actions;

export default selectedOrderSlice.reducer;