import { View, Text, StyleSheet, TouchableOpacity } from "react-native"; // native
import { Feather, MaterialIcons } from "@expo/vector-icons"; // icons
import MapView, { Marker } from "react-native-maps"; // native
import { useEffect, useState } from "react"; // react
import { PROVIDER_GOOGLE } from "react-native-maps"

export default MapScreen = data => {
  const [location, setLocation] = useState(null);
  const [mapType, setMapStyle] = useState("standard");



  const { params } = data.route;

  const geoPlaceName = params.location;
  const markerTitles = params.title;

  const geo = {
    latitude: Number(params.coords.latitude),
    longitude: Number(params.coords.longitude),
  };

  useEffect(() => setLocation(geo), []);
  return (
    <View style={styles.container}>
      <View style={styles.map}>
        <MapView
          style={styles.mapStyle}
          region={{
            ...location,
            latitudeDelta: 0.04,
            longitudeDelta: 0.05,
          }}
          showsUserLocation={true}
          mapType={mapType}
          provider={PROVIDER_GOOGLE}
          minZoomLevel={10}
        >
          {location && <Marker title={markerTitles} coordinate={location} description={geoPlaceName} />}
        </MapView>
      </View>
      <View style={styles.bar}>
        <View style={styles.barRight}>
          <Feather name="map-pin" size={24} style={styles.pinIcon} />
          <Text style={styles.barRightText}>{markerTitles}</Text>
        </View>
        <TouchableOpacity onPress={() => setMapStyle(prev => (prev === "hybrid" ? "standard" : "hybrid"))}>
          <MaterialIcons name="satellite" size={26} style={styles.mapIcon} />
        </TouchableOpacity>
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
    minHeight: "88%",
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
  bar: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    flex: 1,
    paddingHorizontal: 16,
  },
  barRight: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  barRightText: {
    color: "#212121",
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
    alignSelf: "flex-start",
  },
  pinIcon: {
    marginRight: 6,
    marginTop: -6,
    color: "#BDBDBD",
    alignSelf: "flex-start",
  },
  mapIcon: {
    color: "#BDBDBD",
    transform: [{ scaleX: -1 }],
  },
});
