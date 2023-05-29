import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
  Alert,
} from "react-native";
import colors from "../../styles/colors";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

import ButtonSelectBar from "../ButtonSelectBar/Index";

export default function ButtonTCC(props) {
  // name={item.NOME} title={item.TITULO} img={item.IMG}
  return (
    <TouchableOpacity
      onPress={() => props.onClick()}
      style={{
        width: "100%",
        height: 100,
        backgroundColor: colors.white,
        borderRadius: 8,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Image
          style={styles.selfPhoto}
          alt="self"
          source={{ uri: props.img }}
        />
        <Text
          style={{
            color: colors.blackSpace,
            marginLeft: 10,
            fontWeight: "bold",
          }}
        >
          {props.name}
        </Text>
      </View>
      <View style={{ padding: 10 }}>
        <Text
          style={{
            height: 30,
            width: "100%",
            color: colors.blackSpace,
            fontSize: 15,
            textOverflow: "ellipsis",
          }}
        >
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  selfPhoto: {
    width: 27,
    height: 27,
    borderRadius: 100,
    // borderColor: Colors.white,
    // borderWidth: 1,
    padding: 1,
  },
});
