import { createSlice } from "@reduxjs/toolkit";

const proposalTemplateSlice = createSlice({
    name: "proposalTemplate",
    initialState: {
        proposalType: []

    },
    reducers: {
        setProposalType(state, action) {
            state.proposalType = action.payload;
        },

    },
});

export const { setProposalType } = proposalTemplateSlice.actions;
export default proposalTemplateSlice.reducer;
