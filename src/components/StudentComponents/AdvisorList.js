import React from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import Accordion from "../../components/Accordian/Index";
import colors from "../../styles/colors";

export default function AdvisorList({ data, selected }) {
  return (
    <View style={styles.advisors}>
      <Text style={styles.titleAdvisors}>Orientadores</Text>
      <View style={{ maxHeight: 500, marginBottom: 10 }}>
        <SafeAreaView>
          <ScrollView vertical={true}>
            {data.map((item) => (
              <Accordion
                key={item.iD_PESSOA}
                response={() => selected(item)}
                title={item.nome}
                data={item.area}
                dataImg={item.img}
                aceita={item.aceitA_TRABALHO === "S"}
              />
            ))}
          </ScrollView>
        </SafeAreaView>
      </View>
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
