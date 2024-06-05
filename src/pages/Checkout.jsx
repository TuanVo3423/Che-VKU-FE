import { Trash } from "phosphor-react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paypal from "../components/Paypal";
import { AccountReducer } from "../redux/Reducers/Account";
import { AccountSelector } from "../redux/Selectors/Account";
import emailjs from "@emailjs/browser";
import { CircleSpinnerOverlay } from "react-spinner-overlay";
import { SystemReducer } from "../redux/Reducers/System";

export default function Checkout() {
  // const [ischeckout, setIsCheckOut] = useState(false);
  const [isEmptyCheckout, setIsEmptyCheckout] = useState(false);
  const [flags, setFlags] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // checkout -> san pham từ cartlist qua checkout
  const [infoYourOrder, setInfoYourOrder] = useState({
    email: "",
    name: "",
    address: "",
    phone: undefined,
  });
  useEffect(() => {
    console.log("infoYourOrder", infoYourOrder);
  }, [infoYourOrder]);
  const { cartlist, userID, checkout } = useSelector(AccountSelector);
  const handleCheckout = async (e) => {
    const serviceID = "service_jv500u5";
    const templateID = "template_cpzt9fd";
    const infoOrder = checkout
      .map((item, index) => {
        const name = item?.name;
        const quantity = item?.quantity;
        return `Tên sản phẩm: ${name}\nSố lượng: ${quantity}`;
      })
      .join("\n");
    e.preventDefault();
    emailjs.init("oGf2xSghLt1ka_BVe");
    console.log(e.target["email-address"].value);
    console.log(e.target["name"].value);
    console.log(e.target["phone"].value);
    console.log(e.target["address"].value);
    const params = {
      email: e.target["email-address"].value,
      phone: e.target["phone"].value,
      address: e.target["address"].value,
      name: e.target["name"].value,
      info: infoOrder,
    };
    setLoading(true);
    await emailjs
      .send(serviceID, templateID, params)
      .then((res) => {
        dispatch(
          SystemReducer.actions.setMessageAlert({
            message: "Đơn đặt hàng của bạn đã được gửi tới Chè Huế VKU!",
            type: "success",
            kind: true,
          })
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          SystemReducer.actions.setMessageAlert({
            message: "Gặp lỗi khi liên hệ tới cửa hàng vui lòng thử lại sau!",
            type: "error",
            kind: true,
          })
        );
        setLoading(false);
      });
    e.target.reset();
    setInfoYourOrder({
      ...infoYourOrder,
      email: e.target["email-address"].value,
      name: e.target["name"].value,
      address: e.target["address"].value,
      phone: e.target["phone"].value,
    });
  };
  useEffect(() => {
    if (flags === 1) {
      setFlags(2);
      dispatch(AccountReducer.actions.setCheckoutListForFirstTime(cartlist));
    }
  }, []);
  useEffect(() => {
    if (checkout.length === 0) {
      setIsEmptyCheckout(true);
    } else {
      setIsEmptyCheckout(false);
    }
  }, [checkout]);
  let total = 0;
  for (let i = 0; i < checkout.length; i++) {
    total += checkout[i].price * checkout[i].quantity;
  }
  const handleRemoveCheckout = ({ id }) => {
    dispatch(
      AccountReducer.actions.removeProductItemOfCheckout({ idproduct: id })
    );
  };

  return (
    <div className="bg-gray-50">
      {loading && (
        <>
          <CircleSpinnerOverlay
            loading={loading}
            overlayColor="rgba(0,153,255,0.2)"
          />
        </>
      )}
      <form
        onSubmit={(e) => handleCheckout(e)}
        className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        <h2 className="sr-only">Checkout</h2>
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Thông tin liên hệ
              </h2>
              <div className="mt-4">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Địa chỉ email
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    required
                    id="email-address"
                    name="email-address"
                    autoComplete="email"
                    // onChange={}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">
                Thông tin giao hàng
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-1 sm:gap-x-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tên
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      autoComplete="family-name"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Địa chỉ
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="address"
                      id="address"
                      required
                      autoComplete="street-address"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Điện thoại
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      required
                      autoComplete="tel"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="mt-4 border-t border-gray-200 pt-10">
              <fieldset>
                <legend className="text-lg font-medium text-gray-900">
                  Delivery method
                </legend>
                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <label className="relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none">
                    <input
                      type="radio"
                      name="delivery-method"
                      defaultValue="Standard"
                      className="sr-only"
                      aria-labelledby="delivery-method-0-label"
                      aria-describedby="delivery-method-0-description-0 delivery-method-0-description-1"
                    />
                    <div className="flex-1 flex">
                      <div className="flex flex-col">
                        <span
                          id="delivery-method-0-label"
                          className="block text-sm font-medium text-gray-900"
                        >
                          {" "}
                          Standard{" "}
                        </span>
                        <span
                          id="delivery-method-0-description-0"
                          className="mt-1 flex items-center text-sm text-gray-500"
                        >
                          {" "}
                          4–10 business days{" "}
                        </span>
                        <span
                          id="delivery-method-0-description-1"
                          className="mt-6 text-sm font-medium text-gray-900"
                        >
                          {" "}
                          $5.00{" "}
                        </span>
                      </div>
                    </div>

                    <svg
                      className="h-5 w-5 text-indigo-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <div
                      className="absolute -inset-px rounded-lg border-2 pointer-events-none"
                      aria-hidden="true"
                    />
                  </label>
                </div>
              </fieldset>
            </div> */}
          </div>
          {/* Order summary */}

          <div className="mt-4 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900"></h2>
            <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              <ul role="list" className="divide-y divide-gray-200">
                {checkout.map((item, index) => {
                  return (
                    <li key={index} className="flex py-6 px-4 sm:px-6">
                      <div className="flex-shrink-0">
                        <img
                          src={item?.attachment}
                          alt="Front of men's Basic Tee in black."
                          className="w-20 rounded-md"
                        />
                      </div>
                      <div className="ml-6 flex-1 flex flex-col">
                        <div className="flex">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm">
                              <a
                                href="#"
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {" "}
                                {item?.name}{" "}
                              </a>
                            </h4>
                            <p className="mt-1 text-sm text-gray-500">
                              Category: chè truyền thống
                            </p>
                          </div>
                          <div className="ml-4 flex-shrink-0 flow-root">
                            <button
                              type="button"
                              className="-m-2.5 bg-white p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500"
                            >
                              <span className="sr-only">Remove</span>
                              <Trash
                                onClick={() =>
                                  handleRemoveCheckout({ id: item.id })
                                }
                                size={24}
                                weight="bold"
                              />
                            </button>
                          </div>
                        </div>
                        <div className="flex-1 pt-2 flex items-end justify-between">
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            {item?.price * item?.quantity} đồng
                          </p>
                          <div className="ml-4">
                            <span className="text-base font-semibold cursor-pointer">
                              Số lượng: {item?.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}

                {/* More products... */}
              </ul>
              <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
                {/* <div className="flex items-center justify-between">
                  <dt className="text-sm">Tổng thanh toán</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {total} đồng
                  </dd>
                </div> */}
                {/* <div className="flex items-center justify-between">
                  <dt className="text-sm">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">$5.00</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Taxes</dt>
                  <dd className="text-sm font-medium text-gray-900">$5.00</dd>
                </div> */}
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Tổng thanh toán</dt>
                  <dd className="text-base font-medium text-gray-900">
                    {total} đồng
                  </dd>
                </div>
              </dl>
              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <button
                  type="submit"
                  // onClick={(e) => handleCheckout(e)}
                  className={`${
                    isEmptyCheckout && "cursor-not-allowed"
                  } w-full bg-primary border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:opacity-[0.8]  focus:outline-none focus:ring-2 focus:ring-offset-2`}
                >
                  Xác nhận đặt hàng
                </button>
                {/* {infoYourOrder.name ? (
                  <Paypal
                    dataCheckout={checkout}
                    infoYourOrder={infoYourOrder}
                  />
                ) : (
                  <button
                    type="submit"
                    // onClick={(e) => handleCheckout(e)}
                    className={`${
                      isEmptyCheckout && "cursor-not-allowed"
                    } w-full bg-primary border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:opacity-[0.8]  focus:outline-none focus:ring-2 focus:ring-offset-2`}
                  >
                    Xác nhận đặt hàng
                  </button>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
