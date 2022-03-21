import { RouteProp, useRoute } from "@react-navigation/native";
import React, { Fragment } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { COLORS } from "../../assets/colors";
import { RootStackParamList } from "../../navigation/main";

type PlanDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "PlanDetailScreen"
>;

export const PlanDetailScreen: React.FC = () => {
  const { params } = useRoute<PlanDetailScreenRouteProp>();
  console.log(params);

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      {params.type && params.type === "basic" && (
        <Fragment>
          <Text style={styles.title}>BASIC</Text>
          <Text style={styles.subTitle}>Our basic plan </Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Svg
              style={{ height: 10, width: 10, marginRight: 10 }}
              viewBox="-2 -2 4 4"
            >
              <Circle fill={COLORS.blue} r={2} />
            </Svg>
            <Text style={styles.details}>
              Email notification of spoofing incidence
            </Text>
          </View>
        </Fragment>
      )}

      {params.type && params.type === "standard" && (
        <Fragment>
          <Text style={styles.title}>STANDARD</Text>
          <Text style={styles.subTitle}>Our standard plan </Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Svg
              style={{ height: 10, width: 10, marginRight: 10 }}
              viewBox="-2 -2 4 4"
            >
              <Circle fill={COLORS.blue} r={2} />
            </Svg>
            <Text style={styles.details}>
              Email notification of spoofing incidence
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Svg
              style={{ height: 10, width: 10, marginRight: 10 }}
              viewBox="-2 -2 4 4"
            >
              <Circle fill={COLORS.blue} r={2} />
            </Svg>
            <Text style={styles.details}>Extra notifcation option</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Svg
              style={{ height: 10, width: 10, marginRight: 10 }}
              viewBox="-2 -2 4 4"
            >
              <Circle fill={COLORS.blue} r={2} />
            </Svg>
            <Text style={styles.details}>Extra plan option</Text>
          </View>
        </Fragment>
      )}
      {params.type && params.type === "premium" && (
        <Text>Here we show the secret details to premium</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 45,
    fontWeight: "700",
    textAlign: "center",
    marginTop: "20%",
  },
  subTitle: {
    fontSize: 28,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  details: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 5,
  },
});
