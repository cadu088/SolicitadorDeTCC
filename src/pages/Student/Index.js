import React, { useState, useEffect } from "react";
import { TextInput, StyleSheet, Text, View, Image } from "react-native";
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
import { useSystem } from "../../contexts/SystemContext";
import loading from "../../../assets/loading.gif";

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
  const system = useSystem();

  useEffect(() => {
    loadPage();
    return () => {};
  }, []);

  function handlePage(pageValue) {
    setPage(pageValue);
  }

  async function loadPage() {
    system.setPageLoading(true);
    setUserData(await user.getUserStorage());
    await getArea();

    system.setPageLoading(false);
  }

  async function getArea() {
    var usuario = await user.getUserStorage();
    setUserData(usuario);
    try {
      await api
        .post("/area/getPeople", { iD_PESSOA: usuario.id.toString() })
        .then((response) => {
          if (response.data.result.length <= 0) {
            navigation.navigate("AddArea");
          }
        });
      //   const u = await user.getUserStorage();
      console.log("uuuu", usuario);
      console.log("uuuu", usuario);
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
    backgroundColor: colors.blackSpace,
    width: "100%",
    height: "100%",
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
