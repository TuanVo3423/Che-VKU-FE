import { takeLatest, call, put } from "redux-saga/effects";
import { AccountReducer } from "../Reducers/Account";
import { SystemReducer } from "../Reducers/System";
import * as api from "../../api";

function* addProductToCartList(action) {
  try {
    // call api
    const data = yield call(api.addProductToCartList, action.payload);
    yield put(AccountReducer.actions.addProductToCartListState(action.payload));
    yield put(
      SystemReducer.actions.setMessageAlert({
        message: "Thêm vào danh sách yêu thích thành công!",
        type: "success",
        kind: true,
      })
    );
    yield put(SystemReducer.actions.setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
}

function* updateProductCartList(action) {
  try {
    const data = yield call(api.changeCartListItems, action.payload);
    // console.log(
    //   "hoan thanh vao database de thay doi cartlist sau khi checkout"
    // );
    // yield put(
    //   SystemReducer.actions.setMessageAlert({
    //     kind: true,
    //     message: "Thêm vào yêu thích successfully",
    //     type: "success",
    //   })
    // );

    yield put(SystemReducer.actions.setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
}
function* cartList() {
  yield takeLatest(
    AccountReducer.actions.requestAddProductToCartList,
    addProductToCartList
  );
  yield takeLatest(
    AccountReducer.actions.requestChangeCartList,
    updateProductCartList
  );
}

export default cartList;
