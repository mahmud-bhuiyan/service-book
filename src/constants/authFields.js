export const AUTH_FIELDS = {
  name: {
    id: "name",
    name: "name",
    type: "text",
    placeholder: "Full Name",
    icon: "FaUser",
    validation: {
      required: "Full Name is required",
    },
  },
  email: {
    id: "email",
    name: "email",
    type: "email",
    placeholder: "Email address",
    icon: "FaEnvelope",
    validation: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    },
  },
  password: {
    id: "password",
    name: "password",
    type: "password",
    placeholder: "Password",
    icon: "FaLock",
    validation: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters",
      },
    },
  },
};

export const LOGIN_FIELDS = ["email", "password"];
export const REGISTER_FIELDS = ["name", "email", "password"];
export const FORGOT_PASSWORD_FIELDS = ["email"];
