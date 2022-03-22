import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { Formik } from "formik";
import React, { Fragment, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../assets/colors";
import { FormSubmitButton } from "../../components/FormSubmitButton";
import { PasswordField } from "../../components/PasswordField";
import { TextField } from "../../components/TextInput";
import {
  clearAlert,
  clearProfile,
  setAlert,
  setProfile,
  useProfile,
} from "../../state";
import { ProfileFormValidationSchema } from "./schema";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiData } from "../../api/appinfo";
import { useDispatch } from "react-redux";
import { Button } from "../../components/Button";
import {
  FailureAlert,
  LoadingAlert,
  SuccessAlert,
} from "../../components/Alerts";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/main";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ProfileScreen"
>;

export const ProfileScreen: React.FC = () => {
  const { user } = useProfile();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const dispatch = useDispatch();

  const signout = useCallback(async () => {
    try {
      dispatch(setAlert(<LoadingAlert message={"Signing Out"} />));
      dispatch(clearProfile());
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      dispatch(clearAlert());
      navigation.popToTop();
      navigation.navigate("WelcomeScreen");
    } catch (error) {
      console.log(error);
      dispatch(setAlert(<FailureAlert message={"Signing Out Problem"} />));
    }
  }, []);

  const clickSubmit = async (values: any) => {
    try {
      dispatch(setAlert(<LoadingAlert />));
      const token = await AsyncStorage.getItem("token");
      console.log(
        `${apiData.REACT_APP_API}/${
          user?.role === "admin" ? "admin" : "user"
        }/update`
      );

      const fetchedData = await axios({
        method: "PUT",
        url: `${apiData.REACT_APP_API}/${
          user?.role === "admin" ? "admin" : "user"
        }/update`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { name: values.name, password: values.password },
      });
      console.log("PRIVATE PROFILE UPDATE SUCCESS", fetchedData);
      const newUser = {
        ...user,
        name: values.name,
        password: values.password,
      };
      console.log("newUser ::");
      console.log(newUser);

      // update AsyncStorage
      await AsyncStorage.setItem("user", JSON.stringify(newUser));
      // dispatch the new user
      dispatch(setProfile(newUser));
      dispatch(setAlert(<SuccessAlert />));
      // toast.success("Profile updated successfully");
    } catch (error) {
      dispatch(setAlert(<FailureAlert />));
      console.log("PRIVATE PROFILE UPDATE ERROR", error);
      //toast.error(error.response.data.error);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          role: user?.role,
          name: user?.name,
          email: user?.email,
          password: "",
        }}
        onSubmit={clickSubmit}
        enableReinitialize
        validationSchema={ProfileFormValidationSchema}
      >
        <Fragment>
          <Text style={styles.title}>Admin</Text>
          <Text style={{ fontSize: 22, marginBottom: 20, alignSelf: "center" }}>
            Profile update
          </Text>
          <Text style={styles.subTitle}>Role</Text>
          <TextField
            placeholder={"Role"}
            name={"role"}
            editable={false}
            style={{ marginBottom: 20, paddingLeft: 16 }}
          />
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
            editable={false}
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
              title="Log Out"
              onPress={signout}
              variant="TYPE1"
              style={{ paddingHorizontal: 20 }}
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
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 5,
    alignSelf: "center",
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 15,
  },
});
