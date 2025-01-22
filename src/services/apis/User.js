import { axiosNonSecureInstance, axiosSecureInstance } from "../../utils/axios";
import handleApiError from "../../utils/handleApiError";

// =============================================
//                    register
// =============================================
export const registerUser = async (userData) => {
  try {
    const response = await axiosNonSecureInstance.post(
      "/users/register",
      userData
    );

    const { success, message, data } = response.data;

    if (success && data && data.token) {
      localStorage.setItem("userToken", data.token);
    }

    return { success, message, data };
  } catch (error) {
    const errorMessage = handleApiError(error);
    return { success: false, message: errorMessage, data: null };
  }
};

// =============================================
//                      login
// =============================================
export const userLogin = async (credentials) => {
  try {
    const response = await axiosNonSecureInstance.post(
      "/users/login",
      credentials
    );

    const { success, message, data } = response.data;

    if (data && data?.token) {
      localStorage.setItem("userToken", data.token);
    }

    return { success, message, data };
  } catch (error) {
    const errorMessage = handleApiError(error);
    return { success: false, message: errorMessage, data: null };
  }
};

// =============================================
//                  google sign-in
// =============================================
export const signInWithGoogle = async (userData) => {
  try {
    const response = await axiosNonSecureInstance.post(
      "/users/google-signin",
      userData
    );

    const { success, message, data } = response.data;

    if (success && data && data.token) {
      localStorage.setItem("userToken", data.token);
    }

    return { success, message, data };
  } catch (error) {
    const errorMessage = handleApiError(error);
    return { success: false, message: errorMessage, data: null };
  }
};

// =============================================
//                     logout
// =============================================
export const userLogout = async () => {
  try {
    // Simulate an asynchronous operation
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Clear the token from localStorage
    localStorage.removeItem("userToken");

    // Return a success status
    return { success: true };
  } catch (error) {
    throw error.response?.data?.msg || "Logout failed";
  }
};

// =============================================
//                  user details
// =============================================
export const getUserProfile = async () => {
  try {
    const response = await axiosSecureInstance.get("/users/profile");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// =============================================
//                  reset password
// =============================================
export const resetPassword = async (email) => {
  try {
    const response = await axiosNonSecureInstance.post(
      "/users/reset-password",
      { email }
    );

    const { success, message } = response.data;

    return { success, message };
  } catch (error) {
    const errorMessage = handleApiError(error);
    return { success: false, message: errorMessage };
  }
};
