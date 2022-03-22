import * as Yup from "yup";

export const PointAlertFormValidationSchema = () => {
  return Yup.object().shape({
    long: Yup.number()
      .typeError("Longitude must be a number")
      .required("Longitude is required")
      .max(90, "Longitude must be less then or equal to 90")
      .min(-90, "Longitude must be greater then or equal to 90"),
    lat: Yup.number()
      .typeError("Latitude must be a number")
      .required("Latitude is required")
      .max(90, "Latitude must be less then or equal to 90")
      .min(-90, "Latitude must be greater then or equal to 90"),
    radius: Yup.number()
      .required("Radius is required")
      .typeError("Radius must be a number"),
  });
};

export const isNotValid = (value: number[][]) => {
  return value.some((element) => {
    if (isNaN(Number(element[0])) || isNaN(Number(element[1]))) {
      return true;
    }
  });
};

export const isNotCoordinate = (value: number[][]) => {
  return value.some((element) => {
    if (
      Number(element[0]) > 90 ||
      Number(element[0]) < -90 ||
      Number(element[1]) > 90 ||
      Number(element[1]) < -90
    ) {
      return true;
    }
  });
};
