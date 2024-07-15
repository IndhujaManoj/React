import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../slices/counterSlice";
import loginSlice from "../slices/loginSlice";

const store = configureStore({
    reducer: {
        counter: counterSlice,
        login:loginSlice
    }
});

export default store;
