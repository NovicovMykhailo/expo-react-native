
import toast from "../utils/toast";
export default function validatePassLength(pass) {
  if (pass.length < 7) {
    toast.warn({ message: "Password must be at least 8 symbols" });
    return false;
  } else {
    return true;
  }
}
