import React, { Fragment, useCallback } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import LottieView from "lottie-react-native";
import { Feather } from "@expo/vector-icons";
import AnimationFile from "../../assets/lottie/failure.json";
import { clearAlert, useAppDispatch } from "../../state";

interface FailureAlertProps {
  message?: string;
  style?: StyleProp<ViewStyle>;
}

export const FailureAlert: React.FC<FailureAlertProps> = (props) => {
  const dispatch = useAppDispatch();
  const exitAlert = useCallback(() => {
    setTimeout(() => dispatch(clearAlert()), 3000);
  }, []);
  return (
    <AwesomeAlert
      show={true}
      useNativeDriver={true}
      closeOnTouchOutside={false}
      closeOnHardwareBackPress={false}
      contentContainerStyle={[styles.container, props.style]}
      customView={
        <Fragment>
          <Pressable
            style={styles.button}
            onPress={() => dispatch(clearAlert())}
          >
            <Feather name="x" size={30} color="black" />
          </Pressable>
          <LottieView
            source={AnimationFile}
            autoPlay
            loop={false}
            resizeMode={"cover"}
            hardwareAccelerationAndroid={true}
            renderMode={"HARDWARE"}
            style={styles.animation}
            onAnimationFinish={exitAlert}
          />
          <Text style={{ marginTop: 24, fontSize: 14, textAlign: "center" }}>
            {props.message}
          </Text>
        </Fragment>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 22,
    backgroundColor: "#f6f6fc",
    elevation: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(67, 32, 109, 0.12)",
    width: 48,
    height: 48,
    borderRadius: 24,
    alignSelf: "flex-end",
  },
  animation: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginTop: 8,
  },
});
