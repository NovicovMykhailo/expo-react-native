import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";

export default MapScreen = ({ geoposition }) => {
  const [location, setLocation] = useState(null);

  useEffect(
    () => setLocation(geoposition),
    [],
  );
  return (
    <View style={styles.container}>
      <View style={styles.map}>
        <MapView
          style={styles.mapStyle}
          region={{
            ...location,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          mapType="standard"
          minZoomLevel={15}
          // onMapReady={() => console.log("Map is ready")}
          // onRegionChange={() => console.log("Region change")}
        >
          {location && <Marker title="I am here" coordinate={location} description="Hello" />}
        </MapView>
      </View>

      <View style={styles.barRight}>
        <Feather name="map-pin" size={24} style={styles.pinIcon} />
        <Text style={styles.barRightText}>Ukraine</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
  },

  map: {
    width: "100%",
    minHeight: "85%",
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 16,

    backgroundColor: "#E8E8E8",
    display: "flex",
  },
  mapStyle: {
    flex: 1,
  },

  barRight: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    marginLeft: 10,
  },
  barRightText: {
    color: "#212121",
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
  },
  pinIcon: {
    marginRight: 6,
    marginTop: -6,
    color: "#BDBDBD",
  },
});
