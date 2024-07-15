import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAuthenticate: false,
    users: null,
    error: null
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticate = true
            state.users = action.payload
            state.error = null
        },
        logOut: (state, action) => {
            state.isAuthenticate = false
            state.users = null
            state.error = null
        },
        loginFailure: (state, action) => {
            state.isAuthenticate = false
            state.users = null
            state.error = action.payload
        }
    }
})

export const { loginSuccess, loginFailure, logOut } = loginSlice.actions
export default loginSlice.reducer;   