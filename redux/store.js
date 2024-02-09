import { configureStore } from "@reduxjs/toolkit";
import { shiftsApi } from "./shiftsApi";


const reduxStore = configureStore({
    reducer: {
        [shiftsApi.reducerPath]: shiftsApi.reducer,
    },
    middleware: def => [...def(), shiftsApi.middleware]
})

export default reduxStore