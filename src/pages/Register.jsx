import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AccountReducer } from "../redux/Reducers/Account";
import { AccountSelector } from "../redux/Selectors/Account";
import { useNavigate } from "react-router-dom";
import { SystemReducer } from "../redux/Reducers/System";
export default function Register() {
  // const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const [error, setError] = useState({
    message: "",
    isError: false,
    type1: "",
    type2: "",
  });
  // console.log('error : ',error);
  const history = useNavigate();
  const { registerSuccess } = useSelector(AccountSelector);

  useEffect(() => {
    if (registerSuccess) {
      dispatch(
        SystemReducer.actions.setMessageAlert({
          message: "You register successfully!",
          type: "success",
          kind: true,
        })
      );
      history("/login");
    }
  }, [registerSuccess]);
  const dispath = useDispatch();
  const [dataInput, setDataInput] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const handleSubmit = useCallback(() => {
    if (!isValidEmail(dataInput.email)) {
      setError({
        ...error,
        message: "Invalid email address",
        isError: true,
        type1: "email",
      });
    } else if (dataInput.password !== dataInput.confirmPassword) {
      setError({
        ...error,
        message: "Please enter a password and confirm password has same value",
        isError: true,
        type2: "confirm",
      });
    } else {
      dispath(AccountReducer.actions.registerRequest(dataInput));
    }
  });
  const handleTypeUserName = useCallback((e) => {
    setDataInput({
      ...dataInput,
      username: e.target.value,
    });
  });
  const handleTypeFullName = useCallback((e) => {
    setDataInput({
      ...dataInput,
      fullname: e.target.value,
    });
  });
  const handleTypeEmail = useCallback((e) => {
    setDataInput({
      ...dataInput,
      email: e.target.value,
    });
  });
  const handleTypePassword = useCallback((e) => {
    setDataInput({
      ...dataInput,
      password: e.target.value,
    });
  });
  const handleTypeConfirmPassword = useCallback((e) => {
    setDataInput({
      ...dataInput,
      confirmPassword: e.target.value,
    });
  });
  return (
    <div>
      <div className="container py-16">
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
          <h2 className="text-2xl uppercase font-medium mb-1">
            create an account
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            Register here if you don't have account
          </p>
          <div>
            <div className="space-y-4">
              <div>
                <label className="text-gray-600 mb-2 block">
                  UserName <span className="text-primary">*</span>
                </label>
                <input
                  onChange={handleTypeUserName}
                  type="text"
                  className="input-box focus:border-primary"
                  placeholder="JohnDoe"
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">
                  Full Name <span className="text-primary">*</span>
                </label>
                <input
                  onChange={handleTypeFullName}
                  type="text"
                  className="input-box focus:border-primary"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">
                  Email Address <span className="text-primary">*</span>
                </label>
                <input
                  onChange={handleTypeEmail}
                  type="email"
                  className="input-box focus:border-primary w-full"
                  placeholder="example@mail.com"
                />
                {error.isError && error.type1 === "email" && (
                  <p className="text-red-400 text-sm font-bold underline">
                    {error.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">
                  Password <span className="text-primary">*</span>
                </label>
                <input
                  onChange={handleTypePassword}
                  type="password"
                  className="input-box focus:border-primary"
                  placeholder="type password"
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">
                  Confirm Password
                  <span className="text-primary">*</span>
                </label>
                <input
                  onChange={handleTypeConfirmPassword}
                  type="password"
                  className="input-box focus:border-primary"
                  placeholder="confirm your password"
                />
                {error.isError && error.type2 === "confirm" && (
                  <p className="text-red-400 text-sm font-bold underline">
                    {error.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                id="agreement"
                className="text-primary focus:ring-0 rounded-sm cursor-pointer"
              />
              <label
                htmlFor="agreement"
                className="text-gray-600 ml-3 cursor-pointer"
              >
                I have read and agree to the
                <a href="#" className="text-primary">
                  terms &amp; conditions
                </a>
              </label>
            </div>
            <div className="mt-4">
              <button
                onClick={handleSubmit}
                className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
              >
                create account
              </button>
            </div>
          </div>
          {/* login with social */}
          <div className="mt-6 flex justify-center relative">
            <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200" />
            <div className="text-gray-600 uppercase px-3 bg-white relative z-10">
              OR SINGUP IN WITH
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
            Already have an account?{" "}
            <a href="login.html" className="text-primary">
              Login Now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
