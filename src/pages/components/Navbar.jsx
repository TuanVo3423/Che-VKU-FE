import { Laptop, List, Option, PhoneCall } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import { createSlice } from "@reduxjs/toolkit";
import { NavbarSelector } from "../../redux/Selectors/Navbar";
import { AccountSelector } from "../../redux/Selectors/Account";
export const NavbarSlice = createSlice({
  name: "navbar",
  initialState: {
    indexTitle: "Home",
  },
  reducers: {
    setIndexNavbarTitle: (state, action) => {
      state.indexTitle = action.payload;
    },
  },
});

const data = [
  {
    title: "Cellphone",
    image: <PhoneCall size={26} weight="bold" />,
  },
  {
    title: "Laptop",
    image: <Laptop size={26} weight="bold" />,
  },
  {
    title: "Other",
    image: <Option size={26} weight="bold" />,
  },
];
const categoryTitle = [
  {
    id: 0,
    title: "TRANG CHỦ",
    tab: "/",
    path: "/",
  },
  // {
  //   id: 1,
  //   title: "SHOP",
  //   tab: "/shop",
  //   path: "/shop",
  // },
  {
    id: 2,
    title: "VỀ CHÚNG TÔI",
    tab: "AboutMe",
    path: "/about-me",
  },
  {
    id: 3,
    title: "LIÊN HỆ",
    tab: "Contact",
    path: "/contact-me",
  },
];
const categoryTitle02 = [
  {
    id: 4,
    title: "REGISTER /",
    tab: "Register",
    path: "/register",
  },
  {
    id: 5,
    title: "LOGIN",
    tab: "Login",
    path: "/login",
  },
];

export default function Navbar({ tab }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { loginSuccess } = useSelector(AccountSelector);
  // const [hasUser] = useState({
  //     name : 'tuanvo'
  // });
  const { indexTitle } = useSelector(NavbarSelector);
  const [hasUser] = useState(false);

  return (
    <div>
      <div className="bg-black hidden lg:block">
        <div className="container">
          <div className="flex">
            {/* <!-- all category --> */}
            <div className="px-8 py-4 bg-primary flex items-center cursor-pointer group relative">
              <span className="text-white">
                <List size={22} weight="bold" />
              </span>
              <span className="uppercase ml-2 font-semibold text-white">
                Tất cả các loại
              </span>

              {/* <div className="absolute left-0 top-full w-full bg-white shadow-md py-3 invisible opacity-0 group-hover:opacity-100 group-hover:visible transition duration-300 z-50 divide-y divide-gray-300 divide-dashed">
                {data.map((item, index) => (
                  <Link
                    key={index}
                    to="/shop"
                    className="px-6 py-3 flex items-center hover:bg-gray-100 transition"
                  >

                    {item.image}
                    <span className="ml-6 text-gray-600 text-sm">
                      {item.title}
                    </span>
                  </Link>
                ))}
              </div> */}
            </div>
            {/* <!-- all category end --> */}

            {/* <!-- nav menu --> */}
            <div className="flex items-center justify-between flex-grow pl-12">
              <div className="flex items-center space-x-6 text-base capitalize">
                {categoryTitle.map((item, index) => {
                  return (
                    <Link
                      onClick={() =>
                        dispatch(NavbarSlice.actions.setIndexNavbarTitle(index))
                      }
                      key={index}
                      to={item.path}
                      className={`text-gray-200 p-2 border-solid font-semibold ${
                        location.pathname === item.path
                          ? "border-b-[2px] border-primary "
                          : ""
                      } hover:text-primary transition`}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </div>
            {/* <!-- nav menu end --> */}
          </div>
        </div>
      </div>
    </div>
  );
}
