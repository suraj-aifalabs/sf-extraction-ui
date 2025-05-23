import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./landing/userSlice";

const store = configureStore({
    reducer: {
        userData: userSlice,
    },
});

export default store;
