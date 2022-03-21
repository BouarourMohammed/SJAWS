import React from "react";
import { HomeScreen, LoginScreen, SignUpScreen } from "../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabNavigation } from "./BottomTabNavigation";
import { WelcomeScreen } from "../screens/Welcome";
import { ForgotPasswordScreen } from "../screens/ForgotPassword";
import { MapScreen } from "../screens/Map";
import { LoadingScreen } from "../screens/Loading";

export type RootStackParamList = {
  LoadingScreen: undefined;
  WelcomeScreen: undefined;
  LoginScreen: undefined;
  ForgotPasswordScreen: undefined;
  AlertScreen: undefined;
  SignUpScreen: undefined;
  MapScreen: undefined;
  BottomTabNavigation: undefined;
  AddAlertScreen: {
    type?: "points" | "polygons";
    id?: string;
  };
  ProfileScreen: undefined;
  AccountScreen: undefined;
  PlanDetailScreen: {
    type?: "basic" | "premium" | "standard";
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={"LoadingScreen"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />

      <Stack.Screen
        name="BottomTabNavigation"
        component={BottomTabNavigation}
      />
    </Stack.Navigator>
  );
};
