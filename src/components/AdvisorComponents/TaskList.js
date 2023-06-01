import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Accordion from "../../components/Accordian/Index";
import colors from "../../styles/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function TaskList({ data, selected, project }) {
  return (
    <View
      style={[
        styles.shadowProp,
        {
          backgroundColor: "#F4F4F415",
          width: "100%",
          height: 230,
          borderRadius: 8,
          padding: 8,
          marginBottom: 18,
          alignSelf: "center",
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => selected()}
        style={{
          flexDirection: "row",
          // justifyContent: 'space-between',
          width: "100%",
          height: "67%",
        }}
      >
        <LinearGradient
          colors={["rgba(0,116,117,1)", "rgba(232,232,232,1)"]}
          start={{ x: 0.1, y: 0.2 }}
          style={{
            width: "40%",
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

        <View>
          <Text
            numberOfLines={5}
            ellipsizeMode="clip"
            lineBreakMode="clip"
            style={{
              color: colors.white,
              fontSize: 25,
              // minWidth: "55%",
              fontWeight: "bold",
              textAlign: "justify",
              height: "80%",
              width: 230,
              paddingRight: 20,
            }}
          >
            {data.titulo}
          </Text>

          <Text
            style={{
              color: colors.gray,
              fontSize: 15,
              width: "100%",
              // fontWeight: 'bold',
              textAlign: "left",
              height: "20%",
              alignSelf: "stretch",
            }}
          >
            {data.dT_PREVISTA}
            {"\n"}
            {project.professor.nome}
          </Text>
        </View>
      </TouchableOpacity>
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

      {/* //Result */}
      {data.fL_FINALIZADA === 1 && (
        <Text
          style={{
            fontSize: 15,
            zIndex: 5,
            position: "absolute",
            fontWeight: "bold",
            borderRadius: 100,
            width: 40,
            height: 40,
            // margin: -3,
            textAlign: "center",
            display: "flex",
            alignItems: "flex-end",
            // backgroundColor: '#FFFFFFBB',
            justifyContent: "center",
            alignSelf: "flex-start",
          }}
        >
          <MaterialCommunityIcons
            name="check-decagram"
            size={50}
            color={colors.green}
          />
        </Text>
      )}
    </View>
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
