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
import { register } from "../redux/auth/thunks"; //redux
import { selectError, selectIsLoading } from "../redux/auth/selectors"; //redux

import PhotoPicker from "../components/PhotoPicker"; //Components
import PlusStyledButton from "../components/PlusStyledButton"; //Components
import Loader from "../components/Loader"; //Components
import Spinner from "../components/Spinner"; //Components

import validateEmail from "../utils/validateEmail"; //util
import validatePassLength from "../utils/validatePassLength"; //util
import toast from "../utils/toast"; //toast
import image from "../assets/Photo_BG2x.png"; // bg Image

export default RegistrationScreen = () => {
  const [fontsLoaded] = useFonts({ Roboto: require("../assets/fonts/Roboto-Regular.ttf") });

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);

  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShownPasword, setIsShownPasword] = useState(true);
  const [isFocused, setIsFocused] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [isBtnActive, setIsBtnActive] = useState(false);

  const isBtnDisabled = Boolean(!email || !password || !login);

  useEffect(() => {
    // isActiveButton
    if (photo) setIsBtnActive(true);
    else setIsBtnActive(false);
  }, [photo]);

  useEffect(() => {
    // handle Errors
    if (error) toast.error({ message: `${error}` });
  }, [error]);

  useFocusEffect(
    // reseting form on change Screen
    useCallback(() => {
      return () => {
        setEmail(""), setLogin(""), setPassword("");
      };
    }, []),
  );

  const showModal = () => {
    setModalVisible(prev => !prev);
  };

  const showPassword = () => {
    setIsShownPasword(prev => !prev);
  };

  if (!fontsLoaded) {
    return null;
  }

  const onRegister = async () => {
    // dispatching Form
    if (validateEmail(email) && validatePassLength(password)) {
      try {
        await dispatch(register({ email, password, photo, login }));
      } catch (error) {
        toast.error({ message: `${error.message}` });
      }
    }
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
            <TouchableOpacity style={styles.btn} disabled={isBtnDisabled} onPress={onRegister}>
              <Text style={styles.btnText}>Зареєстуватися</Text>
              {isLoading && (
                <Loader>
                  <Spinner />
                </Loader>
              )}
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
    paddingVertical: 16,
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
