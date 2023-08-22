import { useState, useEffect, useRef, useCallback } from "react";
import { DeviceEventEmitter, TouchableOpacity } from "react-native";
import { Text, StyleSheet } from "react-native";
import Animated, { withTiming, useSharedValue, useAnimatedStyle } from "react-native-reanimated";

const colors = {
  info: "#26c0d3",
  warn: "#ff9800",
  error: "#ff5549",
};

const Toast = () => {
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [timeout, setTimeout] = useState(3000);

  const timeoutRef = useRef(null);

  const animOpacity = useSharedValue(0);
  const animStyle = useAnimatedStyle(() => {
    return {
      opacity: animOpacity.value,
    };
  });

  function onNewToast(data) {
    setMessage(data.message);
    setMessageType(data.type);
    if (data.durration) {
      setTimeout(data.durration);
    }
  }

  const closeToast = useCallback(() => {
    setMessage(null);
    setMessageType(null);
    setTimeout(2000);
    animOpacity.value = withTiming(0);
    clearInterval(timeoutRef.current);
  }, [animOpacity]);

  useEffect(() => {
    if (message) {
      timeoutRef.current = setInterval(() => {
        if (timeout === 0) closeToast();
        else setTimeout(prev => prev - 1000);
      }, 1000);
    }
    return () => {
      clearInterval(timeoutRef.current);
    };
  }, [closeToast, message, timeout]);

  useEffect(() => {
    if (message) animOpacity.value = withTiming(1, { duration: 1500 });
  }, [message, animOpacity]);

  useEffect(() => {
    DeviceEventEmitter.addListener("SHOW_TOAST_MESSAGE", onNewToast);
    return () => {
      DeviceEventEmitter.removeAllListeners();
    };
  }, []);

  if (!message) return null;

  return (
    <Animated.View style={[styles.container, { borderLeftColor: colors[messageType] }, animStyle]}>
      <TouchableOpacity onPress={closeToast}>
        <Text style={[styles.title, {color: colors[messageType]}]}>{messageType}</Text>
        <Text style={styles.message}>{message}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 10,
    borderLeftWidth: 4,
    top: "4%",
    left: "8%",
    right: "8%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 8,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
  },
  title: { fontSize: 16, fontWeight: 600, textTransform: "uppercase"},
  message: { fontSize: 14, marginTop: 2 },
});
