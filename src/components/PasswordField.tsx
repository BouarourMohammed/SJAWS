import React, { RefObject, useCallback, useMemo, useState } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import { useField } from "formik";
import { COLORS } from "../assets/colors";
import { EyeIcon } from "../assets/icons";

interface PasswordFieldProps {
  name: string;
  placeholder: string;
  style?: StyleProp<ViewStyle> | undefined;
  testID?: string | undefined;
  accessibilityLabel?: string | undefined;
}

export const PasswordField: React.FC<PasswordFieldProps> = (props) => {
  const [showPasswordClicked, setShowPasswordClicked] = useState(true);

  const showPassword = useCallback(() => {
    setShowPasswordClicked(!showPasswordClicked);
  }, [showPasswordClicked]);

  const [field, { touched, error }, helpers] = useField<string>(props.name);

  return useMemo(
    () => (
      <View style={[styles.container, props.style]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            testID={props.testID}
            accessibilityLabel={props.accessibilityLabel}
            style={styles.inputStyle}
            onChangeText={helpers.setValue}
            secureTextEntry={showPasswordClicked}
            autoCorrect={false}
            autoCapitalize={"none"}
            allowFontScaling={false}
            placeholder={props.placeholder}
            placeholderTextColor={COLORS.grey}
            value={field.value}
          />
          <Pressable
            onPress={showPassword}
            style={{
              height: "100%",
              width: 48,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <EyeIcon darcker={showPasswordClicked} />
          </Pressable>
        </View>
        {touched && error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    ),
    [field.value, touched, error, showPasswordClicked]
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 5,
    height: 54,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  inputStyle: {
    flex: 1,
    fontSize: 16,
    height: 54,
    lineHeight: 18,
    includeFontPadding: false,
    fontWeight: "normal",
  },
  errorText: {
    fontSize: 12,
    color: COLORS.red,
  },
});
