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
  Alert,
} from "react-native";
import { useState } from "react";
import image from "../assets/Photo_BG2x.png";
import { useFonts } from "expo-font";

const Registration = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShownPasword, setIsShownPasword] = useState(true);
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
    login: false,
  });

  const [fontsLoaded] = useFonts({
    Roboto: require("../assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const showPassword = () => {
    setIsShownPasword(prev => !prev);
  };

  const handleInputFocus = textinput => {
    setIsFocused({
      [textinput]: true,
    });
  };
  const handleInputBlur = textinput => {
    setIsFocused({
      [textinput]: false,
    });
  };
  const onLogin = () => {
    Alert.alert("Credentials", `${login} + ${password}+ ${email}`);
    setLogin('')
    setPassword('')
    setEmail('')
  };

  return (
    <SafeAreaView style={styles.base}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.box}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.view}>
              <KeyboardAvoidingView
                style={styles.keyView}
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                keyboardVerticalOffset={400}
                disabled

              >
                <View style={styles.userPhoto}>
                  <TouchableOpacity style={styles.takePhotoOut}>
                    <Text style={styles.insideText}>+</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.title}>Реєстрація</Text>
                <TextInput
                  onFocus={() => handleInputFocus("login")}
                  onBlur={() => handleInputBlur("login")}
                  style={isFocused.login ? styles.inputOnFocus : styles.input}
                  placeholder="Логін"
                  onChangeText={setLogin}
                  value={login}
                  inputMode="text"
                  placeholderTextColor="#BDBDBD"
                />
                <TextInput
                  onFocus={() => handleInputFocus("email")}
                  onBlur={() => handleInputBlur("email")}
                  placeholder="Адреса електронної пошти"
                  style={isFocused.email ? styles.inputOnFocus : styles.input}
                  onChangeText={setEmail}
                  value={email}
                  inputMode="email"
                  placeholderTextColor="#BDBDBD"
                />
                <View>
                  <TextInput
                    onFocus={() => handleInputFocus("password")}
                    onBlur={() => handleInputBlur("password")}
                    placeholder="Пароль"
                    style={isFocused.password ? styles.inputOnFocus : styles.input}
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

                <TouchableOpacity style={styles.btn} onPress={onLogin}>
                  <Text style={styles.btnText}>Зареєстуватися</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomTextContainer}>
                  <Text style={styles.bottomText}>Вже є акаунт? Увійти</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Registration;

const styles = StyleSheet.create({
  image: {
    resizeMode: "cover",
    height: "100%",
  },
  keyView: {


    // marginBottom: 710,

  },
  box: {
    height: "100%",
    justifyContent: "flex-end",
    textAlign: "center",
    position: "relative",
    flexDirection: "column",
  },
  view: {
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
    borderWidth: 5,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 43,
  },
  userPhoto: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    position: "absolute",
    top: -160,
    left: "46%",
    transform: [{ translateX: -50 }],
  },
  takePhotoOut: {
    position: "absolute",
    width: 25,
    height: 25,
    right: -11,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#FF6C00",
    top: 81,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  insideText: {
    fontSize: 12,
    fontWeight: "100",
    transform: [{ scale: 1.7 }],
    color: "#FF6C00",
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
  },
  inputOnFocus: {
    height: 50,
    marginTop: 16,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FF6C00",

    borderStyle: "solid",
    borderRadius: 8,
    fontWeight: "400",
    fontSize: 16,
    color: "#212121",
    position: "relative",
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

  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
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
});
