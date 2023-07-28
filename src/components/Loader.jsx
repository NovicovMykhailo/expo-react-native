import React from "react";
import { Pressable, useWindowDimensions, StyleSheet, Modal } from "react-native";

const Loader = ({ setVisible,children }) => {
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
