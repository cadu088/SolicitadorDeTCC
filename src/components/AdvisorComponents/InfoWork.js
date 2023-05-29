import React, { useEffect, useState } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../styles/colors";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";

import { MaterialIcons } from "@expo/vector-icons";

export default function InfoWork({}) {
  const data = [
    {
      iD_PROJETO: 5,
      iD_SOLICITACAO: 4,
      aluno: {
        iD_PESSOA: 1,
        nome: "CARLOS RODRIGUES",
        iD_TIPO_PESSOA: 2,
        email: "carloseduardors088@gmail.com",
        ra: "042700",
        usuario: "",
        img: "https://avatars.githubusercontent.com/u/72260079?v=4",
        fL_ATIVO: 1,
      },
      professor: {
        iD_PESSOA: 3,
        nome: "Robinson Cruz",
        iD_TIPO_PESSOA: 1,
        email: "robin",
        ra: "NULL",
        usuario: "robinson.cruz",
        img: "https://sec.uniaraxa.edu.br/assets/lms/Pessoa/255-636645696799475269.jpg",
        fL_ATIVO: 1,
      },
      iD_SITUACAO_PROJETO: 5,
      situacaO_PROJETO: "AGUARDANDO CORREÇÃO",
      dT_INICIO: "24/05/2023 22:33:38",
      dT_FIM: "12/12/2023 00:00:00",
      nome: "A POLÍTICA DE ASSISTÊNCIA SOCIAL À LUZ DA VIGILÂNC",
      descricao:
        "Lorem ipsum ut viverra orci bibendum sit consectetur urna mattis himenaeos lacus curabitur accumsan, maecenas aenean ultrices duis euismod torquent eleifend iaculis curabitur turpis at. aenean quisque tempus purus pellentesque volutpat cursus massa sceler",
      dT_APROVACAO: "",
      dT_REPROVACAO: "",
      justificativa: "",
      pessoA_CANCELAMENTO: null,
      dT_CADASTRO: "24/05/2023 22:33:38",
      fL_ATIVO: 1,
    },
  ];

  function item(name, value) {
    return (
      <>
        <Text
          style={{
            color: colors.white,
            fontSize: 17,
            textAlign: "justify",
          }}
        >
          {name}
          {value}
        </Text>
      </>
    );
  }

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: colors.blackSpace,
        borderTopEndRadius: 8,
        borderTopStartRadius: 8,
      }}
    >
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
        {/* <Ionicons name="chatbox-ellipses-outline" size={60} color="white" /> */}
        <Entypo name="network" size={60} color="white" />
      </LinearGradient>
      <View
        style={[
          styles.shadowProp,
          {
            backgroundColor: "#F4F4F415",
            width: "100%",
            // height: 400,
            borderRadius: 8,
            padding: 8,
            marginBottom: 18,
            alignSelf: "center",
            paddingBottom: 10,
          },
        ]}
      >
        <Text
          style={{
            color: colors.white,
            fontWeight: "600",
            fontSize: 18,
            textAlign: "center",
            padding: 5,
            marginBottom: 10,
          }}
        >
          {data[0].nome}
        </Text>

        <Text
          style={{
            color: colors.gray,
            fontSize: 17,
            textAlign: "justify",
          }}
        >
          {data[0].descricao}.
        </Text>
        <Text></Text>
        <View style={{ marginBottom: 40 }}>
          <Text
            style={{
              color: colors.gray,
              fontSize: 15,
              // fontWeight: 'bold',
              textAlign: "left",
              alignSelf: "stretch",
            }}
          >
            <Text
              style={{ color: colors.white, fontWeight: "bold", fontSize: 16 }}
            >
              Inicio do projeto:
            </Text>{" "}
            {data[0].dT_INICIO.slice(0, data[0].dT_INICIO.indexOf(" "))}
          </Text>
          <Text
            style={{
              color: colors.gray,
              fontSize: 15,
              // fontWeight: 'bold',
              textAlign: "left",
              alignSelf: "stretch",
            }}
          >
            <Text
              style={{ color: colors.white, fontWeight: "bold", fontSize: 16 }}
            >
              Fim do projeto:
            </Text>{" "}
            {data[0].dT_FIM.slice(0, data[0].dT_FIM.indexOf(" "))}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <View style={styles.inputInfo}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color={colors.white}
            />
            <Text> </Text>
            <Text style={{ color: colors.white, fontWeight: "bold" }}>
              {data[0].situacaO_PROJETO}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View style={styles.inputAdvisors}>
            <Image
              style={styles.selfPhoto}
              alt="self"
              source={{ uri: data[0].aluno.img }}
            />
            <Text> </Text>
            <Text style={{ color: colors.blackSpace, fontWeight: "bold" }}>
              {data[0].aluno.nome}
            </Text>
          </View>
          <View style={styles.inputAdvisors}>
            <Image
              style={styles.selfPhoto}
              alt="self"
              source={{ uri: data[0].professor.img }}
            />
            <Text> </Text>
            <Text style={{ color: colors.blackSpace, fontWeight: "bold" }}>
              {data[0].professor.nome}
            </Text>
          </View>
        </View>
        <Text
          style={{
            color: colors.gray,
            fontSize: 15,
            // fontWeight: 'bold',
            textAlign: "center",
            alignSelf: "stretch",
            marginTop: 5,
          }}
        >
          Você tem{" "}
          <Text
            style={{ color: colors.white, fontWeight: "bold", fontSize: 17 }}
          >
            {parseInt(
              (new Date(data[0].dT_FIM) - new Date()) / (1000 * 60 * 60 * 24)
            )}{" "}
            dias
          </Text>{" "}
          até a conclusão do projeto
        </Text>

        <Text
          style={{
            color: colors.gray,
            fontSize: 15,
            // fontWeight: 'bold',
            textAlign: "left",
            alignSelf: "stretch",
            marginTop: 10,
          }}
        >
          Criado em: {data[0].dT_CADASTRO}
        </Text>
      </View>
    </View>
  );
}

