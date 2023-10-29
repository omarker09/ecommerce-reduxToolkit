import { createSlice } from "@reduxjs/toolkit";


const eliteslice = createSlice({
    name: "elitez",
    initialState: [],
    reducers: {
        addProduct: (state, action) => {
            const foundProduct = state.find((product) => product.id == action.payload.id)

            if (foundProduct) {
                foundProduct.quantity += 1
            } else {
                const productClone = { ...action.payload, quantity: 1 }
                state.push(productClone)
            }

        },
        deleteProduct: (state, action) => {
           return state.filter((product) => product.id !== action.payload.id)
          
        },
        quantityPlus: (state, action) => {
            const foundProduct = state.find((product) => product.id == action.payload.id)
            if (foundProduct) {
                foundProduct.quantity += 1
            }
        },
        quantityMinus: (state, action) => {
            const foundProduct = state.find((product) => product.id == action.payload.id)
            if (foundProduct) {
                foundProduct.quantity -= 1
                if (foundProduct.quantity <= 0) {
                    foundProduct.quantity = 0
                }
            }
        },
    }
})


export const { addProduct, deleteProduct, quantityPlus, quantityMinus } = eliteslice.actions;

export default eliteslice.reducer;