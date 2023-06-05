import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        value: {
            name: '',
            age: ''
        }
    },
    reducers: {

        login: (state, action) => {
            state.value = action.payload
        },
        logout: (state) => {
            state.value = { name: '', age: '' }
        }
    }

})
export const { login, logout } = UserSlice.actions
export default UserSlice.reducer