// 'ID': 1,
// 		'iD_PESSOA':
// 		'NOME':
// 		'DATA':
// 		'OrientadorIMG':
// 		'iD_SOLICITACAO':
// 		'AlunoNOME':
// 		'TITULO':
// 		'DESCRICAO':
// 		'AlunoIMG'

const styles = StyleSheet.create({
  cardSolicited: {
    width: "100%",
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginBottom: 20,
  },
  headerSolicited: {
    backgroundColor: colors.white,
    width: "100%",
    // flexDirection: 'row',
    textAlign: "center",
    alignItems: "center",
    borderBottomColor: colors.blue,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  selfPhoto: {
    width: 24,
    height: 24,
    borderRadius: 100,
    // padding:1
  },
  nameAdvisor: {
    color: colors.blackGrey,
    fontSize: 17,
    paddingLeft: 5,
    // fontWeight: 'bold',
  },
  titleAdvisor: {
    color: colors.blackGrey,
    fontSize: 20,
    paddingLeft: 5,
    fontWeight: "bold",
  },
  bodySolicited: {
    // height: 300,
    // justifyContent: 'center'
    alignItems: "center",
  },
  titleTask: {
    padding: 25,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  bodyTask: {
    paddingTop: 0,
    padding: 10,
    textAlign: "justify",
    fontSize: 15,
  },
  baseboard: {
    borderTopColor: colors.blue,
    borderTopWidth: 1,
    paddingTop: 10,
  },
  inputAdvisors: {
    height: 31,
    borderWidth: 0,
    // width: 135,
    // marginBottom: 16,
    paddingHorizontal: 8,
    borderColor: colors.blue,
    // borderWidth:1.5,
    color: colors.white,
    backgroundColor: "#FFFFFF",
    borderRadius: 100,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingRight: 20,
    paddingLeft: 4,
  },
  inputInfo: {
    height: 35,
    borderWidth: 0,
    // width: 135,
    // marginBottom: 16,
    paddingHorizontal: 8,
    borderColor: colors.blue,
    // borderWidth:1.5,
    color: colors.white,
    backgroundColor: colors.blue_light,
    borderRadius: 100,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingRight: 20,
    paddingLeft: 4,
  },
  selfPhoto: {
    width: 27,
    height: 27,
    borderRadius: 100,
    // borderColor: Colors.white,
    // borderWidth: 1,
    padding: 1,
  },
});
