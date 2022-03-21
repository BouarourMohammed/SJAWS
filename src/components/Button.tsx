import React, { Fragment } from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import { COLORS } from "../assets/colors";

type ButtonProp = {
  variant: "TYPE1" | "TYPE2";
  title: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
};

export const Button: React.FC<ButtonProp> = (props) => {
  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor:
            props.variant === "TYPE1" ? COLORS.white : COLORS.red,
        },
        props.style,
      ]}
      onPress={props.onPress}
      android_ripple={{ radius: 100 }}
    >
      <Text
        style={[
          styles.title,
          {
            color: props.variant !== "TYPE1" ? COLORS.white : COLORS.red,
          },
          props.textStyle,
        ]}
      >
        {props.title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.red,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
});
