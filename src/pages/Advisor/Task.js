import React, { useState, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import api from "../../services/api";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../styles/colors";
import { Ionicons } from "@expo/vector-icons";
import ModalProjectDetails from "../../components/AdvisorComponents/ModalProjectDetails";
import { useUser } from "../../contexts/UserContext";
import { useSystem } from "../../contexts/SystemContext";
import ProjectList from "../../components/AdvisorComponents/ProjectList";

export default function Task() {
  const [modalVisible, setModalVisible] = useState(false);
  const [showProject, setShowProject] = useState(0);
  const [showModalProject, setShowModalProject] = useState(false);
  const [project, setProject] = useState([]);
  const [tasks, setTasks] = useState([]);
  const user = useUser();
  const system = useSystem();

  const variações = [
    ["#833ab4", "#fd1d1d", "#fcb045"],
    ["#4158D0", "#C850C0", "#FFCC70"],
    ["#21D4FD", "#B721FF"],
    ["#F4D03F", "#16A085"],
    ["rgba(5,23,111,1)", "rgba(24,95,240,1)"],
    ["rgba(0,116,117,1)", "rgba(232,232,232,1)"],
  ];

  async function loadingPage() {
    system.setPageLoading(true);
    var usuario = await user.getUserStorage();
    console.log(usuario.id);
    try {
      await api
        .post("/worker/getProject", {
          iD_ALUNO: 0,
          iD_PROFESSOR: usuario.id,
        })
        .then((response) => {
          setProject(response.data.result);
        });
    } catch (e) {
      console.log(e);
      if (
        e.response.data.mensagem == "Nenhuma solcitação para esses parametros!"
      ) {
        setProject([]);
      } else {
        alert(e);
        setProject([]);
      }
    }
    system.setPageLoading(false);
  }

  async function openProject(id, index) {
    system.setPageLoading(true);
    try {
      await api
        .post("/worker/getTask", {
          iD_PROJETO: id,
        })
        .then((response) => {
          setTasks(response.data.result);
        });
    } catch (e) {
      if (e.response.data.mensagem == "Nenhuma tarefa para esses parametros!") {
        setTasks([]);
      } else {
        alert(e);
        setShowProject(0);
        setShowModalProject(false);
        setTasks([]);
        system.setPageLoading(false);
        return;
      }
    }
    setShowProject(index);
    setShowModalProject(true);
    system.setPageLoading(false);
  }

  async function closeModalProject() {
    setShowProject(0);
    setShowModalProject(false);
    await loadingPage();
  }

  useEffect(() => {
    loadingPage();
    return () => {};
  }, []);

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView>
          <ScrollView vertical={true}>
            <LinearGradient
              colors={variações[4]}
              start={{ x: 0.2, y: 0.4 }}
              style={{
                width: "95%",
                height: 100,
                borderRadius: 8,
                border: "none",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
                alignSelf: "center",
              }}
            >
              <Ionicons name="layers-outline" size={60} color="white" />
            </LinearGradient>
            <View
              style={{
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              {project.length > 0 ? (
                project.map((item, index) => (
                  <ProjectList
                    key={index}
                    data={item}
                    selected={() => openProject(item.iD_PROJETO, index)}
                  />
                ))
              ) : (
                <View
                  style={{
                    width: 500,
                    // height: "100%",
                    // backgroundColor: "red",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: colors.white, fontSize: 18 }}>
                    Olá! Você ainda não tem projetos cadastrados...
                  </Text>
                </View>
              )}
            </View>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
          </ScrollView>
        </SafeAreaView>
      </View>
      {showModalProject && (
        <ModalProjectDetails
          data={project[showProject]}
          isOpen={showModalProject}
          tasks={tasks}
          onClose={(state) => closeModalProject()}
          reload={() =>
            openProject(project[showProject].iD_PROJETO, showProject)
          }
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blackSpace,
    alignItems: "center",
    paddingTop: 100,
    // justifyContent: 'center',
  },
  textTitle: {
    color: "red",
    fontSize: 28,
    marginBottom: 8,
  },
  textInput: {
    height: 40,
    borderColor: colors.gray,
    borderRadius: 8,
    borderWidth: 1,
    width: "70%",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  textInputPassword: {
    height: 40,
    borderWidth: 0,
    width: "70%",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  buttonIn: {
    backgroundColor: colors.redButton,
    borderRadius: 8,
    height: 50,
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextIn: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  passwordContainer: {
    marginBottom: 16,
    height: 40,
    borderColor: "#dcdce6",
    borderRadius: 8,
    borderWidth: 1,
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconEye: {
    paddingHorizontal: 8,
    marginTop: 6,
  },
  shadowProp: {},
});
