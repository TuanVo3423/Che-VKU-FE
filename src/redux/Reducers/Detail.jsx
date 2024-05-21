import { createSlice } from "@reduxjs/toolkit";

export const DetailReducer = createSlice({
    name : 'detail',
    initialState : {
        idDetail : '',
    },
    reducers : {
        setIDDetail : (state, action) => {
            state.idDetail = action.payload;
        }
    }
});