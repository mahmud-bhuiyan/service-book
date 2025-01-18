export const AUTH_FIELDS = {
  loginCred: {
    id: "loginCred",
    name: "loginCred",
    type: "text",
    placeholder: "Email or Mobile No or Username",
    icon: "FaUser",
    validation: {
      required: "Please enter your Email or Mobile No or Username",
    },
  },
  userName: {
    id: "userName",
    name: "userName",
    type: "text",
    placeholder: "Username",
    icon: "FaUser",
    validation: {
      required: "Username is required",
    },
  },
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
  phone: {
    id: "phone",
    name: "phone",
    type: "text",
    placeholder: "Phone Number",
    icon: "FaPhoneAlt",
    validation: {
      required: "Phone Number is required",
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

export const LOGIN_FIELDS = ["loginCred", "password"];
export const REGISTER_FIELDS = [
  "name",
  "userName",
  "email",
  "phone",
  "password",
];
export const FORGOT_PASSWORD_FIELDS = ["email"];
