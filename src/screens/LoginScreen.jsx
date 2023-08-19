import {
  View,
  StyleSheet,
  TextInput,
  Text,
  SafeAreaView,
  Platform,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native"; //native
import { useFonts } from "expo-font"; //fonts
import { useFocusEffect, useNavigation } from "@react-navigation/native"; //navigator

import { useState, useEffect, useCallback } from "react"; //react
import { useDispatch, useSelector } from "react-redux"; //redux
import { logIn } from "../redux/auth/thunks"; //redux
import { selectError, selectIsLoading } from "../redux/auth/selectors"; //redux
import LoadingScreen from "../components/LoadingScreen"; // component



import validateEmail from "../utils/validateEmail"; //util
import validatePassLength from "../utils/validatePassLength"; //util


import toast from "../utils/toast"; //toast

import image from "../assets/Photo_BG2x.png"; //bgImage


const LoginScreen = () => {
  const [fontsLoaded] = useFonts({ Roboto: require("../assets/fonts/Roboto-Regular.ttf") });


  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const navigation = useNavigation();
  const user = useSelector(state => state.auth.token);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShownPasword, setIsShownPasword] = useState(true);
  const [isFocused, setIsFocused] = useState(null);

  const isBtnDisabled = Boolean(!email || !password);

  useEffect(() => {
    // handle Errors
    if (error) toast.error({ message: `${error}` });
  }, [error]);

  useFocusEffect(
    // reseting form on change Screen

    useCallback(() => {
      return () => {
        setEmail(""), setPassword("");
      };
    }, []),
  );

  const showPassword = () => {
    setIsShownPasword(prev => !prev);
  };

  if (!fontsLoaded) {
    return null;
  }

  const onLogin = async () => {
    // dispatching form data

    if (validateEmail(email) && validatePassLength(password)) {
      try {
        dispatch(logIn({ email, password }));
      } catch (error) {
        toast.error({ message: `${error.message}` });
      }
    }
  };
  return (
    <SafeAreaView>
      <ImageBackground source={image} style={styles.image} />
      <View style={styles.box}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.view}>
            <KeyboardAvoidingView style={styles.keyView} behavior={Platform.OS === "ios" ? "padding" : "height"}>
              <Text style={styles.title}>Увійти</Text>
              <TextInput
                onFocus={() => setIsFocused("email")}
                onBlur={() => setIsFocused(null)}
                placeholder="Адреса електронної пошти"
                style={[styles.input, isFocused === "email" && styles.active]}
                onChangeText={setEmail}
                value={email}
                inputMode="email"
                placeholderTextColor="#BDBDBD"
              />
              <View>
                <TextInput
                  onFocus={() => setIsFocused("password")}
                  onBlur={() => setIsFocused(null)}
                  placeholder="Пароль"
                  style={[styles.input, isFocused === "password" && styles.active]}
                  onChangeText={setPassword}
                  value={password}
                  textContentType="password"
                  placeholderTextColor="#BDBDBD"
                  secureTextEntry={isShownPasword}
                />
                <TouchableOpacity onPress={showPassword} style={styles.passwordInputBtn}>
                  <Text style={styles.showPassText}>Показати</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
            <TouchableOpacity style={styles.btn} disabled={isBtnDisabled} onPress={onLogin}>
              <Text style={styles.btnText}>Увійти</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomTextContainer}>
              <Text style={styles.bottomText} onPress={() => navigation.replace("Registration")}>
                Немає акаунту? <Text style={styles.underlinedText}>Зареєструватися</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
        {isLoading && <LoadingScreen/>}
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  image: {
    resizeMode: "cover",
    height: 900,
    flex: 1,
  },
  box: {
    height: "100%",
    justifyContent: "flex-start",
    textAlign: "center",
    position: "relative",
    flexDirection: "column",
  },
  view: {
    top: 273,
    height: "100%",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 43,
  },
  title: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    marginBottom: 16,
    fontFamily: "Roboto",
  },
  input: {
    height: 50,
    marginTop: 16,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderRadius: 8,
    position: "relative",
    fontWeight: "400",
  },
  active: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FF6C00",
    color: "#212121",
  },
  showPassText: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#1B4371",
  },
  passwordInputBtn: {
    height: 50,
    width: 100,
    position: "absolute",
    top: 16,
    right: 0,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginTop: 43,
    display: "flex",
    alignItems: "center",
  },
  btnText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },

  bottomText: {
    paddingTop: 16,
    color: "#1B4371",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    fontFamily: "Roboto",
  },
  underlinedText: {
    textDecorationLine: "underline",
  },
});
