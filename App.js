import "react-native-gesture-handler";

import { PersistGate } from "redux-persist/integration/react";
import { Provider, useSelector } from "react-redux";
import { store, persistor } from "./src/store/store";

import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./src/navigation/MainNavigation";
import Toast from "./src/components/Toast";

import { useFonts } from "expo-font";


export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require("./src/assets/fonts/Roboto-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toast />
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
