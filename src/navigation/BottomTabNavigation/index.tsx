import React, { useCallback } from "react";
import { HomeScreen, SignUpScreen, LoginScreen } from "../../screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AddIcon,
  AlertsIcon,
  HomeIcon,
  MapIcon,
  PlanIcon,
  SettingIcon,
  UserIcon,
} from "../../assets/icons";
import { StyleSheet } from "react-native";
import { COLORS } from "../../assets/colors";
import { AddAlertScreen } from "../../screens/AddAlert";
import { AlertScreen } from "../../screens/Alerts";
import { ProfileScreen } from "../../screens/Profile";
import { MapScreen } from "../../screens/Map";
import { WelcomeScreen } from "../../screens/Welcome";
import { useProfile } from "../../state";
import { AccountScreen } from "../../screens/Account";
import { NestedNavigationPlans } from "./nestedNavPlan";
import { NestedNavigationAccount } from "./nestedNavPlan copy";

export type BottomTabNavigationParam = {
  HomeScreen: React.FC;
  AddAlertScreen: {
    type?: "points" | "polygons";
    id?: string;
  };
  AlertScreen: React.FC;
  ProfileScreen: React.FC;
  MapScreen: React.FC;
  PlanNav: React.FC;
  AccountNav: React.FC;
  AccountScreen: React.FC;
};

const Tab = createBottomTabNavigator<BottomTabNavigationParam>();

export const BottomTabNavigation: React.FC = () => {
  const PlanNav = useCallback(() => <NestedNavigationPlans />, []);
  const AccountNav = useCallback(() => <NestedNavigationAccount />, []);

  const { user } = useProfile();
  const admin: boolean = user?.role === "admin";
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.container,
        tabBarActiveTintColor: COLORS.yellow,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: () => true,
          tabBarIcon: ({ color, size, focused }) => (
            <HomeIcon fill={focused ? COLORS.yellow : COLORS.white} />
          ),
        }}
      />

      <Tab.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MapIcon fill={focused ? COLORS.yellow : COLORS.white} />
          ),
          tabBarLabel: () => true,
        }}
      />

      {!admin && (
        <Tab.Screen
          name="PlanNav"
          component={PlanNav}
          options={{
            tabBarLabel: () => true,
            tabBarIcon: ({ color, size, focused }) => (
              <PlanIcon fill={focused ? COLORS.yellow : COLORS.white} />
            ),
          }}
        />
      )}
      {admin && (
        <Tab.Screen
          name="AddAlertScreen"
          component={AddAlertScreen}
          options={{
            tabBarLabel: () => true,
            tabBarIcon: ({ color, size, focused }) => (
              <AddIcon fill={focused ? COLORS.yellow : COLORS.white} />
            ),
          }}
        />
      )}
      {admin && (
        <Tab.Screen
          name="AlertScreen"
          component={AlertScreen}
          options={{
            tabBarLabel: () => true,
            tabBarIcon: ({ color, size, focused }) => (
              <AlertsIcon fill={focused ? COLORS.yellow : COLORS.white} />
            ),
          }}
        />
      )}

      {!admin && (
        <Tab.Screen
          name="AccountNav"
          component={AccountNav}
          options={{
            tabBarLabel: () => true,
            tabBarIcon: ({ color, size, focused }) => (
              <SettingIcon fill={focused ? COLORS.yellow : COLORS.white} />
            ),
          }}
        />
      )}
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: () => true,
          tabBarIcon: ({ color, size, focused }) => (
            <UserIcon fill={focused ? COLORS.yellow : COLORS.white} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
  },
});
