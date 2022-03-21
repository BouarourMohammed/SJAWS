import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PlanDetailScreen } from "../../screens/PlanDetails/Basic";
import { AccountScreen } from "../../screens/Account";

type NestedNavigationParam = {
  AccountScreen: React.FC;
  PlanDetailScreen: React.FC;
};
const NestedNavProfile = createNativeStackNavigator<NestedNavigationParam>();

export const NestedNavigationAccount = () => {
  return (
    <NestedNavProfile.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="AccountScreen"
    >
      <NestedNavProfile.Screen name="AccountScreen" component={AccountScreen} />
      <NestedNavProfile.Screen
        name="PlanDetailScreen"
        component={PlanDetailScreen}
      />
    </NestedNavProfile.Navigator>
  );
};
