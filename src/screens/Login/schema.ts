import * as Yup from "yup";

export const LoginFormValidationSchema = () => {
  return Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: Yup.string().required("password is required"),
  });
};
