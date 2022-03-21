import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polygon } from "react-native-maps";
import { useDispatch } from "react-redux";
import { apiData } from "../../api/appinfo";
import { getAllAuth } from "../../api/common";
import { COLORS } from "../../assets/colors";
import { FailureAlert } from "../../components/Alerts";
import { setAlert, useProfile } from "../../state";

let id = 0;
const inale = require("../../assets/img/marker-icon-2x.png");
export const MapScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useProfile();
  const [points, setPoints] = useState([]);
  const [polygons, setPolygons] = useState([]);
  const [subscriber, setSubscriber] = useState(true);

  // //points
  useEffect(() => {
    getAllAuth("points")
      .then((res) => {
        setPoints(res.data);
      }) //not err must match -- err
      .catch((err) => {
        console.log(err);
        dispatch(
          setAlert(<FailureAlert message="sorry there was a fault - Points" />)
        );
      });
  }, []);

  // //polygons
  useEffect(() => {
    getAllAuth("polygons")
      .then((res) => {
        // console.log(res?.data);
        setPolygons(res.data);
      }) //not err must match -- err
      .catch((err) => {
        console.log(err);
        dispatch(
          setAlert(
            <FailureAlert message="sorry there was a fault - Polygons" />
          )
        );
      });
  }, []);

  //  is subscriber?
  useEffect(() => {
    user &&
      user?.subscriptions &&
      user?.subscriptions.map((sub) => {
        if (
          sub.plan.id == apiData.REACT_APP_PRICE_1 ||
          sub.plan.id == apiData.REACT_APP_PRICE_2
        ) {
          setSubscriber(true);
        }
      });
  }, [subscriber]);

  return (
    <View style={styles.container}>
      {subscriber ? (
        <MapView style={styles.map}>
          {polygons &&
            polygons?.length > 0 &&
            polygons.map((polygon, index) => (
              <Polygon
                key={index}
                strokeWidth={2}
                strokeColor="green"
                /*coordinates={polygon?.location?.coordinates?.map((item) => ({
                  latitude: item[0],
                  longitude: item[1],
                }))}*/
                coordinates={[
                  { latitude: 15, longitude: 20 },
                  { latitude: 77, longitude: 12 },
                  { latitude: 15, longitude: 14 },
                ]}
              />
            ))}
        </MapView>
      ) : (
        <Text style={styles.textSubscription}>Please subscribe for alerts</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  textSubscription: {
    fontSize: 24,
    color: COLORS.red,
  },
});
