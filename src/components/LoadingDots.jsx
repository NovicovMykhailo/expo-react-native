import { StyleSheet, View, Image } from "react-native";
import image from '../assets/loadingDots.gif'

const LoadingDots = ()=>{
    return (
        <View style={styles.container}>
          <Image source={image} style={styles.icon} />
        </View>
      );
}
export default LoadingDots;



const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "flex-start",
      backgroundColor: "transparent",
      marginBottom: 10,
    },
    icon: {
      objectFit: "contain",
      width: 50,
      height: 15,
    },
  });