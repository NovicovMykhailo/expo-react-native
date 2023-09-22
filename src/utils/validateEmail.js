
import showToast from "./showToast"; // Toast
//Validating Email
export default function validateEmail(text) {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(text) === false) {
    showToast({ type: "warn", message: "Invalid Email Format" });
    return false;
  } else {
    return true;
  }
}
