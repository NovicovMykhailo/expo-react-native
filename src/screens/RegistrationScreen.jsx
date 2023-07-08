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
import { useState, useEffect } from "react";
import image from "../assets/Photo_BG2x.png";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import PhotoPicker from "../components/PhotoPicker";
import PlusStyledButton from "../components/PlusStyledButton";

export default RegistrationScreen = () => {
  const navigation = useNavigation();

  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShownPasword, setIsShownPasword] = useState(true);
  const [isFocused, setIsFocused] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [isBtnActive, setIsBtnActive] = useState(false);

  useEffect(() => {
    if (photo) setIsBtnActive(true);
    else setIsBtnActive(false);
  }, [photo]);

  const [fontsLoaded] = useFonts({
    Roboto: require("../assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const showModal = () => {
    setModalVisible(prev => !prev);
  };

  const showPassword = () => {
    setIsShownPasword(prev => !prev);
  };

  const onLogin = () => {
    Alert.alert("FormData", `Login: ${login}  Password: ${password} Email: ${email}`);
    setLogin("");
    setPassword("");
    setEmail("");

    navigation.replace("HomeScreen");
  };

  return (
    <SafeAreaView style={styles.base}>
      <ImageBackground source={image} style={styles.image} />
      {modalVisible && <PhotoPicker showModal={showModal} setPhoto={setPhoto} />}
      <View style={styles.box}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.view}>
            <KeyboardAvoidingView
              style={styles.keyView}
              behavior={Platform.OS == "ios" ? "padding" : "height"}
              keyboardVerticalOffset={800}
            >
              <View style={styles.userPhoto}>
                {photo && <ImageBackground source={photo} style={styles.photo} />}
                <PlusStyledButton isActive={isBtnActive} onPress={() => (photo ? setPhoto(null) : showModal())} />
              </View>

              <Text style={styles.title}>Реєстрація</Text>
              <TextInput
                onFocus={() => setIsFocused("login")}
                onBlur={() => setIsFocused(null)}
                style={[styles.input, isFocused === "login" && styles.active]}
                placeholder="Логін"
                onChangeText={setLogin}
                value={login}
                inputMode="text"
                placeholderTextColor="#BDBDBD"
              />
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
            <TouchableOpacity style={styles.btn} onPress={onLogin}>
              <Text style={styles.btnText}>Зареєстуватися</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomTextContainer} onPress={() => navigation.navigate("Login")}>
              <Text style={styles.bottomText}>Вже є акаунт? Увійти</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  base: {
    width: "100%",
  },
  image: {
    resizeMode: "cover",
    height: 900,
    flex: 1,
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
    paddingHorizontal: 16,
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
  photo: { resizeMode: "contain", width: 120, height: 120, borderRadius: 16, overflow: "hidden" },
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
  BtnIcon: {
    color: "#FF6C00",
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
    paddingHorizontal: 32,
    paddingVertical:16,
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
