import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/mainlayout";
import Cookies from "universal-cookie";
import { publicRoutes } from "./routes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { AccountSelector } from "./redux/Selectors/Account";
import { ProductReducer } from "./redux/Reducers/Product";
import { AccountReducer } from "./redux/Reducers/Account";
import { CommentReducer } from "./redux/Reducers/Comment";
import { io } from "socket.io-client";
import { URL } from "./api";

function App() {
  const [count, setCount] = useState(0);
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const accesstoken = cookies.get("token");
  useEffect(() => {
    const socket = io.connect(URL);
    dispatch(CommentReducer.actions.setSocketState({ socket }));
  }, []);
  React.useEffect(() => {
    dispatch(
      AccountReducer.actions.loginRequest({
        username: "titus",
        password: "Tuandzvc123@",
      })
    );
    dispatch(ProductReducer.actions.getProductsRequest(accesstoken));
  }, [accesstoken, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <MainLayout
                  titleIndex={count}
                  path={route.title}
                  isShowBreadcrum={route.isShowBreadcrum}
                >
                  <Page />
                </MainLayout>
              }
            ></Route>
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
