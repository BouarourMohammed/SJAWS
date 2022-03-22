import moment from "moment";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { getAllAuth } from "../../api/common";
import { SubscriptionIcon } from "../../assets/icons";
import { Divider } from "../../components/Divider";
import { SubscriptionsCard } from "../../components/SubscriptionsCard";

export const AccountScreen: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const getSubscriptions = async () => {
    const fetchedData = await getAllAuth("subscriptions");
    // console.log("subs => ", fetchedData?.data?.data);
    setSubscriptions(fetchedData?.data?.data);
  };

  useEffect(() => {
    getSubscriptions();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 30 }}>
      <SubscriptionIcon style={{ alignSelf: "center", marginTop: 10 }} />
      <Text style={styles.title}> Subscriptions </Text>
      <Divider />
      {subscriptions.length === 0 && (
        <Text style={styles.title}>
          No subscriptions - Are you where you think you are?
        </Text>
      )}
      {subscriptions &&
        subscriptions.length > 0 &&
        subscriptions.map((sub, index) => (
          <SubscriptionsCard
            key={index}
            type={sub?.plan?.nickname}
            price={(sub?.plan?.amount / 100).toLocaleString("en-US", {
              style: "currency",
              currency: sub?.plan?.currency,
            })}
            status={sub?.status}
            card={sub?.default_payment_method?.card?.last4}
            period={moment(sub?.current_period_end * 1000)
              .format("dddd, MMMM Do YYYY h:mm:ss a")
              .toString()}
            style={{ marginBottom: 20 }}
          />
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 20,
    alignSelf: "center",
  },
});
