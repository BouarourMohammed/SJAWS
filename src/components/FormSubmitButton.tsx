import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useFormikContext } from "formik";
import { COLORS } from "../assets/colors";
import { Button } from "./Button";

interface FormSubmitButtonProps {
  title: string;
  style?: StyleProp<ViewStyle> | undefined;
  textStyle?: StyleProp<TextStyle> | undefined;
  onPress?: () => void | undefined;
}

export const FormSubmitButton: React.FC<FormSubmitButtonProps> = (props) => {
  const handleSubmit: () => void = !props.onPress
    ? useFormikContext().handleSubmit
    : props.onPress;
  return (
    <Button
      title={props.title}
      variant="TYPE2"
      style={props.style}
      onPress={handleSubmit}
    />
  );
};
