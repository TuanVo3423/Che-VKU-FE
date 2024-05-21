import { createSlice } from "@reduxjs/toolkit";

export const SystemReducer = createSlice({
  name: "system",
  initialState: {
    isLoading: true,
    isError: false,
    MessageAlert: undefined,
    typeAlert: undefined,
  },
  reducers: {
    setMessageAlert: (state, action) => {
      state.isError = action.payload.kind;
      state.MessageAlert = action.payload.message;
      state.typeAlert = action.payload.type;
    },
    reset: (state, action) => {
      // state.isLoading = true;
      state.isError = false;
      state.MessageAlert = undefined;
      state.typeAlert = undefined;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsDisplayMessage: (state, action) => {
      state.isError = false;
    },
  },
});
