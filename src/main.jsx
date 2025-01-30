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
            <RouterProvider router={router} />
          <ToastContainer />
        </HelmetProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
