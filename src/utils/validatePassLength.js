import { Alert } from "react-native";
export default function validatePassLength(pass) {
    console.log(pass.length)
  if (pass.length < 7) {
    Alert.alert("Message", "Password must be at least 8 symbols");
    return false;
  } else {
    return true;
  }
}
