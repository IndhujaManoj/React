import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Reducer/Cart"; // Assuming `cartReducer` is the default export from "../Reducer/Cart"

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});
