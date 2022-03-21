import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { LoadingAlert } from "../../components/Alerts";
import { Button } from "../../components/Button";
import { useDisableAndroidBackHandler } from "./useDisableAndroidBackHandler";

export const HomeScreen: React.FC = () => {
  useDisableAndroidBackHandler();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={[styles.title, { marginTop: "20%" }]}> SJAWS </Text>
      <Text style={styles.title}> MERN STACK </Text>
      <Text style={styles.subTitle}>GEO Anti Spoofing Alert System</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "700",
  },
  subTitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
});
