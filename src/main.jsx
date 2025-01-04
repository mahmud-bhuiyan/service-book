import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./pages/Auth/AuthPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
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
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
