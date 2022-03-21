import { useNavigation } from "@react-navigation/native";
import React, { Fragment } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { COLORS } from "../assets/colors";
import { useProfile } from "../state";
import { Button } from "./Button";

type PlanCardProp = {
  price: any;
  userSubscriptions: any;
  handleSubscription: any;
  style?: StyleProp<ViewStyle>;
};

export const PlanCard: React.FC<PlanCardProp> = (props) => {
  const navigation = useNavigation();
  const { user } = useProfile();

  const dynamicDescription = () => {
    if (props.price.nickname === "BASIC") {
      return "Email only Alert ";
    } else if (props.price.nickname === "STANDARD") {
      return "Email and Text based Alerts";
    } else if (props.price.nickname === "PREMIUM") {
      return "20 exclusice stocks";
    }
  };

  const buttonStyle = () => {
    return props.price.nickname === "BASIC" ? "TYPE1" : "TYPE2";
  };

  /*const headerStyle = () => {
    return price.nickname === "PREMIUM" ? "bg-danger text-light" : "";
  };*/

  const buttonText = () => {
    return user ? "Buy the plan" : "Sign up";
  };

  return (
    <View style={props.style}>
      <View
        style={[
          styles.Container,
          {
            borderBottomWidth: 0,
            backgroundColor: COLORS.lightGrey,
            borderTopRightRadius: 5,
            borderTopLeftRadius: 5,
          },
        ]}
      >
        <Text style={styles.title}>{props.price.nickname}</Text>
      </View>
      <View
        style={[
          styles.Container,
          {
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
          },
        ]}
      >
        <Text style={styles.priceText}>
          $
          {Number(
            (props.price.unit_amount / 100).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })
          ).toFixed(2)}
          <Text style={styles.month}> /mo </Text>
        </Text>
        <Text style={styles.details}>{dynamicDescription()}</Text>
        <Text style={styles.details}>Help center access</Text>
        <Button
          title={
            props.userSubscriptions &&
            props.userSubscriptions.includes(props.price.id)
              ? "Access plan"
              : buttonText()
          }
          variant={buttonStyle()}
          style={{ width: "100%", marginTop: 15 }}
          onPress={props.handleSubscription}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  priceText: {
    fontSize: 30,
  },
  month: {
    fontSize: 16,
    color: COLORS.grey,
    fontWeight: "600",
  },
  title: {
    fontSize: 20,
  },
  details: {
    fontSize: 18,
    textAlign: "center",
    paddingTop: 10,
  },
});
