import React, { useEffect, useState } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Linking,
  StatusBar,
  Image,
  Keyboard,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import api from "../../services/api";
import { SafeAreaView } from "react-native-safe-area-context";

import MyButton from "../../components/MyButton/Index";
import LinkButton from "../../components/LinkButton/Index";
import imgLogo from "../../../assets/banner-logo-novaPNG.png";

import colors from "../../styles/colors";
//import Loading from '../../components/Loading/Loading';
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../../contexts/UserContext";
import { useSystem } from "../../contexts/SystemContext";
import loading from "../../../assets/loading.gif";

const eye = "eye";
const eyeOff = "eye-off";

export default function Login() {
  const [flShowPass, setShowPass] = useState(true);
  const [iconPass, setIconPass] = useState(eyeOff);
  const [txtLogin, setLogin] = useState("");
  const [txtSenha, setSenha] = useState("");
  const navigation = useNavigation();
  const [flLoading, setLoading] = useState(false);
  const userLogin = useUser();
  const system = useSystem();
  // keyboardStatus
  function handleChangeIcon() {
    let icone = iconPass == eye ? eyeOff : eye;
    let flShowPassAux = !flShowPass;
    setShowPass(flShowPassAux);
    setIconPass(icone);
  }

  async function navigateToHome() {
    if (txtLogin.trim() === "") {
      alert("Campo login é obrigatório");
      return;
    }
    if (txtSenha.trim() === "") {
      alert("Campo senha é obrigatório");
      return;
    }
    system.setPageLoading(true);

    if (!(await userLogin.setUserLogin(txtLogin, txtSenha))) {
      return;
    }

    system.setPageLoading(false);
  }

  function navigateToNewUser() {
    navigation.navigate("NewUser");
  }

  async function getUser() {
    var storage = await AsyncStorage.getItem("@solicitaTCC:people");
    if (storage !== "null" && storage !== null) {
      var user = JSON.parse(storage);
      if (user.iD_TIPO_PESSOA == 2) {
        navigation.navigate("Student");
      } else {
        navigation.navigate("Advisor");
      }
    } else {
      navigation.navigate("Login");
    }
  }

  async function getPeople(user) {
    try {
      await api
        .post("/login/getPeople", { iD_PESSOA: user })
        .then(async (response) => {
          await AsyncStorage.setItem(
            "@solicitaTCC:people",
            JSON.stringify(response.data.result)
          );
          return JSON.parse(response.data.result);
        });
    } catch (e) {
      return null;
    }
  }

  // useEffect(() => {
  //   getUser();
  // }, []);

  return (
    <>
      <LinearGradient
        colors={["rgba(5,23,111,1)", "rgba(24,95,240,1)"]}
        start={{ x: 0.8, y: 0.4 }}
        style={styles.container}
      >
        {/* <StatusBar hidden={true} /> */}
        {!Keyboard.isVisible() ? (
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image style={styles.selfPhoto} alt="logo" source={imgLogo} />
          </View>
        ) : (
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 100,
            }}
          ></View>
        )}

        <Text style={styles.textTitle}>ATC ManagemenT</Text>
        <View style={styles.content}>
          {/* <Text style={styles.textTitle}></Text> */}
          <TextInput
            style={styles.textInput}
            placeholder="Login"
            onChangeText={(text) => setLogin(text)}
            value={txtLogin}
            placeholderTextColor={colors.white}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.textInputPassword}
              placeholder="Senha"
              onChangeText={(text) => setSenha(text)}
              value={txtSenha}
              secureTextEntry={flShowPass}
              placeholderTextColor={colors.white}
            />
            <Feather
              style={styles.iconEye}
              name={iconPass}
              size={28}
              color={colors.purple}
              onPress={handleChangeIcon}
            />
          </View>

          <MyButton title="Entrar" onPress={navigateToHome} />

          {/* <LinkButton title='Inscrever-se'
            onPress={navigateToNewUser}
        /> */}

          {/* <br/> */}
          <Text style={styles.textInsc} onPress={navigateToNewUser}>
            Inscrever-se
          </Text>
          <Text
            style={styles.textPassword}
            onPress={() => navigation.navigate("Login")}
          >
            Esqueci minha senha
          </Text>
        </View>
      </LinearGradient>
      {system.pageLoading && (
        <View style={styles.containerLoading}>
          <Image
            style={{ height: 50, width: 50 }}
            alt="self"
            source={loading}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
    color: colors.white,
    width: "100%",
    height: "100%",
  },
  selfPhoto: {
    width: 200,
    height: 200,
    marginTop: "30%",
    marginBottom: "10%",
    // borderRadius: 120
  },
  content: {
    // marginTop:'80%',
    width: "90%",
    height: 400,
    flex: 1,
    backgroundColor: colors.blackSpace,
    alignItems: "center",
    // justifyContent: 'center',
    // borderRadius: 8,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    color: colors.white,
    height: 50,
    paddingTop: 20,
  },
  textTitle: {
    color: colors.white,
    fontSize: 28,
    marginBottom: 8,
    fontWeight: "bold",
  },
  textInsc: {
    color: colors.white,
    fontSize: 22,
    marginBottom: 8,
  },
  textPassword: {
    color: colors.body_dark,
    fontSize: 12,
    marginTop: 20,
  },
  textInput: {
    height: 50,
    // borderColor: colors.white,
    backgroundColor: colors.blackGrey,
    color: colors.white,
    borderRadius: 8,
    // borderWidth: 2,
    width: "90%",
    marginBottom: 16,
    paddingHorizontal: 8,
    borderBottomRightRadius: 0,
    // borderRightWidth: 0,
    // borderTopWidth: 0,
  },
  textInputPassword: {
    height: 50,
    borderWidth: 0,
    width: "70%",
    marginBottom: 16,
    paddingHorizontal: 8,
    // borderColor: colors.white,
    color: colors.white,
    backgroundColor: colors.blackGrey,
    borderRadius: 8,
  },
  buttonIn: {
    backgroundColor: colors.purple,
    borderRadius: 8,
    height: 50,
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextIn: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  passwordContainer: {
    marginBottom: 16,
    height: 50,
    // borderColor: colors.white,
    color: colors.white,
    borderRadius: 8,
    // borderWidth: 2,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.blackGrey,
  },
  iconEye: {
    paddingHorizontal: 8,
    marginTop: 10,
    color: colors.white,
    backgroundColor: colors.blackGrey,
  },
  containerLoading: {
    padding: 5,
    backgroundColor: "#0B0B0BA6",
    width: "100%",
    height: "100%",
    // marginLeft: 130,
    // marginRight: 40,
    // borderRadius: 100,
    // borderWidth: 1,
    // borderColor: colors.white,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    // bottom: 20,
    alignSelf: "center",
  },
});
