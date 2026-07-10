export const handleApiError = (error) => {
  // Network errors
  if (!error.response) {
    return {
      message: "Network error. Please check your internet connection.",
      status: null,
    };
  }

  const { status, data } = error.response;

  // Handle different status codes
  switch (status) {
    case 400:
      return {
        message: data.message || "Bad request. Please check your input.",
        status: 400,
        errors: data.errors,
      };
    case 401:
      return {
        message: data.message || "Unauthorized. Please login again.",
        status: 401,
      };
    case 403:
      return {
        message: data.message || "Forbidden. You do not have permission.",
        status: 403,
      };
    case 404:
      return {
        message: data.message || "Resource not found.",
        status: 404,
      };
    case 422:
      return {
        message: data.message || "Validation failed.",
        status: 422,
        errors: data.errors,
      };
    case 429:
      return {
        message: data.message || "Too many requests. Please try again later.",
        status: 429,
      };
    case 500:
    case 502:
    case 503:
      return {
        message: data.message || "Server error. Please try again later.",
        status: status,
      };
    default:
      return {
        message: data.message || "An unexpected error occurred.",
        status: status,
      };
  }
};

// Utility function to handle API errors with toast notifications
export const handleApiErrorWithToast = (error, showToast) => {
  const errorDetails = handleApiError(error);

  if (showToast) {
    showToast(errorDetails.message, "error");
  }

  return errorDetails;
};
