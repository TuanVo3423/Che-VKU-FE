import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AccountReducer } from "../redux/Reducers/Account";
import { AccountSelector } from "../redux/Selectors/Account";

export default function OrderComplete() {
  const dispatch = useDispatch();
  const { history, userID, cartlist } = useSelector(AccountSelector);

  useEffect(() => {
    const email = dispatch(
      AccountReducer.actions.requestChangeCartList({
        cartlist,
        userID,
      })
    );
  }, []);
  return (
    <div>
      <div className="max-w-3xl mx-auto px-4 pt-16 pb-24 text-center">
        <div className="mb-8">
          <img src="images/complete.png" className="w-16 inline-block" />
        </div>
        <h2 className="text-gray-800 font-medium text-3xl mb-3">
          YOUR ORDER IS COMPLETED!
        </h2>
        <p className="text-gray-600 ">
          Thank you for your order! Your order is being processed and will be
          completed within 2-5 days. You will receive an email confirmation when
          your order is completed.
        </p>
        <div className="mt-10">
          <Link to={"/"}>
            <p
              className="bg-primary border border-primary text-white px-6 py-3 font-medium rounded-md uppercase hover:bg-transparent
                hover:text-primary transition text-center"
            >
              Continue shopping
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
