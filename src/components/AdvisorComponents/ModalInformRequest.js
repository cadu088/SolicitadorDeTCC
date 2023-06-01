import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Keyboard,
} from "react-native";
import Accordion from "../Accordian/Index";
import colors from "../../styles/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function ModalInformRequest({ data, isOpen, onClose, acpeted }) {
  const [justification, setJustification] = useState("");
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        onClose(!isOpen);
      }}
    >
      <View
        style={{
          backgroundColor: "#0B0B0199",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: colors.blackSpace,
            width: "95%",
            height: "75%",
            alignSelf: "center",
            borderRadius: 8,
          }}
        >
          {/* header */}
          <View
            style={{
              backgroundColor: "#F4F4F415",
              width: "100%",
              position: "relative",
              top: 0,
              height: 40,
              borderTopStartRadius: 8,
              borderTopEndRadius: 8,
              justifyContent: "space-between",
              padding: 8,
              textAlign: "center",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                color: colors.white,
                fontSize: 25,
                justifyContent: "center",
                fontWeight: "bold",
              }}
            >
              Solicitação
            </Text>
            <TouchableOpacity onPress={() => onClose(!isOpen)}>
              <AntDesign
                name="closecircleo"
                size={24}
                color={colors.redButton}
                style={{
                  alignSelf: "flex-end",
                }}
              />
            </TouchableOpacity>
          </View>

          {/* body */}
          <View
            style={[
              {
                backgroundColor: colors.blackSpace,
                width: "100%",
                height: 400,
                borderRadius: 8,
                padding: 8,
                marginBottom: 18,
                alignSelf: "center",
              },
            ]}
          >
            {!Keyboard.isVisible() && (
              <TouchableOpacity
                onPress={() => onClose(!isOpen)}
                style={{
                  flexDirection: "row",
                  // justifyContent: 'space-between',
                  width: "100%",
                  height: 100,
                  marginTop: 10,
                }}
              >
                <LinearGradient
                  colors={["rgba(5,23,111,1)", "rgba(24,95,240,1)"]}
                  start={{ x: 0.1, y: 0.2 }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 8,
                    border: "none",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 10,
                  }}
                >
                  {/* <AntDesign name="book" size={60} color="white" /> */}
                  <AntDesign name="rest" size={60} color="white" />
                  {/* <AntDesign name="API" size={60} color="white" /> */}
                  {/* <AntDesign name="form" size={60} color="white" /> */}
                </LinearGradient>
              </TouchableOpacity>
            )}

            <View>
              <Text
                numberOfLines={5}
                ellipsizeMode="clip"
                lineBreakMode="clip"
                style={{
                  color: colors.white,
                  fontSize: 25,
                  width: "100%",
                  fontWeight: "bold",
                  textAlign: "justify",
                  maxWidth: "100%",
                  marginTop: 10,
                }}
              >
                {data.nome}
              </Text>

              <Text
                style={{
                  color: colors.gray,
                  fontSize: 15,
                  width: "55%",
                  // fontWeight: 'bold',
                  textAlign: "left",
                  height: 50,
                  alignSelf: "stretch",
                  marginTop: 5,
                }}
              >
                Criado em: {data.dT_CADASTRO}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                height: "60%",
                // backgroundColor: colors.white,
                padding: 5,
              }}
            >
              <SafeAreaView>
                <ScrollView vertical={true}>
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: 15,
                      textAlign: "justify",
                      paddingRight: 5,
                    }}
                  >
                    {data.descricao}
                  </Text>
                </ScrollView>
              </SafeAreaView>

              {/* <Text
                style={{
                  color: colors.gray,
                  fontSize: 15,
                  width: "55%",
                  // fontWeight: 'bold',
                  textAlign: "left",
                  // height: 50,
                  alignSelf: "stretch",
                  marginTop: 10,
                }}
              >
                Justificativa
              </Text>
              <KeyboardAvoidingView
                style={{
                  borderWidth: 0,
                  width: "100%",
                  // marginBottom: 16,
                  paddingHorizontal: 8,
                  color: colors.blackSpace,
                  backgroundColor: colors.white,
                  borderRadius: 8,
                  fontSize: 16,
                }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <TextInput
                  style={{ height: 50 }}
                  placeholder="Justifique"
                  onChangeText={(text) => setJustification(text)}
                  value={justification}
                  placeholderTextColor={colors.blackSpace}
                />
              </KeyboardAvoidingView> */}
            </View>
          </View>

          {/* footer */}
          <View
            style={{
              width: "100%",
              position: "absolute",
              bottom: 0,
              height: 50,
              borderBottomStartRadius: 8,
              borderBottomEndRadius: 8,
              justifyContent: "center",
              padding: 8,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity
              onPress={() => onClose(!isOpen)}
              style={{
                backgroundColor: colors.redButton,
                width: 100,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 5,
                paddingHorizontal: 10,
                borderRadius: 100,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: colors.white,
                }}
              >
                Negar
              </Text>
              <Ionicons
                name="ios-trash-outline"
                size={24}
                color={colors.white}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                acpeted(
                  data.iD_SOLICITACAO,
                  data.professor.iD_PESSOA,
                  data.aluno.iD_PESSOA
                )
              }
              style={{
                backgroundColor: colors.green_dark,
                width: 100,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 5,
                paddingHorizontal: 10,
                borderRadius: 100,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: colors.white,
                }}
              >
                Aceitar
              </Text>
              <AntDesign name="checkcircleo" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  advisors: {
    width: "100%",
    backgroundColor: "#0B0B0B48",
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
});
