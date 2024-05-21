import React, { useCallback, useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Navbar from "../../pages/components/Navbar";
import Breadcrum from "../../components/Breadcrum";
import { motion } from "framer-motion";
import { useViewport } from "../../hooks/useViewPort";
import { MessengerLogo, NavigationArrow } from "phosphor-react";
import { AccountSelector } from "../../redux/Selectors/Account";
import { SystemReducer } from "../../redux/Reducers/System";
import { SystemSelector } from "../../redux/Selectors/System";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import CustomizedSnackbars from "../../components/ToastMessage";
import axios from "axios";
import { CircleSpinnerOverlay } from "react-spinner-overlay";
import ChatPopup from "../../components/ChatPopup";

export default function MainLayout({
  children,
  path,
  titleIndex,
  isShowBreadcrum,
}) {
  // const { loginSuccess, AccessToken } = useSelector(AccountSelector);
  const { isError, MessageAlert, typeAlert } = useSelector(SystemSelector);
  const [message, setMessage] = useState({
    messageContent: "",
    type: "",
    isDisplay: false,
  });

  useEffect(() => {
    setMessage({
      ...message,
      messageContent: MessageAlert,
      type: typeAlert,
      isDisplay: isError,
    });
  }, [isError, MessageAlert, typeAlert]);
  let axiosJWT = axios.create();
  // const history = useNavigate();
  // useEffect(() => {
  //   if (!loginSuccess && path !== "Register") {
  //     history("/login");
  //   }
  //   // else if(loginSuccess)
  // }, [loginSuccess, path]);

  const refreshToken = async () => {
    try {
      const res = await axios.get("/auth/refresh_token", {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  // axiosJWT.interceptors.request.use(
  //   async(config) => {
  //     let date = new Date();
  //     const cookies = new Cookies();
  //     const decodedToken = jwt_decode(AccessToken);
  //     if(decodedToken.exp < date.getTime()/1000){
  //       const data = await refreshToken();
  //       await cookies.set('token',data.accesstoken,{ path: '/' });
  //     }
  //   }
  // )
  const [offset, setOffset] = useState(0);
  const { isDesktop } = useViewport();
  const { isLoading } = useSelector(SystemSelector);
  // console.log('isLoading : ',isLoading);

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [y, setY] = useState(document.scrollingElement.scrollHeight);
  const [isUp, setIsUp] = useState(true);
  const handleNavigation = useCallback(
    (e) => {
      if (y > window.scrollY) {
        setIsUp(true);
      } else if (y < window.scrollY) {
        setIsUp(false);
      }
      setY(window.scrollY);
    },
    [y]
  );
  useEffect(() => {
    window.addEventListener("scroll", handleNavigation);

    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, [handleNavigation]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);
  return (
    <div className="flex flex-col justify-center min-h-screen w-full">
      {isDesktop ? (
        <motion.div
          initial={{ opacity: 0.7, x: 0, y: 0 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ type: "spring", duration: 1 }}
          className={`${
            isUp ? "fixed h-[140px]" : "h-[0px]"
          } w-full top-0 left-0 z-[100] max-h-[140px]`}
        >
          <Header />
          <Navbar />
        </motion.div>
      ) : (
        <div className="fixed w-full top-0 left-0 z-[100] max-h-[160px] h-[140px]">
          <Header />
          <Navbar titleIndex={titleIndex} tab={path} />
        </div>
      )}
      <div className="lg:mt-[140px] mt-[100px]">
        {isShowBreadcrum && <Breadcrum tab={path} />}
        {children}
        {isLoading && (
          <>
            <CircleSpinnerOverlay
              loading={isLoading}
              overlayColor="rgb(255 172 0 / 20%)"
            />
          </>
        )}
        {/* {loading ? (
          
          ) : ({children})} */}

        <CustomizedSnackbars
          isOpen={message.isDisplay}
          title={message.messageContent}
          type={message.type}
        />

        {offset >= 400 ? (
          <div className="z-[999999]">
            <div className="fixed bottom-[150px] right-[50px] p-4 bg-primary rounded-full cursor-pointer shadow-2xl">
              <NavigationArrow
                size={24}
                weight="bold"
                className="rotate-45 animate-none text-white"
                onClick={() => {
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                }}
              />
              <ChatPopup />

              {/* <div className="absolute bottom-full right-0 mb-2  p-4 bg-primary rounded-full cursor-pointer shadow-2xl animate-bounce">
                <MessengerLogo size={24} weight="bold" className="text-white" />
              </div> */}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <Footer />
    </div>
  );
}
