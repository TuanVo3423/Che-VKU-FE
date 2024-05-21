import {
  AddressBook,
  ClockCounterClockwise,
  CreditCard,
  Gift,
  HeartStraight,
  ShoppingCart,
  SignOut,
  Trash,
  UserFocus,
} from "phosphor-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AccountReducer } from "../redux/Reducers/Account";
import { AccountSelector } from "../redux/Selectors/Account";
import { ProductSelector } from "../redux/Selectors/Product";

export default function Wishlist() {
  const dispatch = useDispatch();
  const { username, fullname, email, history, userID } =
    useSelector(AccountSelector);
  const { data } = useSelector(ProductSelector);
  const handleRemoveProduct = ({ idProduct }) => {
    dispatch(AccountReducer.actions.removeProductHistory({ idProduct }));
  };
  useEffect(() => {
    dispatch(
      AccountReducer.actions.requestSetHistoryAfterCheckout({ history, userID })
    );
  }, [history]);
  return (
    <div>
      <div className="container lg:grid grid-cols-12 items-start gap-6 pt-4 pb-16">
        {/* sidebar */}
        <div className="col-span-3">
          {/* account profile */}
          <div className="px-4 py-3 shadow flex items-center gap-4">
            <div className="flex-shrink-0">
              <img
                src="images/avatar.png"
                className="rounded-full w-14 h-14 p-1 border border-gray-200 object-cover"
              />
            </div>
            <div>
              <p className="text-gray-600">Hello,</p>
              <h4 className="text-gray-800 capitalize font-medium">
                {username}
              </h4>
            </div>
          </div>
          {/* account profile end */}
          {/* profile links */}
          <div className="mt-6 bg-white shadow rounded p-4 divide-y divide-gray-200 space-y-4 text-gray-600">
            {/* single link */}
            <div className="space-y-1 pl-8">
              <Link
                to={"/account"}
                className="flex gap-x-2 justify-start items-center medium capitalize text-gray-800 font-medium hover:text-primary transition"
              >
                <UserFocus size={20} weight="bold" />
                Manage account
              </Link>
            </div>
            {/* single link end */}
            {/* single link */}
            <div className="space-y-1 pl-8 pt-4">
              <Link
                to={"/history"}
                className="flex gap-x-2 justify-start items-center medium capitalize text-gray-800 font-medium hover:text-primary transition"
              >
                <ClockCounterClockwise size={20} weight="bold" />
                My order history
              </Link>
            </div>
            {/* single link end */}
            {/* single link */}

            <div className="pl-8 pt-4">
              <Link
                to={"/cart"}
                className="flex gap-x-2 justify-start items-center medium capitalize text-gray-800 font-medium hover:text-primary transition"
              >
                <ShoppingCart size={20} weight="bold" />
                my cartlist
              </Link>
            </div>
            {/* single link end */}
            {/* single link */}

            {/* single link end */}
          </div>
          {/* profile links end */}
        </div>
        {/* sidebar end */}
        {/* account content */}
        {history.length === 0 ? (
          <div className="col-span-9 mt-6 lg:mt-0 space-y-4 text-center">
            <p className="text-xl text-primary font-bold">
              No purchase history here!
            </p>
          </div>
        ) : (
          <div className="col-span-9 mt-6 lg:mt-0 space-y-4">
            {/* single wishlist */}
            {history.map((item, index) => {
              if (history.length === 0) {
                return <h1>Khong co hang</h1>;
              } else {
                return (
                  <div
                    key={index}
                    className="flex items-center md:justify-between gap-4 md:gap-6 p-4 border border-gray-200 rounded flex-wrap md:flex-nowrap"
                  >
                    {/* cart image */}
                    <div className="md:w-28 w-full flex-shrink-0">
                      <img src={item?.attachment} className="w-full" />
                    </div>
                    {/* cart image end */}
                    {/* cart content */}
                    <div className="md:w-1/3 w-full">
                      <h2 className="text-gray-800 mb-1 xl:text-xl textl-lg font-medium uppercase">
                        {item?.name}
                      </h2>
                      <p className="text-gray-500 text-sm">
                        Quantity:
                        <span className="text-green-600">
                          ({item?.quantity})
                        </span>
                      </p>
                      <p className="text-gray-500 text-sm">
                        Category:{" "}
                        <span className="text-green-600">{item?.category}</span>
                      </p>
                    </div>
                    {/* cart content end */}
                    <div>
                      <p className="text-primary text-lg font-semibold">
                        ${item?.price * item.quantity}
                      </p>
                    </div>
                    <p className="ml-auto md:ml-0 block px-6 py-2 text-center text-primary text-lg font-semibold">
                      {new Date(item?.time).toLocaleString()}
                    </p>
                    <div
                      onClick={() =>
                        handleRemoveProduct({ idProduct: item.id })
                      }
                      className="text-gray-600 hover:text-primary cursor-pointer"
                    >
                      <Trash size={24} weight="bold" />
                    </div>
                  </div>
                );
              }
            })}
            {/* single wishlist end */}
          </div>
        )}

        {/* account content end */}
      </div>
    </div>
  );
}
