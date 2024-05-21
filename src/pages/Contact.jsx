import React, { useState } from "react";
import { CircleSpinnerOverlay } from "react-spinner-overlay";
import { sendEmailToAdmin } from "../api";
import { SystemReducer } from "../redux/Reducers/System";
import { useDispatch } from "react-redux";

export default function Contact() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSendMailToAdmin = (e) => {
    e.preventDefault();
    setLoading(true);

    const sendemailtoadmin = sendEmailToAdmin({
      email: e.target["email-address"].value,
      name: e.target["name"].value,
      pass: e.target["pass"].value,
      country: e.target["country"].value,
      message: e.target["message"].value,
    })
      .then((res) => {
        dispatch(
          SystemReducer.actions.setMessageAlert({
            message: "Email has been successfully sent to admin!",
            type: "success",
            kind: true,
          })
        );
        setLoading(false);
      })
      .catch((err) => {
        dispatch(
          SystemReducer.actions.setMessageAlert({
            message:
              "you entered wrong email account, please enter correct gmail and password!",
            type: "error",
            kind: true,
          })
        );
        setLoading(false);
      });
    e.target.reset();
  };
  return (
    <div className="w-full flex items-center justify-center my-12">
      {loading && (
        <>
          <CircleSpinnerOverlay
            loading={loading}
            overlayColor="rgba(0,153,255,0.2)"
          />
        </>
      )}
      <form
        onSubmit={(e) => handleSendMailToAdmin(e)}
        className=" bg-white shadow rounded py-12 lg:px-28 px-8"
      >
        <p className="md:text-3xl text-xl font-bold leading-7 text-center text-gray-700">
          Liên hệ với chúng tôi
        </p>
        <div className="md:flex items-center mt-12">
          <div className="md:w-72 flex flex-col">
            <label className="text-base font-semibold leading-none text-gray-800">
              Email
            </label>
            <input
              tabIndex={0}
              arial-label="Please input name"
              type="email"
              required
              name="email-address"
              className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
              placeholder="Please input  name"
            />
          </div>
          <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
            <label className="text-base font-semibold leading-none text-gray-800">
              Mật khẩu
            </label>
            <input
              tabIndex={0}
              arial-label="Please input email address"
              type="password"
              required
              name="pass"
              className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
              placeholder="Please input email address"
            />
          </div>
        </div>
        <div className="md:flex items-center mt-8">
          <div className="md:w-full flex flex-col">
            <label className="text-base font-semibold leading-none text-gray-800">
              Tên
            </label>
            <input
              tabIndex={0}
              role="input"
              arial-label="Please input company name"
              type="text"
              required
              name="name"
              className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100 "
              placeholder="Please input company name"
            />
          </div>
        </div>
        <div>
          <div className="w-full flex flex-col mt-8">
            <label className="text-base font-semibold leading-none text-gray-800">
              Message
            </label>
            <textarea
              tabIndex={0}
              aria-label="leave a message"
              role="textbox"
              type="text"
              required
              name="message"
              className="h-36 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100 resize-none"
              defaultValue={""}
            />
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <button className="mt-9 text-base font-semibold leading-none text-white py-4 px-10 bg-primary rounded hover:opacity-[.8] focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none">
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
}
