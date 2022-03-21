import React, { useMemo, useState } from "react";
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { useField } from "formik";
import { COLORS } from "../assets/colors";

interface TextFieldProps {
  name: string;
  placeholder: string;
  value?: string;
  style?: StyleProp<ViewStyle> | undefined;
  keyboardType?: KeyboardTypeOptions | undefined;
  editable?: boolean;
  selectTextOnFocus?: boolean;
}

export const TextField: React.FC<TextFieldProps> = (props) => {
  const [field, { touched, error }, helpers] = useField<string>(props.name);

  return useMemo(
    () => (
      <View style={[styles.container, props.style]}>
        <TextInput
          style={styles.inputStyle}
          autoCorrect={false}
          keyboardType={props.keyboardType}
          autoCapitalize={"none"}
          allowFontScaling={false}
          placeholder={props.placeholder}
          selectTextOnFocus={props.selectTextOnFocus}
          editable={props.editable}
          onChangeText={helpers.setValue}
          placeholderTextColor={COLORS.grey}
          value={field.value}
          {...props.others}
        />
        {touched && error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    ),
    [field.value, touched, error, props.value]
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  inputStyle: {
    fontSize: 16,
    height: 48,
    lineHeight: 18,
    includeFontPadding: false,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.red,
  },
});
