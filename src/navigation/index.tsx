import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React, { useMemo } from "react";
import { COLORS } from "../assets/colors";
import { useAppSelector } from "../state";
import { RootStack } from "./main";

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.white,
  },
};

export const AppContainer: React.FC = () => {
  const alert = useAppSelector((state) => state.alertSlice.alert);
  return (
    <NavigationContainer theme={navTheme}>
      {alert}
      {useMemo(
        () => (
          <RootStack />
        ),
        []
      )}
    </NavigationContainer>
  );
};
