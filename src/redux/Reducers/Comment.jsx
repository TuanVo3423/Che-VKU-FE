import { createSlice } from "@reduxjs/toolkit";

export const CommentReducer = createSlice({
  name: "comment",
  initialState: {
    socket: undefined,
    chat: [],
    comments: [],
  },
  reducers: {
    setSocketState: (state, action) => {
      state.socket = action.payload.socket;
    },
    setCommentsState: (state, action) => {
      state.comments = action.payload;
    },
    setChatState: (state, action) => {
      state.chat = action.payload;
    },
    addChatState: (state, action) => {
      state.chat.push(action.payload);
    },
    addCommentsState: (state, action) => {
      state.comments = [action.payload, ...state.comments];
    },
  },
});
