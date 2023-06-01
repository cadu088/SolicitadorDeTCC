import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Accordion from "../Accordian/Index";
import colors from "../../styles/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Octicons } from "@expo/vector-icons";

export default function ProjectList({ data, selected }) {
  const variações = [
    ["#833ab4", "#fd1d1d", "#fcb045"],
    ["#4158D0", "#C850C0", "#FFCC70"],
    ["#21D4FD", "#B721FF"],
    ["#F4D03F", "#16A085"],
    ["rgba(5,23,111,1)", "rgba(24,95,240,1)"],
    ["rgba(0,116,117,1)", "rgba(232,232,232,1)"],
  ];

  return (
    <TouchableOpacity
      onPress={() => selected()}
      style={[
        styles.shadowProp,
        {
          backgroundColor: "#F4F4F415",
          width: 400,
          height: 100,
          borderRadius: 8,
          padding: 8,
          marginBottom: 18,
          alignSelf: "center",
        },
      ]}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            // backgroundColor: "red",
            width: "87.5%",
            height: "100%",
          }}
        >
          <View
            style={{
              color: colors.gray,
              width: "100%",
              height: "40%",
            }}
          >
            <View
              style={{
                width: "100%",
                height: "100%",
                top: 0,
                position: "absolute",
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 2,
              }}
            >
              <Image
                style={styles.selfPhoto}
                alt="self"
                source={{ uri: data.aluno.img }}
              />
              <Text style={[styles.title, styles.font]}>{data.aluno.nome}</Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              height: "60%",
            }}
          >
            <Text style={{ color: colors.white, top: 5, position: "absolute" }}>
              {data.nome}
            </Text>
            <View
              style={{
                bottom: 0,
                position: "absolute",
                flexDirection: "row",
              }}
            >
              <Text style={{ color: colors.gray, fontWeight: "bold" }}>
                <AntDesign name="calendar" size={15} color="white" />
                {` ${data.dT_FIM.slice(0, data.dT_FIM.indexOf(" "))}`}
              </Text>
              <Text
                style={{
                  color: colors.blue_light,
                  fontWeight: "bold",
                  marginLeft: 20,
                }}
              >
                <AntDesign name="infocirlceo" size={15} />
                {` ${data.situacaO_PROJETO}`}
              </Text>
            </View>
          </View>
        </View>

        <LinearGradient
          colors={["#4158D0", "#C850C0", "#FFCC70"]}
          start={{ x: 0.1, y: 0.2 }}
          style={{
            width: "12.5%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
          }}
        >
          <Octicons name="project" size={20} color="white" />
        </LinearGradient>
      </View>
    </TouchableOpacity>
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
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.white,
    marginLeft: 10,
  },
  selfPhoto: {
    width: 32,
    height: 32,
    borderRadius: 100,
    // borderColor: Colors.white,
    // borderWidth: 1,
    padding: 1,
  },
});
