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
import ModalSelectDate from "../ModalSelectDate/Index";

export default function ModalNewTask({ isOpen, onClose, create, idProject }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateInitialized, setDateInitialized] = useState(new Date());
  const [dateFinished, setDateFinished] = useState(new Date());
  const [stage, setStage] = useState({});
  const [listStage, setListStage] = useState([]);
  const [inputDescHeight, setInputDescHeight] = useState(24);
  const [inputTitleHeight, setInputTitleHeight] = useState(24);
  const [modalNewDate, setModalNewDate] = useState(false);
  const [selectDate, setSelectDate] = useState("init");
  const user = useUser();
  const system = useSystem();

  async function getStages() {
    system.setPageLoading(true);
    try {
      await api.get("/worker/getStageTask").then((response) => {
        let result = [];
        if (response.data.result.length > 0) {
          response.data.result.forEach((element) => {
            result.push({ key: element.iD_ETAPA, value: element.descricao });
          });
        }
        setListStage(result);
      });
    } catch (e) {
      alert(e);
      setListStage([]);
    }
    system.setPageLoading(false);
  }

  useEffect(() => {
    getStages();
    return () => {};
  }, []);

  function onDateChange(date) {
    console.log(date);
    setModalNewDate(false);
    if (selectDate === "init") {
      setDateInitialized(new Date(date));
    } else {
      setDateFinished(new Date(date));
    }
  }

  function onOpenDateChange(option) {
    setSelectDate(option);
    setModalNewDate(true);
  }

  async function sendNewTask() {
    if (title === "" || description === "") {
      alert("O titulo e ou descrição estão vazios!");
      return;
    }
    if (stage <= 0) {
      alert("Escolha uma etapa para avançar!");
      return;
    }
    system.setPageLoading(true);
    try {
      await api
        .post("/worker/createTask", {
          iD_PROJETO: idProject,
          iD_ETAPA: stage,
          titulo: title,
          descricao: description,
          dT_INICIO: dateInitialized,
          dT_PREVISTA: dateFinished,
        })
        .then((response) => {
          create();
        });
    } catch (e) {
      console.log(e);
      if (e.response.data.mensagem) {
        alert(e.response.data.mensagem);
      } else {
        alert(e);
      }
    }
    system.setPageLoading(false);
  }

  return (
    <>
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
                Criação de Task
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
              <Text style={styles.subtag}>Titulo</Text>
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
              <Text style={styles.subtag}>Descrição</Text>
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
                  maxLength={200}
                  placeholderTextColor={colors.blackSpace}
                  onContentSizeChange={(e) =>
                    setInputDescHeight(e.nativeEvent.contentSize.height + 24)
                  }
                />
              </KeyboardAvoidingView>

              {listStage.length > 0 && (
                <>
                  <Text style={styles.subtag}>Etapa</Text>
                  <SelectList
                    setSelected={(val) => setStage(val)}
                    data={listStage}
                    save="key"
                    label="Etapa"
                    defaultOption={{ key: 0, value: "Selecione a etapa" }}
                    inputStyles={{ color: colors.black, fontWeight: "bold" }}
                    dropdownTextStyles={{
                      color: colors.black,
                      fontWeight: "bold",
                    }}
                    dropdownStyles={{
                      color: colors.white,
                      backgroundColor: colors.white,
                    }}
                    boxStyles={{
                      color: colors.white,
                      backgroundColor: colors.white,
                    }}
                  />
                </>
              )}
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  marginTop: 20,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    width: "48%",
                    flexDirection: "row",
                    alignItems: "center",
                    textAlign: "center",
                    backgroundColor: colors.blue,
                    padding: 8,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: 20,
                      fontWeight: "bold",
                      marginRight: 10,
                    }}
                  >
                    Inicio:
                  </Text>
                  <TouchableOpacity
                    onPress={() => onOpenDateChange("init")}
                    style={{
                      backgroundColor: colors.blue_light,
                      width: 110,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 5,
                      paddingHorizontal: 10,
                      borderRadius: 8,
                    }}
                  >
                    <AntDesign name="calendar" size={15} color="white" />
                    <Text
                      style={{
                        fontSize: 18,
                        color: colors.white,
                      }}
                    >
                      {` ${dateInitialized.getDate()}/${dateInitialized.getMonth()}/${dateInitialized.getFullYear()}`}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: "48%",
                    flexDirection: "row",
                    alignItems: "center",
                    textAlign: "center",
                    backgroundColor: colors.green_dark,
                    padding: 8,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: 20,
                      fontWeight: "bold",
                      marginRight: 10,
                    }}
                  >
                    Final:
                  </Text>
                  <TouchableOpacity
                    onPress={() => onOpenDateChange("finish")}
                    style={{
                      backgroundColor: colors.green,
                      width: 110,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 5,
                      paddingHorizontal: 10,
                      borderRadius: 8,
                    }}
                  >
                    <AntDesign name="calendar" size={15} color="white" />
                    <Text
                      style={{
                        fontSize: 18,
                        color: colors.white,
                      }}
                    >
                      {` ${dateFinished.getDate()}/${dateFinished.getMonth()}/${dateFinished.getFullYear()}`}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => sendNewTask()}
                style={{
                  backgroundColor: colors.green_dark,
                  width: 70,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 5,
                  paddingHorizontal: 10,
                  borderRadius: 8,
                  marginTop: 20,
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: colors.white,
                  }}
                >
                  Enviar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <ModalSelectDate
        isOpen={modalNewDate}
        onClose={(state) => setModalNewDate(state)}
        onDateChange={(date) => onDateChange(date)}
      />
    </>
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
