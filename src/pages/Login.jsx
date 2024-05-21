import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AccountReducer } from "../redux/Reducers/Account";
import { AccountSelector } from "../redux/Selectors/Account";
import { SystemReducer } from "../redux/Reducers/System";
import { URLAD } from "../api";
import { useCallback } from "react";

export default function Login() {
  const dispatch = useDispatch();
  const history = useNavigate();
  let count = 0;
  const { loginSuccess, isAdmin } = useSelector(AccountSelector);
  useEffect(() => {
    if (loginSuccess && !isAdmin) {
      dispatch(
        SystemReducer.actions.setMessageAlert({
          message:
            "You login successfully, If you want to login again, you have to signout!",
          type: "success",
          kind: true,
        })
      );
      history("/");
    } else if (loginSuccess && isAdmin) {
      window.location.href = URLAD;
    }
  }, [loginSuccess]);
  const [dataInput, setDataInput] = useState({
    username: "",
    password: "",
  });
  const handleOnchangeNameInput = useCallback((e) => {
    setDataInput({
      ...dataInput,
      username: e.target.value,
    });
  });
  const handleOnchangePassWordInput = useCallback((e) => {
    setDataInput({
      ...dataInput,
      password: e.target.value,
    });
  });

  const handleLogin = async () => {
    await dispatch(AccountReducer.actions.loginRequest(dataInput));
  };
  return (
    <div>
      <div className="container py-16">
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
          <h2 className="text-2xl uppercase font-medium mb-1">LOGIN</h2>
          <p className="text-gray-600 mb-6 text-sm">
            Login if you are a returing customer
          </p>
          <div>
            <div className="space-y-4">
              <div>
                <label className="text-gray-600 mb-2 block">
                  UserName <span className="text-primary">*</span>
                </label>
                <input
                  onChange={handleOnchangeNameInput}
                  type="email"
                  className="input-box focus:border-primary"
                  placeholder="Jon"
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">
                  Password <span className="text-primary">*</span>
                </label>
                <input
                  onChange={handleOnchangePassWordInput}
                  type="password"
                  className="input-box focus:border-primary"
                  placeholder="Type password"
                />
              </div>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="agreement"
                  className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                />
                <label
                  htmlFor="agreement"
                  className="text-gray-600 ml-3 cursor-pointer"
                >
                  Remember Me
                </label>
              </div>
              <a href="#" className="text-primary">
                Forgot Password?
              </a>
            </div>
            <div className="mt-4">
              <button
                onClick={handleLogin}
                className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
              >
                Login
              </button>
            </div>
          </div>
          {/* login with social */}
          <div className="mt-6 flex justify-center relative">
            <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200" />
            <div className="text-gray-600 uppercase px-3 bg-white relative z-10">
              OR LOGIN IN WITH
            </div>
          </div>
          <div className="mt-4 flex gap-4">
            <a
              href="#"
              className="block w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm"
            >
              Facebook
            </a>
            <a
              href="#"
              className="block w-1/2 py-2 text-center text-white bg-yellow-600 rounded uppercase font-roboto font-medium text-sm"
            >
              Google
            </a>
          </div>
          {/* login with social end */}
          <p className="mt-4 text-gray-600 text-center">
            Don't have an account?{" "}
            <Link to={"/register"} className="text-primary">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
