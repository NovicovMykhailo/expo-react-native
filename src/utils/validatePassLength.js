
import showToast from "./showToast"; // Toast
//Validating Pass
export default function validatePassLength(pass) {
  if (pass.length < 7) {
    showToast({type: "warn",  message: "Password must be at least 8 symbols" });
    return false;
  } else {
    return true;
  }
}
