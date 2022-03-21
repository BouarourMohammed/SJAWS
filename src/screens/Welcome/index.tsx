import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { Fragment, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { create, getAllAuth } from "../../api/common";
import { COLORS } from "../../assets/colors";
import { Button } from "../../components/Button";
import { Divider } from "../../components/Divider";
import { PlanCard } from "../../components/PlanCard";
import { RootStackParamList } from "../../navigation/main";
import { useProfile } from "../../state";

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "WelcomeScreen"
>;

export const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();
  const { user } = useProfile();
  console.log(user);

  const [prices, setPrices] = useState<any[]>([]);
  const [userSubscriptions, setUserSubscriptions] = useState<any[]>([]);

  const fetchPrices = async () => {
    const { data } = await getAllAuth("prices");
    //console.log("data", data);
    setPrices(data);
  };
  useEffect(() => {
    fetchPrices();
  }, []);

  useEffect(() => {
    let result: any[] = [];
    user &&
      user?.subscriptions &&
      user?.subscriptions.map((sub) => {
        result.push(sub.plan.id);
      });
    setUserSubscriptions(result);
  }, []);

  useEffect(() => {
    const isPaused = () => {
      user &&
        user?.subscriptions &&
        user?.subscriptions?.resumes_at &&
        navigation.navigate("AccountScreen");
    };

    user && user.subscriptions && isPaused();
  }, []);

  const handleClick = async (price: any) => {
    // here we handle if already subscribed
    // console.log(userSubscriptions);

    if (userSubscriptions && userSubscriptions.includes(price.id)) {
      navigation.navigate("PlanDetailScreen", {
        type: price.nickname.toLowerCase(),
      });
      return;
    }
    if (user) {
      let priceData = { priceId: price.id };
      const { data } = await create(priceData, "create-subscription");
      window.open(data);
    } else {
      navigation.navigate("SignUpScreen");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {!user?._id && (
        <View>
          <Text style={[styles.title, { marginTop: "15%" }]}> SJAWS </Text>
          <Text style={styles.title}> MERN STACK </Text>
          <Text style={styles.subTitle}>GEO Anti Spoofing Alert System</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              marginBottom: 20,
            }}
          >
            <Button
              title="Sign In"
              variant="TYPE2"
              style={{ width: "40%" }}
              onPress={() => navigation.navigate("LoginScreen")}
            />
            <Button
              title="Sign Up"
              variant="TYPE2"
              style={{ width: "40%" }}
              onPress={() => navigation.navigate("SignUpScreen")}
            />
          </View>
          <Divider />
        </View>
      )}

      {!prices && <ActivityIndicator size={"large"} color={COLORS.blue} />}
      {prices && (
        <Fragment>
          <Text style={[styles.title, { marginTop: user?._id ? "20%" : 20 }]}>
            Explore the right plan for your business
          </Text>
          <Text style={styles.subTitle}>
            Choose a plan that suite you best!
          </Text>
        </Fragment>
      )}
      {prices &&
        prices.map((price) => (
          <PlanCard
            key={price.id}
            price={price}
            userSubscriptions={userSubscriptions}
            handleSubscription={() => handleClick(price)}
            style={{ marginBottom: 15 }}
          />
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});
