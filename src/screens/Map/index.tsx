import React, { Fragment, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Callout, Circle, Marker, Polygon } from "react-native-maps";
import { useDispatch } from "react-redux";
import { apiData } from "../../api/appinfo";
import { getAllAuth } from "../../api/common";
import { COLORS } from "../../assets/colors";
import { FailureAlert } from "../../components/Alerts";
import { setAlert, useProfile } from "../../state";

const image = require("../../assets/img/marker-icon-3x.png");

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
                strokeWidth={2.5}
                strokeColor={COLORS.green}
                fillColor={COLORS.lightGreen}
                coordinates={polygon?.location?.coordinates?.[0]?.map(
                  (item) => ({
                    latitude: item[0],
                    longitude: item[1],
                  })
                )}
              />
            ))}
          {points &&
            points.length > 0 &&
            points.map((point, index) => (
              <Fragment key={point._id}>
                <Circle
                  center={{
                    latitude: point?.location?.coordinates[0],
                    longitude: point?.location?.coordinates[1],
                  }}
                  fillColor={COLORS.lightRed}
                  strokeColor={COLORS.blue}
                  strokeWidth={2.5}
                  radius={point?.radius}
                />
                <Marker
                  image={image}
                  coordinate={{
                    latitude: point?.location?.coordinates[0],
                    longitude: point?.location?.coordinates[1],
                  }}
                />
                <Marker
                  image={image}
                  coordinate={{
                    latitude: point?.location?.coordinates[0],
                    longitude: point?.location?.coordinates[1],
                  }}
                >
                  <Callout>
                    <Text style={styles.calloutText}>
                      Position {point?.location?.coordinates?.toString()}
                    </Text>
                  </Callout>
                </Marker>
              </Fragment>
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
  calloutText: {
    fontSize: 14,
    textAlign: "center",
  },
});
