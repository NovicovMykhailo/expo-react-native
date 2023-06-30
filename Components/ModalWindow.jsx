import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView, Dimensions } from "react-native";

const ModalWindow = ({ setVisible, children }) => {

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setVisible();
        }}
      >
        <View style={styles.centeredView}>
          <ScrollView
            style={styles.modalView}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
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
    // flex: 1,

    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    // paddingHorizontal: 20,
    // paddingVertical: 0,
  },
  modalView: {
    // flex: 1,
    // flexGrow: 1,
    // marginBottom: 22,
    // alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "white",
    borderRadius: 20,

    paddingVertical: 0,
    paddingHorizontal: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    position: "relative",
    top: 0,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
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
