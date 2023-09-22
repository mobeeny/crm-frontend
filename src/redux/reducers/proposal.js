import { createSlice } from "@reduxjs/toolkit";

const proposalSlice = createSlice({
    name: "proposal",
    initialState: {
        productDetails: []

    },
    reducers: {
        setproductDetails(state, action) {
            state.productDetails = action.payload;
        },

    },
});

export const { setproductDetails } =  proposalSlice.actions;
export default proposalSlice.reducer;
