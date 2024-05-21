import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { ArrowRight, BellRinging } from "phosphor-react";
import { Link } from "react-router-dom";

export default function CountDownCoupon() {
  const { ref: myRef, inView: myElementIsVisible } = useInView();
  // console.log(myElementIsVisible);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [count, setCount] = useState(0);
  // console.log('isFirstTime', isFirstTime, count);
  useEffect(() => {
    if (count === 0) {
      if (myElementIsVisible) {
        setCount((pre) => pre + 1);
        setIsFirstTime(true);
      }
    } else {
      setIsFirstTime(false);
    }
  }, [myElementIsVisible]);

  return (
    <div
      ref={myRef}
      style={{
        backgroundImage:
          "url(https://i.pinimg.com/564x/73/1e/8d/731e8da39fb57d27428bb19ce2b4ab42.jpg)",
      }}
      className="container bg-center bg-no-repeat bg-cover text-white"
    >
      <div
        style={{ maxWidth: "1170px" }}
        className="md:m-auto text-center md:mx-10 mx-0"
      >
        <div className="pt-10 pb-32">
          <div className="my-20 flex justify-center items-center md:gap-x-4 gap-x-1 text-5xl font-bold">
            <h1 className="inline">FLASH SALE</h1>
            <BellRinging size={44} weight="fill" className=" text-primary" />
          </div>
          {/* List item */}
          <div className="flex md:flex-row flex-col md:items-center gap-y-4">
            {/* Item */}
            <div className="flex flex-col md:w-1/2 md:p-7 text-center ">
              {(isFirstTime && myElementIsVisible && (
                <CountUp
                  className="text-8xl text-primary mb-5"
                  end={127}
                  duration="2"
                  separator=" "
                />
              )) || <p className="text-8xl text-primary mb-5">127</p>}

              <p className="text-2xl font-bold mb-4">CUSTOMER</p>
              <p className="text-lg mb-10">
                The customer has pre-ordered the iphone 14 PROMAX.
              </p>
              <div>
                <Link
                  to={"/shop"}
                  className="bg-white border text-primary border-primary px-8 py-3 font-medium rounded-md uppercase hover:bg-primary
                            hover:text-white transition"
                >
                  Shop now
                </Link>
              </div>
            </div>
            <div className="flex flex-col md:w-1/2 md:p-7 text-center ">
              {(isFirstTime && myElementIsVisible && (
                <CountUp
                  className="text-8xl text-primary mb-5"
                  end={120}
                  duration="2"
                  separator=" "
                />
              )) || <p className="text-8xl text-primary mb-5">120</p>}
              <p className="text-2xl font-bold mb-4">CUSTOMER</p>
              <p className="text-lg mb-10">
                The customer has pre-ordered the Macbook Air 2022.
              </p>
              <div>
                <Link
                  to={"/shop"}
                  className="bg-white border text-primary border-primary px-8 py-3 font-medium rounded-md uppercase hover:bg-primary
                            hover:text-white transition"
                >
                  Shop now
                </Link>
              </div>
            </div>
            {/* <div className="flex flex-col md:w-1/3 md:p-7 text-left ">
                            {(isFirstTime && myElementIsVisible && (
                                <CountUp
                                    className="text-8xl text-yellow-500 mb-5"
                                    end={12755}
                                    duration="2"
                                    separator=" "
                                />
                            )) || <p className="text-8xl text-yellow-500 mb-5">12755</p>}
                            <p className="text-2xl font-bold mb-4">Numbers of Volunterrs</p>
                            <p className="text-base mb-20">
                                Etiam vitae urna quis sem tempor elementum efficitur vel massa.
                            </p>
                            <ArrowRight size={32} weight="bold" />
                        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
