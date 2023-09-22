import { Text, StyleSheet, View } from "react-native"; // native
import Toast from "react-native-root-toast"; // Toast

const colors = {
  info: "#26c0d3",
  warn: "#ff9800",
  error: "#ff5549",
};
// Toast Body Component
const markup = ({ type, message }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors[type] }]}>{type}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};
// Toast Function
const showToast = ({ type, message }) => {
  const toast = Toast.show(markup({ type, message }), {
    duration: 3000,
    position: 10,
    shadow: true,
    animation: true,
    hideOnPress: true,
    backgroundColor: "#fff",
    textColor: "black",
    opacity: 1,
    delay: 0,
    containerStyle: {
      zIndex: 10,
      borderLeftWidth: 4,
      borderLeftColor: colors[type],
      paddingVertical: 8,
      paddingHorizontal: 15,
      backgroundColor: "white",
      borderRadius: 10,
      shadowColor: "#171717",
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 20,
    },

    onShown: () => {
      setTimeout(function () {
        Toast.hide(toast);
      }, 3000);
    },
  });
  return toast;
};
export default showToast;

// Styles
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    textTransform: "uppercase",
  },
  message: {
    fontSize: 14,
    marginTop: 2,
  },
});
