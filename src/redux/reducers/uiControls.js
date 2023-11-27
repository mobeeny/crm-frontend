import { createSlice } from "@reduxjs/toolkit";

const uiControlsSlice = createSlice({
    name: "uiControls",
    initialState: {
        detailsSelectedTab: false,
        
    },
    reducers: {
        setdetailsSelectedTab(state, action) {
            state.detailsSelectedTab = action.payload;
        },
        
    },
});

export const { setdetailsSelectedTab } = uiControlsSlice.actions;

export default uiControlsSlice.reducer;
