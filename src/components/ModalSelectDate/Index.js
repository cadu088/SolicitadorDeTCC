import React, { useEffect, useState } from "react";
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
import api from "../../services/api";
import { useUser } from "../../contexts/UserContext";
import { useSystem } from "../../contexts/SystemContext";
import { SelectList } from "react-native-dropdown-select-list";
import CalendarPicker from "react-native-calendar-picker";

export default function ModalSelectDate({ isOpen, onClose, onDateChange }) {
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
            // height: "75%",
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
              Selecione a data
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
                backgroundColor: colors.white,
                width: "100%",
                borderBottomStartRadius: 8,
                borderBottomEndRadius: 8,
                padding: 8,
                alignSelf: "center",
              },
            ]}
          >
            <CalendarPicker onDateChange={(date) => onDateChange(date)} />
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
  subtag: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    borderLeftWidth: 2,
    borderLeftColor: colors.white,
    paddingLeft: 10,
  },
});
