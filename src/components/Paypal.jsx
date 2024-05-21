import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AccountReducer } from "../redux/Reducers/Account";
import { AccountSelector } from "../redux/Selectors/Account";
import { sendEmailAfterCheckout } from "../api";

export default function Paypal({ dataCheckout, infoYourOrder }) {
  const { history, userID, cartlist, checkout } = useSelector(AccountSelector);
  const time = new Date().toISOString();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let total = 5;
  for (let i = 0; i < dataCheckout.length; i++) {
    total += dataCheckout[i].price;
  }
  const paypal = useRef();
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "The order has been created",
                amount: {
                  currency_code: "CAD",
                  value: total,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          let temp = checkout;
          temp = temp.map((item, index) => {
            return {
              ...item,
              time,
            };
          });

          await dispatch(
            AccountReducer.actions.setStateForHistoryAfterConfirm(temp)
          );
          await dispatch(
            AccountReducer.actions.requestSetHistoryAfterCheckout({
              history: [...history, ...temp],
              userID,
            })
          );
          console.log("temp : ", temp);
          console.log("history : ", history);
          const email = sendEmailAfterCheckout(infoYourOrder)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => console.log(err));

          await navigate("/ordercomplete");
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);
  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
