import { configureStore } from "@reduxjs/toolkit";
import eliteslice from "./slices/eliteslice";

// Store Componnent
const store = configureStore({
    reducer : {
        product: eliteslice
    }
})

export default store