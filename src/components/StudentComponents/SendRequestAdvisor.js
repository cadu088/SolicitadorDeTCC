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
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../styles/colors";
import { Feather } from "@expo/vector-icons";

export default function SendRequestAdvisor({
  selectAdvisor,
  close,
  sendRequest,
}) {
  const [inputDescHeight, setInputDescHeight] = useState(24);
  const [inputTitleHeight, setInputTitleHeight] = useState(24);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setTitle("");
    setDescription("");
  }, [selectAdvisor]);

  function verifyInput(iD_PESSOA, description, title) {
    if (description.length < 79) {
      alert("O campo descrição deve ter pelo menos 80 caracteres!");
      return;
    }
    if (title === "") {
      alert("O campo titulo não pode ser vazio!");
      return;
    }
    sendRequest(iD_PESSOA, description, title);
  }

  return (
    <View style={styles.advisors}>
      <Text style={styles.titleAdvisors}>
        {
          <AntDesign
            name="closecircleo"
            onPress={() => close()}
            size={30}
            color={colors.red}
          />
        }{" "}
        Cadastre seu trabalho
      </Text>
      <View style={{ marginBottom: 10 }}></View>
      <View style={{ maxHeight: 330, marginBottom: 10 }}>
        <SafeAreaView style={{ maxHeight: 290 }}>
          <ScrollView vertical={true}>
            <Text style={styles.subtag}>Titulo do projeto</Text>
            <KeyboardAvoidingView
              style={{
                borderWidth: 0,
                width: "100%",
                marginBottom: 16,
                paddingHorizontal: 8,
                color: colors.blackSpace,
                backgroundColor: colors.white,
                borderRadius: 8,
                fontSize: 16,
              }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <TextInput
                style={{ height: inputTitleHeight }}
                placeholder="Titulo do projeto"
                onChangeText={(text) => setTitle(text)}
                value={title}
                placeholderTextColor={colors.blackSpace}
                onContentSizeChange={(e) =>
                  setInputTitleHeight(e.nativeEvent.contentSize.height + 24)
                }
              />
            </KeyboardAvoidingView>
            <Text style={styles.subtag}>Descrição do Projeto</Text>
            <KeyboardAvoidingView
              style={{
                borderWidth: 0,
                width: "100%",
                marginBottom: 16,
                paddingHorizontal: 8,
                color: colors.blackSpace,
                backgroundColor: colors.white,
                borderRadius: 8,
                fontSize: 16,
                textAlign: "left",
                alignSelf: "flex-end",
              }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
            >
              <TextInput
                style={{ height: inputDescHeight }}
                placeholder="Descreva o projeto"
                onChangeText={(text) => setDescription(text)}
                value={description}
                multiline={true}
                numberOfLines={4}
                placeholderTextColor={colors.blackSpace}
                onContentSizeChange={(e) =>
                  setInputDescHeight(e.nativeEvent.contentSize.height + 24)
                }
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </SafeAreaView>
        <View
          style={{
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            marginTop: 10,
            flexDirection: "row",
          }}
        >
          <View style={styles.inputAdvisors}>
            <Image
              style={styles.selfPhoto}
              alt="self"
              source={{ uri: selectAdvisor.img }}
            />
            <Text style={{ color: colors.white, fontWeight: "bold" }}>
              {selectAdvisor.nome}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.buttonSend}
            onPress={() =>
              verifyInput(selectAdvisor.iD_PESSOA, description, title)
            }
          >
            <Feather name="send" size={20} color="white" />
            <Text
              style={{
                color: colors.white,
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Enviar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  advisors: {
    width: "100%",
    backgroundColor: "#0B0B0B48",
    // borderColor: colors.blackWhite,
    // borderWidth: 1.5,
    borderRadius: 8,
    padding: 10,
    maxHeight: 570,
    overflow: "scroll",
  },
  titleAdvisors: {
    color: colors.white,
    fontSize: 22,
    marginBottom: 10,
  },
  containerScroll: {
    // flex: 1,
    // paddingTop: 10,
  },
  scrollView: {},
  input: {
    height: 50,
    borderWidth: 0,
    width: "100%",
    marginBottom: 16,
    paddingHorizontal: 8,
    // borderColor: colors.white,
    color: colors.blackSpace,
    backgroundColor: colors.white,
    borderRadius: 8,
    fontSize: 16,
  },
  subtag: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    borderLeftWidth: 2,
    borderLeftColor: colors.white,
    paddingLeft: 10,
  },
  inputAdvisors: {
    height: 35,
    borderWidth: 0,
    width: 135,
    // marginBottom: 16,
    paddingHorizontal: 8,
    borderColor: colors.blue,
    // borderWidth:1.5,
    color: colors.white,
    backgroundColor: "#087691",
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
  buttonSend: {
    height: 33,
    borderWidth: 0,
    width: 100,
    // marginBottom: 16,
    paddingHorizontal: 8,
    borderColor: colors.blue,
    // borderWidth:1.5,
    color: colors.white,
    backgroundColor: colors.green,
    borderRadius: 100,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingRight: 15,
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
