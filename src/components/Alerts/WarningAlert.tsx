import React from "react";
import {
  Dimensions,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import LottieView from "lottie-react-native";
import { Feather } from "@expo/vector-icons";
import AnimationFile from "../../assets/lottie/warning.json";
import { COLORS } from "../../assets/colors";
import { Button } from "../Button";

interface WarningAlertProps {
  message?: string;
  subMessage?: string;
  style?: StyleProp<ViewStyle>;
  onValidate?: () => void;
  onCancel?: () => void;
}

export const WarningAlert: React.FC<WarningAlertProps> = (props) => {
  return (
    <AwesomeAlert
      show={true}
      useNativeDriver={true}
      closeOnTouchOutside={false}
      closeOnHardwareBackPress={false}
      contentContainerStyle={[styles.container, props.style]}
      customView={
        <View style={{ alignItems: "center" }}>
          <Pressable style={styles.button} onPress={props.onCancel}>
            <Feather name="x" size={25} color="black" />
          </Pressable>
          <LottieView
            source={AnimationFile}
            autoPlay
            loop={false}
            resizeMode={"cover"}
            hardwareAccelerationAndroid={true}
            renderMode={"HARDWARE"}
            style={styles.animation}
            onAnimationFinish={() => {}}
          />
          <Text style={{ marginTop: 55, fontSize: 18 }}>{props.message}</Text>
          <Text style={{ marginTop: 8, opacity: 0.5, textAlign: "center" }}>
            {props.subMessage}
          </Text>
          <Button
            title="OK"
            variant="TYPE1"
            onPress={props.onValidate}
            style={{
              marginTop: 26,
              width: Dimensions.get("screen").width * 0.7,
            }}
          />
          <Button
            title="Cancel"
            variant="TYPE2"
            style={{
              marginTop: 10,
              width: Dimensions.get("screen").width * 0.7,
            }}
            onPress={props.onCancel}
          />
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor: COLORS.white,
    elevation: 20,
    width: Dimensions.get("window").width,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  animation: {
    position: "absolute",
    width: 100,
    height: 100,
    alignSelf: "center",
  },
});
