import React, { useState, useEffect } from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import api from "../../services/api";

import MyButton from "../../components/MyButton/Index";
import LinkButton from "../../components/LinkButton/Index";
import MenuBaseUser from "../../components/MenuBaseUser/index";
import HeaderBase from "../../components/HeaderBase/index";

// import colors from '../../styles/colors';
import colors from "../../styles/colors";
//import Loading from '../../components/Loading/Loading';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../../contexts/UserContext";

const eye = "eye";
const eyeOff = "eye-off";

import Home from "./Home";
import List from "./List";
import Msg from "./Msg";
import Task from "./Task";

export default function Index() {
  const [page, setPage] = useState(0);
  const pages = ["Home", "List", "Msg", "Task"];
  const [userData, setUserData] = useState({});
  const navigation = useNavigation();
  const user = useUser();

  function handlePage(pageValue) {
    setPage(pageValue);
  }

  async function getArea() {
    var userData = await user.getUserStorage();
    try {
      console.log(userData);
      await api
        .post("/area/getPeople", { iD_PESSOA: userData.id.toString() })
        .then((response) => {
          console.log(response);
          if (response.data.result.length <= 0) {
            navigation.navigate("AddArea");
          }
        });
    } catch (e) {
      console.log(e.response.data.mensagem);
      if (
        e.response.data.mensagem ==
        "Nenhuma area para esse usuario foi encontrada!"
      ) {
        navigation.navigate("AddArea");
        return;
      }
      alert("Erro ao buscar areas");
      return;
    }
  }

  useEffect(() => {
    getArea();
  }, []);

  return (
    <>
      <View style={styles.container}>
        {pages[page] === "Home" ? (
          <Home />
        ) : pages[page] === "List" ? (
          <List />
        ) : pages[page] === "Msg" ? (
          <Msg />
        ) : pages[page] === "Task" ? (
          <Task />
        ) : null}
      </View>
      <MenuBaseUser
        type="student"
        pages={pages}
        pageValue={pages[page]}
        handlePage={(pageValue) => handlePage(pageValue)}
      />
      <HeaderBase
        type="student"
        dataImg={userData.photo}
        pages={pages}
        pageValue={pages[page]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blackSpace,
    width: "100%",
    height: "100%",
  },
  textTitle: {
    color: "red",
    fontSize: 28,
    marginBottom: 8,
  },
  textInput: {
    height: 40,
    borderColor: colors.gray,
    borderRadius: 8,
    borderWidth: 1,
    width: "70%",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  textInputPassword: {
    height: 40,
    borderWidth: 0,
    width: "70%",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  buttonIn: {
    backgroundColor: colors.redButton,
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
    height: 40,
    borderColor: "#dcdce6",
    borderRadius: 8,
    borderWidth: 1,
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconEye: {
    paddingHorizontal: 8,
    marginTop: 6,
  },
});
