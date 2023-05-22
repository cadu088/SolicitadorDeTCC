import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import Accordion from "../Accordian/Index";
import colors from "../../styles/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";

export default function ModalNewArea({ isOpen, onClose, handleNewArea }) {
  const [newArea, setNewArea] = useState("");

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
        <View style={styles.passwordContainer}>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignContent: "center",
              height: "50%",
            }}
          >
            <TextInput
              style={styles.textInputPassword}
              placeholder="Nova area"
              onChangeText={(text) => setNewArea(text)}
              value={newArea}
              placeholderTextColor={colors.blackGrey}
            />
          </View>
          <View
            style={{
              height: 70,
              width: "100%",
              alignItems: "center",
              marginTop: 20,
              borderTopColor: colors.blackGrey,
              borderTopWidth: 0.8,
              marginBottom: 5,
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity
              style={styles.ButtonStyleCan}
              activeOpacity={0.7}
              onPress={() => onClose()}
            >
              <Text style={styles.MyTextButtonStyle}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.ButtonStyleAdd}
              activeOpacity={0.7}
              onPress={() => handleNewArea(newArea)}
            >
              <Text style={styles.MyTextButtonStyle}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  MyTextButtonStyle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  ButtonStyleAdd: {
    backgroundColor: colors.green_dark,
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
    paddingHorizontal: 30,
  },
  ButtonStyleCan: {
    backgroundColor: colors.redButton,
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
    paddingHorizontal: 30,
  },
  passwordContainer: {
    height: 170,
    // borderColor: colors.white,
    color: colors.blackGrey,
    borderRadius: 8,
    // borderWidth: 2,
    width: "80%",
    // flexDirection: "row",
    justifyContent: "center",
    backgroundColor: colors.white,
    marginTop: 5,
    alignSelf: "center",
    alignContent: "center",
  },
  textInputPassword: {
    height: 50,
    borderWidth: 0,
    width: "90%",
    // borderColor: colors.white,
    color: colors.blackGrey,
    backgroundColor: colors.white,
    borderRadius: 5,
    borderColor: colors.gray,
    borderWidth: 1.5,
    paddingHorizontal: 5,
    alignSelf: "center",
  },
});
