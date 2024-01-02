import { createSlice } from "@reduxjs/toolkit";

const selectedQuoteSlice = createSlice({
    name: "selectedQuote",
    initialState: {
        selectedQuote:{} ,
        selectedQuoteId:""
    
    },
    reducers: {
        setSelectedQuote(state, action) {
            state.selectedQuote = action.payload;
        },
        setSelectedQuoteId(state, action) {
            state.selectedQuoteId = action.payload;
        }
    },
});

export const { setSelectedQuote,setSelectedQuoteId } = selectedQuoteSlice.actions;

export default selectedQuoteSlice.reducer;