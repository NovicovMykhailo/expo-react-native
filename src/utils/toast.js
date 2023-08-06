import { DeviceEventEmitter } from "react-native";

const toast = {
  info: options => {
    DeviceEventEmitter.emit("SHOW_TOAST_MESSAGE", { ...options, type: "info" });
  },
  warn: options => {
    DeviceEventEmitter.emit("SHOW_TOAST_MESSAGE", { ...options, type: "warn" });
  },
  error: options => {
    DeviceEventEmitter.emit("SHOW_TOAST_MESSAGE", { ...options, type: "error" });
  },
};

export default toast;
