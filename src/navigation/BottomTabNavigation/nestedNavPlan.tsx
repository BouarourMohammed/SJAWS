import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WelcomeScreen } from "../../screens/Welcome";
import { PlanDetailScreen } from "../../screens/PlanDetails/Basic";

type NestedNavigationParam = {
  WelcomeScreen: React.FC;
  PlanDetailScreen: React.FC;
};
const NestedNavProfile = createNativeStackNavigator<NestedNavigationParam>();

export const NestedNavigationPlans = () => {
  return (
    <NestedNavProfile.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="WelcomeScreen"
    >
      <NestedNavProfile.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <NestedNavProfile.Screen
        name="PlanDetailScreen"
        component={PlanDetailScreen}
      />
    </NestedNavProfile.Navigator>
  );
};
