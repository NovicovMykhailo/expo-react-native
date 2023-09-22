import "react-native-gesture-handler"; // native
import { RootSiblingParent } from "react-native-root-siblings"; // Toast Container
import { PersistGate } from "redux-persist/integration/react"; // persist
import { store, persistor } from "./src/store/store"; // redux
import { Provider } from "react-redux"; // redux

import { NavigationContainer } from "@react-navigation/native"; // native
import { Routes } from "./src/navigation/MainNavigation"; // native
import { useFonts } from "expo-font"; // expo

//APP
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
        <RootSiblingParent>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
}
