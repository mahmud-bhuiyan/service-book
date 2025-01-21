const handleApiError = (error) => {
  let errorMessage = "An unexpected error occurred";

  if (error.response) {
    errorMessage = error.response.data.error || "Request failed";

    switch (error.response.status) {
      case 401:
        errorMessage =
          error.response.data.error || "Unauthorized. Please log in again.";
        break;
      case 403:
        errorMessage =
          error.response.data.error ||
          "You don't have permission to perform this action.";
        break;
      case 404:
        errorMessage =
          error.response.data.error || "The requested resource was not found.";
        break;
      case 500:
        errorMessage =
          error.response.data.error ||
          "Internal server error. Please try again later.";
        break;
    }
  } else if (error.request) {
    console.error("No response received from the server");
    errorMessage =
      "No response from the server. Please check your internet connection.";
  } else {
    console.error("Error setting up the request:", error.message);
    errorMessage = "Error setting up the request. Please try again.";
  }
  return errorMessage;
};

export default handleApiError;
