import * as Yup from "yup";

export const ProfileFormValidationSchema = () => {
  return Yup.object().shape({
    role: Yup.string().required("password is required"),
    name: Yup.string().required("password is required"),
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: Yup.string().required("password is required"),
  });
};
