import { all, fork } from "redux-saga/effects";
import accountSaga from "./accountSaga";
import checkout from "./CheckoutSaga";
import homeProductSaga from "./fetchSaga";
import cartList from "./CartList";
function* rootSaga() {
  yield all([
    fork(accountSaga),
    fork(homeProductSaga),
    fork(cartList),
    fork(checkout),
  ]);
}
export default rootSaga;
