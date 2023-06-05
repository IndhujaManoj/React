import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './Slices/TaksSlice'

export const store=configureStore({
    reducer:{
        tasks:taskReducer
    }
})