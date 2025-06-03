import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/Forgotpassword";
import SignUp from "../pages/SignUp";
import Admin from "../pages/Admin";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProducts from "../pages/SearchProducts";
import SearchByImage from "../pages/SearchByImage";
import Profile from "../pages/Profile";
import AllOrders from "../pages/AllOrders";
import About from "../pages/About";
import Support from "../pages/Support";
import Contact from "../pages/Contact";
import Promotions from "../pages/Promotions";
import AdminStatistics from "../pages/Statistics";
import ChangePassword from "../pages/ChangePassword";
import ResetPassword from "../pages/ResetPassword";
import ViewOrders from "../pages/ViewOrders";
import Notification from "../pages/Notification";
import OrderHistory from "../pages/OrderHistory";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />
      },
      {
        path: "sign-up",
        element: <SignUp />
      },
      {
        path: "product/:id",
        element: <ProductDetails />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "search",
        element: <SearchProducts />
      },
      {
        path: "admin",
        element: <Admin />,
        children: [
          {
            path: "all-users",
            element: <AllUsers />
          },
          {
            path: "all-products",
            element: <AllProducts />
          },
          {
            path: "all-orders",
            element: <AllOrders />
          },
          {
            path: "Statistics",
            element: <AdminStatistics />
          },
          {
            path: "pending-orders",
            element: <Notification/>
          }
        ]
      },
      {
        path: "search-image",
        element: <SearchByImage />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "support",
        element: <Support />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "promotions",
        element: <Promotions />
      },
      {
        path: "change-password",
        element: <ChangePassword />
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />
      },
      {
        path: "/reset-password/:token",
        element: <ResetPassword />
      },
      {
        path: "/view-orders",
        element: <ViewOrders />
      },
      {
        path: "/complete-orders",
        element: <OrderHistory/>
      }
    ]
  }
]);

export default router;
