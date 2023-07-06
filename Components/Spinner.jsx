import { StyleSheet, ActivityIndicator } from "react-native";

import React from "react";

const Spinner = () => {
  return <ActivityIndicator size="large" color="gray" style={styles.spiner} />;
};

export default Spinner;

const styles = StyleSheet.create({
  spiner: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  },
});
