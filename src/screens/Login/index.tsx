import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Formik } from "formik";
import React, { Fragment } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../assets/colors";
import { Button } from "../../components/Button";
import { FormSubmitButton } from "../../components/FormSubmitButton";
import { PasswordField } from "../../components/PasswordField";
import { TextField } from "../../components/TextInput";
import { LoginFormValidationSchema } from "./schema";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearAlert, setAlert, setProfile, useAppDispatch } from "../../state";
import { FailureAlert, LoadingAlert } from "../../components/Alerts";
import { apiData } from "../../api/appinfo";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/main";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "LoginScreen"
>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const dispatch = useAppDispatch();

  const clickSubmit = async (value: any) => {
    dispatch(setAlert(<LoadingAlert message={"submitting"} />));
    //  console.log(value);
    console.log(`${apiData.REACT_APP_API}/signin`);
    try {
      const response = await axios({
        method: "POST",
        url: `${apiData.REACT_APP_API}/signin`,
        data: value,
      });
      if (response) {
        await AsyncStorage.setItem("token", response?.data?.token);
        // console.log(response?.data?.token);
        dispatch(setProfile(response?.data?.user));
        await AsyncStorage.setItem(
          "user",
          JSON.stringify(response?.data?.user)
        );
      }
      dispatch(clearAlert());
      navigation.navigate("BottomTabNavigation");
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
          email: "admin@admin.com",
          password: "12345678",
        }}
        onSubmit={clickSubmit}
        enableReinitialize
        validationSchema={LoginFormValidationSchema}
      >
        <Fragment>
          <Text style={styles.title}>Signin</Text>
          <Text style={styles.subTitle}>Email</Text>
          <TextField
            placeholder={"email"}
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
