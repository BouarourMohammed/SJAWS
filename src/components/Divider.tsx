import React from "react";
import { StyleSheet, View } from "react-native";
import { COLORS } from "../assets/colors";

export const Divider: React.FC = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.grey,
  },
});
