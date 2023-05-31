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
} from "react-native";
import { useState } from "react";
import image from "../assets/Photo_BG@2x.png";

const Registration = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
    login: false,
  });

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
  };

  return (
    <TouchableWithoutFeedback>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.container}>
          <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.view}>
            <View style={styles.container}>
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
              <TextInput
                onFocus={() => handleInputFocus("password")}
                onBlur={() => handleInputBlur("password")}
                placeholder="Пароль"
                style={isFocused.password ? styles.inputOnFocus : styles.input}
                onChangeText={setPassword}
                value={password}
                textContentType="password"
                placeholderTextColor="#BDBDBD"
                secureTextEntry="true"
              />
              <TouchableOpacity style={styles.btn} onClick={onLogin}>
                <Text style={styles.btnText}>Зареєстуватися</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bottomTextContainer}>
                <Text style={styles.bottomText}>Вже є акаунт? Увійти</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};
export default Registration;

const styles = StyleSheet.create({

  container: {
    height: "100%",
    flex: 1,
    flexDirection: "column",
    fontFamily: "Roboto-Regular",
    position: "relative",
    textAlign: "center",
    justifyContent: "flex-end",
  },
  view: {
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
    borderWidth: 5,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: "92px",
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingBottom: "43px",
  },
  userPhoto: {
    width: "120px",
    height: "120px",
    borderRadius: "16px",
    backgroundColor: "#F6F6F6",
    position: "absolute",
    top: -152,
    left: "48%",
    transform: [{ translateX: -50, translateY: -50 }],
  },
  takePhotoOut: {
    position: "absolute",
    width: "25px",
    height: "25px",
    right: "-11px",
    borderRadius: "50%",
    backgroundColor: "#FFFFFF",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#FF6C00",
    top: "81px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    height: 50,
    marginTop: 16,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: "1px",
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderRadius: "8px",
  },
  inputOnFocus: {
    height: 50,
    marginTop: 16,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: "1px",
    borderColor: "#FF6C00",
    outlineStyle: "none",
    borderStyle: "solid",
    borderRadius: "8px",
    fontWeight: "400",
    fontSize: 16,
    color: "#212121",
  },
  title: {
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    marginBottom: "16px",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: "100px",
    paddingTop: "16px",
    paddingBottom: "16px",
    paddingLeft: "32px",
    paddingRight: "32px",
    marginTop: "43px",
    display: "flex",
    alignItems: "center",
  },
  btnText: {
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "19px",
    color: "#FFFFFF",
  },

  insideText: {
    fontSize: 13,
    fontWeight: 100,
    transform: [{ scale: 2 }],
    color: "#FF6C00",
  },
  bottomTextContainer: {},

  bottomText: {
    padding: 16,
    color: "#1B4371",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "19px",
    textAlign: "center",
  },
});

// https://github.com/react-native-image-picker/react-native-image-picker
