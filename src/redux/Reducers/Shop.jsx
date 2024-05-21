import { createSlice } from "@reduxjs/toolkit";

export const ShopReducer = createSlice({
  name: "shop",
  initialState: {
    FilterProduct: [],
  },
  reducers: {
    // ap dung cho fetch
    initFilterProduct: (state, action) => {
      const { page_number, page_size, data, isPaginateLayout } = action.payload;
      if (isPaginateLayout) {
        state.FilterProduct = data.slice(
          (page_number - 1) * page_size,
          page_number * page_size
        );
      } else {
        state.FilterProduct = data;
      }
    },
    filterByCategory: (state, action) => {
      state.FilterProduct = state.FilterProduct.filter((item, index) => {
        return item.category === action.payload;
      });
    },
    filterByPrice: (state, action) => {
      if (action.payload === "asc")
        state.FilterProduct = state.FilterProduct.sort((a, b) => {
          return a.price - b.price;
        });
      if (action.payload === "des")
        state.FilterProduct = state.FilterProduct.sort((a, b) => {
          return b.price - a.price;
        });
    },
  },
});
