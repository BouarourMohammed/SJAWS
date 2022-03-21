import * as Yup from "yup";

export const SignUpFormValidationSchema = () => {
  return Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum."),
    //.matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });
};
