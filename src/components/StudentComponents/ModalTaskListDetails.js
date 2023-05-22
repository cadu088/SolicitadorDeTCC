import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import Accordion from "../Accordian/Index";
import colors from "../../styles/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function ModalTaskListDetails({ data, isOpen, onClose }) {
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
              Tarefa
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
                // height: 400,
                borderRadius: 8,
                padding: 8,
                marginBottom: 18,
                alignSelf: "center",
              },
            ]}
          >
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
                colors={data.color}
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
                <AntDesign name="earth" size={60} color="white" />
                {/* <AntDesign name="API" size={60} color="white" /> */}
                {/* <AntDesign name="form" size={60} color="white" /> */}
              </LinearGradient>
            </TouchableOpacity>
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
                {data.title}
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
                {data.dt}
                {"\n"}
                {data.people}
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
            </View>
          </View>

          {/* footer */}
          <View
            style={{
              width: "100%",
              position: "absolute",
              bottom: 0,
              height: 60,
              borderBottomStartRadius: 8,
              borderBottomEndRadius: 8,
              justifyContent: "center",
              padding: 8,
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: colors.green_dark,
                width: 200,
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
                Marcar como concluida
              </Text>
              <AntDesign name="checkcircleo" size={24} color="white" />
            </View>
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
