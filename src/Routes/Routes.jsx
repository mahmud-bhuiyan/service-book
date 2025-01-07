import { createBrowserRouter } from "react-router-dom";
import AuthPage from "../pages/Auth/AuthPage";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <AuthPage formType="login" />,
      },
      {
        path: "register",
        element: <AuthPage formType="register" />,
      },
      {
        path: "forgot-password",
        element: <AuthPage formType="forgotPassword" />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);
