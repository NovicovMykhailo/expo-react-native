import { Alert } from "react-native";

export default function validateEmail(text) {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(text) === false) {
    Alert.alert('Message',"Invalid Email Format");
    return false;
  } else {
    return true;
  }
}
