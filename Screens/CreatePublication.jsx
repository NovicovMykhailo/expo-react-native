import { View, Text, ScrollView, SafeAreaView, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

function Placeholder() {
  return (
    <View>
      <Feather name="map-pin" size={24} color="black" />
      <Text>Місцевість...</Text>
    </View>
  );
}

export default CreatePublication = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.photoBar}>
          <TouchableOpacity style={styles.PhotoButton}>
            <Ionicons name="md-camera-sharp" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
        <Text style={styles.decription}>Завантажте фото</Text>
        <TextInput style={styles.title} placeholder="Назва..." placeholderTextColor="#BDBDBD" />

        <View style={styles.location}>
          <Feather name="map-pin" size={24} color="#BDBDBD" style={{ marginRight: 10 }} />
          <TextInput placeholder="Місцевість..." placeholderTextColor="#BDBDBD" style={styles.locationIn} />
        </View>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Опубліковати</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  inner: {
    height: "100%",
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#b3b3b3",
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: "#FFFFFF",
  },
  photoBar: {
    width: "100%",
    height: 240,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
  },
  PhotoButton: {
    borderRadius: 30,
    width: 60,
    height: 60,
    backgroundColor: "#ffffff4d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  decription: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto",
    color: "#BDBDBD",
    marginTop: 8,
  },
  title: {
    height: 50,
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    paddingVertical: 16,
    marginTop: 32,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 50,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",

    marginTop: 32,
  },
  locationIn: {
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    paddingVertical: 16,
    marginBottom: -4,
  },
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
    marginTop: 32,
    display: "flex",
    alignItems: "center",
  },
  btnText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },
});
