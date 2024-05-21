import { takeLatest, call, put } from "redux-saga/effects";
import { AccountReducer } from "../Reducers/Account";
import { ProductReducer } from "../Reducers/Product";
import { SystemReducer } from "../Reducers/System";
import { NavbarSlice } from "../../pages/components/Navbar";
import Cookies from "universal-cookie";
import * as api from "../../api";
import { useNavigate } from "react-router-dom";
import { ShopReducer } from "../Reducers/Shop";

function* fetchProducts(action) {
  try {
    const accessToken = action.payload;
    const InfoAtHome = yield call(api.fetchProducts, accessToken);
    yield console.log("InfoAtHome : ", InfoAtHome);

    // put này dùng để dispatch 1 actions
    yield put(SystemReducer.actions.setIsLoading(true));
    yield put(
      ProductReducer.actions.getProductsSuccess(InfoAtHome.data.products)
    );
    yield put(AccountReducer.actions.setInfoMoreTimeLogin(InfoAtHome.data));
    yield put(AccountReducer.actions.setAccessToken(accessToken));
    yield put(SystemReducer.actions.setIsLoading(false));
  } catch (error) {
    yield put(AccountReducer.actions.loginFailure());
    yield put(ProductReducer.actions.getProductsFailure());
    yield put(SystemReducer.actions.setIsLoading(false));
    yield put(
      SystemReducer.actions.setMessageAlert({
        ...error.response.data,
        kind: true,
      })
    );
  }
}

function* homeProductSaga() {
  yield takeLatest(ProductReducer.actions.getProductsRequest, fetchProducts);
}

export default homeProductSaga;
