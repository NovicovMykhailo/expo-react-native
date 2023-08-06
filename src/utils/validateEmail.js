
import toast from '../utils/toast'

export default function validateEmail(text) {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(text) === false) {
    toast.warn({message: "Invalid Email Format"})
    // Alert.alert('Message',"Invalid Email Format");
    return false;
  } else {
    return true;
  }
}
