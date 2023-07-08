import React from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView } from "react-native";

const ModalWindow = ({ setVisible, children }) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setVisible();
        }}
      >
        <View style={styles.centeredView}>
          <ScrollView style={styles.modalView} contentContainerStyle={styles.contentContainer}>
            {children}
            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setVisible()}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    overflow: "hidden",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  modalView: {
    flex: 1,
    backgroundColor: "white",
  },
  button: {
    width: "90%",
    position: "relative",
    top: 0,
    left: 20,
    marginVertical:20,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#FF6C00",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ModalWindow;
