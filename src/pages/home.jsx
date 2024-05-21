import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Feature from "../components/Feature";
import Category from "../components/Category";
import NewArrival from "../components/NewArrival";
import Adsection from "../components/Adsection";
import RecomendSection from "../components/RecomendSection";
import MobileArrival from "../components/MobileArrival";
import CountDownCoupon from "../components/CountDownCoupon";
import { AccountReducer } from "../redux/Reducers/Account";
import { useDispatch } from "react-redux";

export default function Home() {
  // const dispatch = useDispatch();
  // useEffect(async () => {
  //   const test = await dispatch(AccountReducer.actions.loginRequest(dataInput));
  // }, []);
  return (
    <div>
      <Banner />
      <Feature />
      {/* <Category /> */}
      <NewArrival />
      <Adsection />
      {/* <RecomendSection /> */}
      {/* <CountDownCoupon /> */}
      <MobileArrival />
    </div>
  );
}
