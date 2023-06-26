import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        selectedUser: {},
    },
    reducers: {
        setUsers(state, action) {
            state.users = action.payload;
        },
        setSelectedUser(state, action) {
            state.selectedUser = action.payload;
        },
        setUpdatedUser(state, action) {
            return {
                ...state,
                users: state.users.map((user) => (user.id === state.selectedUser.id ? state.selectedUser : user)),
            };
        },
        readUsers(state, action) {
            console.log("All Users are read and available in Redux State");
        },
        addProduct(state, action) {
            // logic to add a product to the store
        },
        removeProduct(state, action) {
            // logic to remove a product from the store
        },
        // other product-related actions
    },
});

export const { setSelectedUser, setUpdatedUser, setUsers } = usersSlice.actions;

export default usersSlice.reducer;
