import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
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
import { Button } from "../../components/Button";
import { FormSubmitButton } from "../../components/FormSubmitButton";
import { PasswordField } from "../../components/PasswordField";
import { TextField } from "../../components/TextInput";
import { RootStackParamList } from "../../navigation/main";
import { clearAlert, setAlert, useAppDispatch } from "../../state";
import { SignUpFormValidationSchema } from "./schema";

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SignUpScreen"
>;

export const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const dispatch = useAppDispatch();

  const clickSubmit = async (value: any) => {
    dispatch(setAlert(<LoadingAlert message={"Submitting"} />));
    console.log(value);
    console.log(`${apiData.REACT_APP_API}/signin`);
    try {
      const response = await axios({
        method: "POST",
        url: `${apiData.REACT_APP_API}/signup`,
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
          name: "TestName",
          email: "TestName@gmail.com",
          password: "12345678",
        }}
        onSubmit={clickSubmit}
        enableReinitialize
        validationSchema={SignUpFormValidationSchema}
      >
        <Fragment>
          <Text style={styles.title}>Signin</Text>
          <Text style={styles.subTitle}>Name</Text>
          <TextField
            placeholder={"Name"}
            name={"name"}
            style={{ marginBottom: 20, paddingLeft: 16 }}
          />
          <Text style={styles.subTitle}>Email</Text>
          <TextField
            placeholder={"Email"}
            name={"email"}
            style={{ marginBottom: 20, paddingLeft: 16 }}
          />
          <Text style={styles.subTitle}>Password</Text>
          <PasswordField
            placeholder={"Password"}
            name={"password"}
            style={{ marginBottom: 20, paddingLeft: 16 }}
          />
          <View style={{ flexDirection: "row" }}>
            <FormSubmitButton
              textStyle={{ color: COLORS.white }}
              style={{
                backgroundColor: COLORS.blue,
                borderColor: COLORS.blue,
                marginRight: "auto",
                paddingHorizontal: 20,
              }}
              title={"Submit"}
            />
            <Button
              title="Forgot Password"
              variant="TYPE1"
              onPress={() => navigation.navigate("ForgotPasswordScreen")}
            />
          </View>
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
