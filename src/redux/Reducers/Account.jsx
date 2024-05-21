import { createSlice } from "@reduxjs/toolkit";

export const AccountReducer = createSlice({
  name: "account",
  initialState: {
    AccessToken: "",
    registerSuccess: false,
    loginSuccess: false,
    userID: undefined,
    username: undefined,
    password: undefined,
    fullname: undefined,
    email: undefined,
    isAdmin: undefined,
    cartlist: [],
    checkout: [], // checkout nay la list chuyen tu cartlist qua
    history: [],
  },
  reducers: {
    setInfoMoreTimeLogin: (state, action) => {
      state.username = action.payload.username;
      state.loginSuccess = true;
      state.userID = action.payload.id;
      state.email = action.payload.email;
      state.cartlist = action.payload.cartlist;
      state.isAdmin = action.payload.isadmin;
      state.history = action.payload.historycheckout;
    },
    setAccessToken: (state, action) => {
      state.AccessToken = action.payload;
    },
    registerRequest: (state, action) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.fullname = action.payload.fullname;
      state.email = action.payload.email;
    },
    registerSuccess: (state, action) => {
      state.registerSuccess = true;
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.fullname = action.payload.fullname;
      state.email = action.payload.email;
    },
    registerFailure: (state, action) => {
      state.registerSuccess = false;
    },
    loginRequest: (state, action) => {},
    loginSuccess: (state, action) => {
      state.loginSuccess = true;
      state.AccessToken = action.payload.accesstoken;
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    loginFailure: (state, action) => {
      state.loginSuccess = false;
    },
    setLoginState: (state, action) => {
      state.loginSuccess = action.payload;
    },
    signOutRequest: (state, action) => {},
    signOutSuccess: (state, action) => {
      state.AccessToken = null;
    },
    requestAddProductToCartList: (state, action) => {},
    addProductToCartListState: (state, action) => {
      const { name, price, img, likecount, _id, quantity, category } =
        action.payload;
      const isMultiple = state.cartlist.some((item, index) => {
        return item.id === _id;
      });
      console.log("isMultiple", isMultiple);
      if (isMultiple) {
        for (let v of state.cartlist) {
          if (v.id === _id) {
            v.quantity++;
          }
        }
      } else {
        state.cartlist.push({
          id: _id,
          name,
          price,
          category,
          attachment: img,
          quantity: quantity ? quantity : 1,
        });
      }
    },
    requestChangeCartList: (state, action) => {},
    changeQuantityOfProductItem: (state, action) => {
      const { idproduct, quantity } = action.payload;
      state.cartlist.map((item, index) => {
        if (item.id === idproduct) {
          item.quantity = quantity;
        }
      });
    },
    removeProductItemOfCartList: (state, action) => {
      const { idproduct } = action.payload;
      const result = state.cartlist.filter((item, index) => {
        return item.id !== idproduct;
      });
      state.cartlist = result;
    },
    setCheckoutListForFirstTime: (state, action) => {
      state.checkout = action.payload;
    },
    removeProductItemOfCheckout: (state, action) => {
      const { idproduct } = action.payload;
      const result = state.checkout.filter((item, index) => {
        return item.id !== idproduct;
      });
      state.checkout = result;
    },
    requestSetHistoryAfterCheckout: (state, action) => {},
    removeProductHistory: (state, action) => {
      const { idProduct } = action.payload;
      state.history = state.history.filter((item, index) => {
        return item.id !== idProduct;
      });
    },
    setStateForHistoryAfterConfirm: (state, action) => {
      action.payload.map((item, index) => state.history.push(item));
    },
    setCartListAfterCheckout: (state, action) => {
      // [1,2,3,4]
      // [2,3]
      // result : [1,4]
      // [1]
      // [1]
      // result : []
      //
      let result = [];
      let listid1 = state.cartlist.map((item, index) => {
        return item.id;
      });
      let listid2 = action.payload.map((item, index) => {
        return item.id;
      });
      listid1 = listid1.filter((val) => !listid2.includes(val)); // lay ra nhung phan tu co id khác với id checkout
      if (listid1.length !== 0) {
        console.log("listid1 : ", listid1);
        for (let i = 0; i < state.cartlist.length; i++) {
          for (let j = 0; j < listid1.length; j++) {
            if (state.cartlist[i].id === listid1[j]) {
              result.push(state.cartlist[i]);
            }
          }
        }
        state.cartlist = result;
      } else {
        console.log("listid1 : ", listid1);
        state.cartlist = [];
      }
      // state.cartlist.map((item, index) => {
      //   console.log("result : " + item.name);
      // });
    },
  },
});
