import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
    name: "config",
    initialState: {
        email: "",
        username: "",
    },
    reducers: {
        setEmail(state, action) {
            state.email = action.payload;
        },
        setUserName(state, action) {
            state.username = action.payload;
        },
    },
});

export const { setEmail, setUserName } = configSlice.actions;

export default configSlice.reducer;
