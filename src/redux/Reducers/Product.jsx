import { createSlice } from "@reduxjs/toolkit";

export const ProductReducer = createSlice({
    name : 'product',
    initialState : {
        data : [],
    },
    reducers : {
        getProductsRequest : (state, action) => {
            
        },
        getProductsSuccess : (state, action) => {
            state.data = action.payload;
        },
        getProductsFailure : (state, action) => {

        },
    }
});