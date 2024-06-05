import routes from "../configs/routes";
// Pages
import home from "../pages/home";
import Shop from "../pages/Shop";
import Detail from "../pages/Detail";
import History from "../pages/History";
import Cart from "../pages/Cart";
import Account from "../pages/Account";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Checkout from "../pages/Checkout";
import OrderComplete from "../pages/OrderComplete";
import Contact from "../pages/Contact";
import AboutMe from "../pages/AboutMe";

export const publicRoutes = [
  { path: routes.home, component: home, title: "Home", isShowBreadcrum: false },
  { path: routes.shop, component: Shop, title: "Shop", isShowBreadcrum: true },
  {
    path: routes.detail,
    component: Detail,
    title: "Chi tiết",
    isShowBreadcrum: true,
  },
  {
    path: routes.history,
    component: History,
    title: "History",
    isShowBreadcrum: true,
  },
  {
    path: routes.cart,
    component: Cart,
    title: "Yêu thích",
    isShowBreadcrum: true,
  },
  {
    path: routes.account,
    component: Account,
    title: "Account",
    isShowBreadcrum: true,
  },
  {
    path: routes.login,
    component: Login,
    title: "Login",
    isShowBreadcrum: true,
  },
  {
    path: routes.register,
    component: Register,
    title: "Register",
    isShowBreadcrum: true,
  },
  {
    path: routes.checkout,
    component: Checkout,
    title: "Đặt hàng",
    isShowBreadcrum: true,
  },
  {
    path: routes.ordercomplete,
    component: OrderComplete,
    title: "Ordercomplete",
    isShowBreadcrum: true,
  },
  {
    path: routes.contact_me,
    component: Contact,
    title: "Liên hệ",
    isShowBreadcrum: true,
  },
  {
    path: routes.about_me,
    component: AboutMe,
    title: "Về chúng tôi",
    isShowBreadcrum: true,
  },
];

export const privateRoutes = [];
