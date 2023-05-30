import { Text, View, ScrollView, Button, Switch, TextInput, StyleSheet } from "react-native";
import css from "   ";

export default Modal = () => {
  return (
    <View>
      <ScrollView>
        <Text>My Modal element</Text>
        <Text>My Modal element</Text>
        <Text>My Modal element</Text>
        <Text>My Modal element</Text>
        <TextInput />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button style={styles.btn} title={"First Button"} />
        <Button style={styles.btn} title={"Second Button"} />
        <Switch />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    display: flex,
    width: "150px",
    backgroundColor: "gray",
  },
  btn: {
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "25px",
    paddingRight: "25px",
    borderRadius: "10px",
  },
});
