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
import { Octicons } from "@expo/vector-icons";
import TaskList from "./TaskList";
import { Entypo } from "@expo/vector-icons";
import ModalTaskListDetails from "./ModalTaskListDetails";
import ModalNewTask from "./ModalNewTask";
export default function ModalProjectDetails({
  data,
  isOpen,
  onClose,
  tasks,
  acpeted,
  reload,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalNewTask, setModalNewTask] = useState(false);
  const [showData, setShowData] = useState(0);

  function onOpenModal(id) {
    setModalVisible(true);
    setShowData(id);
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
              width: "100%",
              height: "100%",
              alignSelf: "center",
              // borderRadius: 8,
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
                Projeto
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
                  height: "100%",
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
                    colors={["#4158D0", "#C850C0", "#FFCC70"]}
                    start={{ x: 0.4, y: 0.3 }}
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
                    <Octicons name="project" size={60} color="white" />
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
                    fontSize: 22,
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
                    color: colors.white,
                    fontSize: 15,
                    width: "55%",
                    // fontWeight: 'bold',
                    textAlign: "left",
                    height: 50,
                    alignSelf: "stretch",
                    marginTop: 5,
                    fontWeight: "700",
                  }}
                >
                  Inicio:{" "}
                  <Text style={{ fontWeight: "400", color: colors.gray }}>
                    {data.dT_INICIO}
                  </Text>
                  {"\n"}
                  Finalização:{" "}
                  <Text style={{ fontWeight: "400", color: colors.gray }}>
                    {data.dT_FIM}
                  </Text>
                </Text>
              </View>
              <View
                style={{
                  width: "100%",
                  height: "66%",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: "15%",
                    // backgroundColor: colors.blackGrey,
                    padding: 4,
                    borderRadius: 8,
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
                <View
                  style={{
                    width: "100%",
                    height: "72%",
                    // backgroundColor: colors.blue,
                    // borderWidth: 1,
                    // borderColor: colors.blackGrey,
                    marginTop: 10,
                    borderRadius: 8,
                  }}
                >
                  <SafeAreaView>
                    <ScrollView vertical={true}>
                      {tasks && tasks.length > 0 ? (
                        tasks.map((item, index) => (
                          <TaskList
                            key={index}
                            data={item}
                            project={data}
                            selected={() => onOpenModal(index)}
                          />
                        ))
                      ) : (
                        <View
                          style={{
                            width: "100%",
                            // height: "100%",
                            // backgroundColor: "red",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingTop: 20,
                          }}
                        >
                          <Text style={{ color: colors.white, fontSize: 18 }}>
                            Esse projeto não tem tarefas cadastradas!
                          </Text>
                        </View>
                      )}
                    </ScrollView>
                  </SafeAreaView>
                </View>
                {/* fotter */}
                <View
                  style={{
                    width: "100%",
                    height: "10%",
                    marginTop: 10,
                    borderTopWidth: 1,
                    borderTopColor: colors.gray,
                  }}
                >
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
                      onPress={() => setModalNewTask(true)}
                      style={{
                        backgroundColor: colors.blue_light,
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
                        Novo
                      </Text>
                      <Entypo
                        name="new-message"
                        size={22}
                        color={colors.white}
                      />
                    </TouchableOpacity>
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
                        Reprovar
                      </Text>
                      <Ionicons
                        name="ios-trash-outline"
                        size={22}
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
                        Aprovar
                      </Text>
                      <AntDesign name="checkcircleo" size={22} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {tasks[showData] && (
        <ModalTaskListDetails
          data={tasks[showData]}
          isOpen={modalVisible}
          onClose={(state) => setModalVisible(state)}
        />
      )}
      {modalNewTask && (
        <ModalNewTask
          isOpen={modalNewTask}
          onClose={(state) => setModalNewTask(state)}
          idProject={data.iD_PROJETO}
          create={() => {
            setModalNewTask(false);
            reload();
          }}
        />
      )}
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
});
