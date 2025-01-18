import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import AuthContextProvider from "./context/AuthContextProvider";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <HelmetProvider>
        <div className="mx-auto max-w-screen-2xl">
          <RouterProvider router={router} />
        </div>
      </HelmetProvider>
    </AuthContextProvider>
  </StrictMode>
);
