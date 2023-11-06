import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name: "projects",
    initialState: {
        project: [],
    },
    reducers: {
        setProject(state, action) {
           state.project=action.payload;
        }
    },
});

export const { setProject } = projectSlice.actions;

export default projectSlice.reducer;
