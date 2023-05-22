import React, { useEffect, useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
} from "react-native";
import ChoicePeople from "../../components/MessagesComponents/ChoicePeople";
import Chat from "../../components/MessagesComponents/Chat";
import colors from "../../styles/colors";
import { useSystem } from "../../contexts/SystemContext";
import { useChat } from "../../contexts/ChatContext";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function Msg() {
  const { createChat, closeChat, typeChat, chatUser } = useChat();

  const dataTeste = [
    {
      iD_PESSOA: 1,
      NOME: "Humberto Melo",
      DATA: "Desenvolvimento de APIs, Sistemas Web e Mobile",
      IMG: "https://files.uniaraxa.edu.br/assets/apps/lms/img/136-119.png",
    },
    {
      iD_PESSOA: 2,
      NOME: "Robinson Cruz",
      DATA: "Banco de dados, desenvolvimento .NET",
      IMG: "https://sec.uniaraxa.edu.br/assets/lms/Pessoa/255-636645696799475269.jpg",
    },
    {
      iD_PESSOA: 3,
      NOME: "Maurício Júnior",
      DATA: "Inteligência Artificial, Internet das Coisas",
      IMG: "https://sec.uniaraxa.edu.br/assets/lms/Pessoa/193-636687419898079554.jpg",
    },
    {
      iD_PESSOA: 4,
      NOME: "Renato Correa",
      DATA: "Desenvolvimento de APIs, Sistemas Web",
      IMG: "https://sec.uniaraxa.edu.br/assets/lms/Pessoa/61-636645895338423567.png",
    },
  ];

  function handleChoiceChat(people) {
    const user = {
      id: people.iD_PESSOA,
      name: people.NOME,
      email: "carlos@uniaraxa.edu",
      photo: people.IMG,
      type: "Advisor",
      RA: null,
      usuario: "teste.uni",
      dt: new Date(),
    };

    createChat(user);
  }

  return (
    <View style={styles.container}>
      <View style={styles.listMSG}>
        <LinearGradient
          colors={["rgba(5,23,111,1)", "rgba(24,95,240,1)"]}
          start={{ x: 0.2, y: 0.4 }}
          style={{
            width: "100%",
            height: 100,
            borderRadius: 8,
            border: "none",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Ionicons name="chatbox-ellipses-outline" size={60} color="white" />
        </LinearGradient>
        <SafeAreaView>
          <ScrollView vertical={true}>
            {dataTeste.map((item, index) => (
              <ChoicePeople
                name={item.NOME}
                photo={item.IMG}
                lastNotification={item.DATA}
                notificationCount={index * 36}
                date={new Date().getHours() + ":" + new Date().getMinutes()}
                key={index}
                choice={() => handleChoiceChat(item)}
              />
            ))}
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },
  listMSG: {
    backgroundColor: colors.blackSpace,
    width: "95%",
    height: "90%",
    // paddingHorizontal: 5,
    paddingTop: 55,
    flexWrap: "wrap",
    flexDirection: "column",
  },
});
