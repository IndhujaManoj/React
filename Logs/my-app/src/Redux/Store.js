import { configureStore } from "@reduxjs/toolkit";
import UserSlice from './Splices/User'

export const store=configureStore({
    reducer:{
        user:UserSlice
    }
})

// export default store;

