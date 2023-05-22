import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import colors from "../../styles/colors";

export default function LinkButton(props) {
  return (
    <>
      <TouchableOpacity
        style={styles.MyButtonStyle}
        activeOpacity={0.7}
        {...props}
      >
        <Text style={styles.MyTextButtonStyle}> {props.title} </Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  MyButtonStyle: {
    backgroundColor: colors.blue_light,
    borderRadius: 8,
    height: 50,
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  MyTextButtonStyle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});
