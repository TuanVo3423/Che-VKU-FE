import { takeLatest, call, put } from "redux-saga/effects";
import { AccountReducer } from "../Reducers/Account";
import { SystemReducer } from "../Reducers/System";
import * as api from "../../api";

function* addproductToHistoryCheckout(action) {
  
  try {
    console.log("vao saga", action.payload);
    yield put(SystemReducer.actions.reset());
    // call api
    const data = yield call(api.checkout, action.payload);
    yield put(
      AccountReducer.actions.setCartListAfterCheckout(action.payload.history)
    );
    // yield put(
    //   SystemReducer.actions.setMessageAlert({
    //     message: "Do task successfully",
    //     type: "success",
    //     kind: true,
    //   })
    // );
    yield put(SystemReducer.actions.setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
}

function* checkout() {
  yield takeLatest(
    AccountReducer.actions.requestSetHistoryAfterCheckout,
    addproductToHistoryCheckout
  );
}

export default checkout;
