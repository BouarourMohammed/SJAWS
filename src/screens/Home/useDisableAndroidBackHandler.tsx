import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { BackHandler } from "react-native";

export const useDisableAndroidBackHandler = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [clickCount, setClickCount] = useState(0);

  const handler = useCallback(() => {
    setClickCount(clickCount + 1);
    if (clickCount >= 1) BackHandler.exitApp();
    setTimeout(() => setClickCount(0), 800);
    return true;
  }, [clickCount]);

  useEffect(() => {
    isFocused
      ? BackHandler.addEventListener("hardwareBackPress", handler)
      : BackHandler.removeEventListener("hardwareBackPress", handler);
    return () => BackHandler.removeEventListener("hardwareBackPress", handler);
  }, [handler, navigation, isFocused, clickCount]);
};
