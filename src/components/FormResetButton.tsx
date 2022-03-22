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
import { Button } from "./Button";

interface FormResetButtonProps {
  title: string;
  style?: StyleProp<ViewStyle> | undefined;
  textStyle?: StyleProp<TextStyle> | undefined;
  onPress?: () => void | undefined;
}

export const FormResetButton: React.FC<FormResetButtonProps> = (props) => {
  const resetForm: () => void = useFormikContext().resetForm;

  return (
    <Button
      title={props.title}
      variant="TYPE1"
      style={props.style}
      onPress={() => {
        props.onPress ? props.onPress() : null;
        resetForm();
      }}
    />
  );
};
