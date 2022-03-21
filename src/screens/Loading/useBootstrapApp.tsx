import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect } from "react";

import { setProfile, useAppDispatch } from "../../state";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/main";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { apiData } from "../../api/appinfo";
import { useDispatch } from "react-redux";

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "WelcomeScreen"
>;

export const useBootstrapApp = (): void => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();
  const dispatch = useDispatch();

  const bootstrapApp = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userData = await AsyncStorage.getItem("user");
      const user = userData ? JSON.parse(userData) : userData;
      // We try to fetch the user profile in order to validate if the token stills valid

      const fetchedData = await axios({
        method: "GET",
        url: `${apiData.REACT_APP_API}/user/${user?._id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (fetchedData?.data) {
        dispatch(setProfile(user));
        navigation.navigate("BottomTabNavigation");
      } else {
        navigation.navigate("WelcomeScreen");
      }
      //console.log(store.data.store);
      //dispatch(setProfile(store.data.store));
      // The registered token is still valid, we will redirect to the home screen

      // navigation.navigate("BottomTabNavigation");
    } catch (e) {
      console.log(JSON.stringify(e));
      navigation.navigate("WelcomeScreen");
    }
  }, [navigation]);

  useEffect(() => {
    void bootstrapApp();
  }, [bootstrapApp]);
};
