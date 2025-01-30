import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import AuthContextProvider from "./context/AuthContextProvider";
import { UserContextProvider } from "./context/UserContextProvider";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <HelmetProvider>
          <div className="mx-auto max-w-screen-2xl">
            <RouterProvider router={router} />
          </div>
          <ToastContainer />
        </HelmetProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
