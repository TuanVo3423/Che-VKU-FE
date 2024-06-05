import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AccountSelector } from "../redux/Selectors/Account";
import { AccountReducer } from "../redux/Reducers/Account";
import {
  ClockCounterClockwise,
  Heart,
  SignOut,
  UserFocus,
} from "phosphor-react";
export default function Account() {
  const [choice, setChoice] = useState();
  const { username, fullname, email } = useSelector(AccountSelector);
  const dispatch = useDispatch();
  const handleSigout = async () => {
    await dispatch(AccountReducer.actions.signOutRequest());
    await window.location.reload();
  };
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
                <Heart size={20} weight="bold" />
                my cartlist
              </Link>
            </div>
            {/* single link end */}
            {/* single link */}
            <div className="pl-8 pt-4 cursor-pointer">
              <div
                onClick={handleSigout}
                className="flex gap-x-2 justify-start items-center medium capitalize text-gray-800 font-medium hover:text-primary transition"
              >
                <SignOut size={20} weight="bold" />
                logout
              </div>
            </div>
            {/* single link end */}
          </div>
          {/* profile links end */}
        </div>
        {/* sidebar end */}
        {/* account content */}
        <div className="col-span-9 grid md:grid-cols-1 gap-4 mt-6 lg:mt-0">
          {/* single card */}
          <div className="shadow rounded bg-white px-4 pt-6 pb-8">
            <div className="flex justify-between items center mb-4">
              <h3 className="font-medium capitalize text-gray-800 text-lg">
                personal profile
              </h3>
              <a href="#" className="text-primary">
                Edit
              </a>
            </div>
            <div className="space-y-1">
              <h4 className="text-gray-700 font-medium">{username}</h4>
              <p className="text-gray-800">{email}</p>
              <p className="text-gray-800">(123) 456-789</p>
            </div>
          </div>
          {/* single card end */}
          {/* single card */}
          <div className="shadow rounded bg-white px-4 pt-6 pb-8">
            <div className="flex justify-between items center mb-4">
              <h3 className="font-medium capitalize text-gray-800 text-lg">
                Shipping Address
              </h3>
              <a href="#" className="text-primary">
                Edit
              </a>
            </div>
            <div className="space-y-1">
              <h4 className="text-gray-700 font-medium">{username}</h4>
              <p className="text-gray-800">38 Tran Dai Nghia</p>
              <p className="text-gray-800">Ngu Hoang Son, Da Nang City</p>
              <p className="text-gray-800">(123) 456-789</p>
            </div>
          </div>
          {/* single card end */}
          {/* single card */}
          <div className="shadow rounded bg-white px-4 pt-6 pb-8">
            <div className="flex justify-between items center mb-4">
              <h3 className="font-medium capitalize text-gray-800 text-lg">
                Billing Address
              </h3>
              <a href="#" className="text-primary">
                Edit
              </a>
            </div>
            <div className="space-y-1">
              <h4 className="text-gray-700 font-medium">{username}</h4>
              <p className="text-gray-800">38 Tran Dai Nghia</p>
              <p className="text-gray-800">Ngu Hoang Son, Da Nang City</p>
              <p className="text-gray-800">(123) 456-789</p>
            </div>
          </div>
          {/* single card end */}
        </div>
        {/* account content end */}
      </div>
    </div>
  );
}
