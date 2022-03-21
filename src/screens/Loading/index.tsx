import React from "react";
import { StyleSheet, Text } from "react-native";
import { useBootstrapApp } from "./useBootstrapApp";

export const LoadingScreen: React.FC = () => {
  // add loading animation or image
  useBootstrapApp();
  return <Text> </Text>;
};

const styles = StyleSheet.create({});
