import { Pressable, useWindowDimensions, StyleSheet, Modal } from "react-native"; // native
import React from "react"; //react

const Loader = ({ setVisible, children }) => {

  const { width: userWidth } = useWindowDimensions();
  
  return (
    <Modal
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
      onRequestClose={() => {
        setVisible();
      }}
    >
      <Pressable style={[styles.overlay, { width: userWidth }]} onPress={setVisible}>
        {children}
      </Pressable>
    </Modal>
  );
};
export default Loader;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#ffffffcc",
    backdropFilter: "blur(10px)",
    justifyContent: "center",
    alignItems: "center",
  },
});
