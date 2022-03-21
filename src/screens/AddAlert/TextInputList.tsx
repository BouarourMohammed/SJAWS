import { FieldHelperProps, useField, useFormikContext } from "formik";
import React, { useCallback, useMemo } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import { COLORS } from "../../assets/colors";

type ButtonProp = {
  name: string;
  style?: StyleProp<ViewStyle>;
  count: number;
};

export type Point = {
  latitude: number;
  longitude: number;
};

export const TextInputList: React.FC<ButtonProp> = (props) => {
  const updateState = useCallback(
    (
      state: number[][],
      lang: 0 | 1,
      index: number,
      value: string,
      helpers: FieldHelperProps<number[][]>
    ) => {
      const updateState = [...state];
      updateState[index][lang] = value;
      helpers.setValue(updateState);
    },
    []
  );

  const [field, { touched, error }, helpers] = useField<Array<Array<number>>>(
    props.name
  );
  return useMemo(
    () => (
      <View style={props.style}>
        {field.value &&
          field.value.length > 0 &&
          field.value.map((item, index) => (
            <View
              key={index}
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text style={styles.subTitle}>Point Latitude</Text>
                <View style={styles.container}>
                  <TextInput
                    style={styles.inputStyle}
                    autoCorrect={false}
                    keyboardType="numeric"
                    autoCapitalize={"none"}
                    allowFontScaling={false}
                    placeholder={"Latitude"}
                    onChangeText={(value) =>
                      updateState(field.value, 0, index, value, helpers)
                    }
                    placeholderTextColor={COLORS.grey}
                    value={field.value[index][0].toString()}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.subTitle}>Point Longitude</Text>
                <View style={styles.container}>
                  <TextInput
                    style={styles.inputStyle}
                    autoCorrect={false}
                    keyboardType="numeric"
                    autoCapitalize={"none"}
                    allowFontScaling={false}
                    placeholder={"Longitude"}
                    onChangeText={(value) =>
                      updateState(field.value, 1, index, value, helpers)
                    }
                    placeholderTextColor={COLORS.grey}
                    value={field.value[index][1].toString()}
                  />
                </View>
              </View>
            </View>
          ))}
        {touched && error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    ),
    [field.value, touched, error]
  );
};

const styles = StyleSheet.create({
  subTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  errorText: {
    fontSize: 12,
    color: COLORS.red,
  },
  inputStyle: {
    fontSize: 16,
    height: 48,
    lineHeight: 18,
    includeFontPadding: false,
  },
  container: {
    borderRadius: 5,
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    marginBottom: 10,
    paddingLeft: 16,
  },
});
