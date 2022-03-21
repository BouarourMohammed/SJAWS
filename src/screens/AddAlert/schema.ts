import * as Yup from "yup";

export const PointAlertFormValidationSchema = () => {
  return Yup.object().shape({
    long: Yup.string().required("Longitude is required"),
    lat: Yup.string().required("Latitude is required"),
    radius: Yup.string().required("Radius is required"),
  });
};

export const PolygonAlertFormValidationSchema = () => {
  return Yup.object().shape({
    points: Yup.array().of(
      Yup.object().shape({
        longitude: Yup.number().required("Longitude is required"),
        latitude: Yup.number().required("Latitude is required"),
      })
    ),
  });
};
