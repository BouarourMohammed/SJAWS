import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Formik } from "formik";
import React, { Fragment } from "react";
import { StyleSheet, Text, View } from "react-native";
import { apiData } from "../../api/appinfo";
import { COLORS } from "../../assets/colors";
import {
  FailureAlert,
  LoadingAlert,
  SuccessAlert,
} from "../../components/Alerts";
import { FormSubmitButton } from "../../components/FormSubmitButton";
import { TextField } from "../../components/TextInput";
import { setAlert, useAppDispatch } from "../../state";
import { ForgotFormValidationSchema } from "./schema";

export const ForgotPasswordScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const clickSubmit = async (value: any) => {
    dispatch(setAlert(<LoadingAlert message={"Submitting"} />));
    try {
      const response = await axios({
        method: "PUT",
        url: `${apiData.REACT_APP_API}/forgot-password`,
        data: value,
      });
      dispatch(setAlert(<SuccessAlert message={response.data.message} />));
      // navigation.navigate("LoginScreen");
    } catch (error: any) {
      dispatch(setAlert(<FailureAlert message={error.response.data.error} />));
      // saving error
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          email: "subs@subs.com",
        }}
        onSubmit={clickSubmit}
        enableReinitialize
        validationSchema={ForgotFormValidationSchema}
      >
        <Fragment>
          <Text style={styles.title}>Signin</Text>
          <Text style={styles.subTitle}>Email</Text>
          <TextField
            placeholder={"Email"}
            name={"email"}
            style={{ marginBottom: 20, paddingLeft: 16 }}
          />
          <FormSubmitButton
            textStyle={{ color: COLORS.white }}
            style={{
              backgroundColor: COLORS.blue,
              borderColor: COLORS.blue,
              marginRight: "auto",
              paddingHorizontal: 20,
            }}
            title={"Request password reset link"}
          />
        </Fragment>
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.white,
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 20,
    alignSelf: "center",
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 15,
  },
});
