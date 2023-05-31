import React, { useState, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../styles/colors";
import { Ionicons } from "@expo/vector-icons";
import TaskList from "../../components/StudentComponents/TaskList";
import ModalTaskListDetails from "../../components/StudentComponents/ModalTaskListDetails";
import { useUser } from "../../contexts/UserContext";
import { useSystem } from "../../contexts/SystemContext";
import api from "../../services/api";

export default function Task() {
  const [modalVisible, setModalVisible] = useState(false);
  const [showData, setShowData] = useState(0);
  const [project, setProject] = useState([]);
  const [taskList, setTaskList] = useState([]);
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

  const dataTeste = [
    {
      title: "Crie um Google Forms sobre a população",
      descricao:
        "Lorem ipsum ut viverra orci bibendum sit consectetur urna mattis himenaeos lacus curabitur accumsan, maecenas aenean ultrices duis euismod torquent eleifend iaculis curabitur turpis at. aenean quisque tempus purus pellentesque volutpat cursus massa scelerisque, tristique consectetur ultrices consequat venenatis magna vestibulum eget pharetra, primis congue imperdiet arcu quisque sapien fames. amet donec massa nullam turpis dolor praesent, malesuada accumsan eget aliquam mattis ullamcorper id, elementum nostra vestibulum dolor nunc. imperdiet netus mauris sociosqu rhoncus adipiscing laoreet aliquam mauris imperdiet mauris molestie nec nisl, lacinia conubia mauris mi ultricies magna fusce sapien aliquet lorem suscipit curae. Auctor nunc iaculis aliquam odio condimentum dictum ad pretium interdum, convallis eget malesuada senectus ad augue ipsum semper hac ipsum, scelerisque nibh nisi tellus senectus vestibulum dictumst cras. in auctor accumsan dui neque cras senectus praesent phasellus mi diam aliquet eros, maecenas primis tortor integer ac sodales mollis tempus cras ad. imperdiet auctor mattis, malesuada.",
      dt: "Criado em 22/05/2023 às 23:05",
      people: "Renato Correa",
      color: ["rgba(0,116,117,1)", "rgba(232,232,232,1)"],
      conclud: true,
    },
    {
      title: "Analise profunda da prospecção do ar",
      descricao:
        "Lorem ipsum ut viverra orci bibendum sit consectetur urna mattis himenaeos lacus curabitur accumsan, maecenas aenean ultrices duis euismod torquent eleifend iaculis curabitur turpis at. aenean quisque tempus purus pellentesque volutpat cursus massa scelerisque, tristique consectetur ultrices consequat venenatis magna vestibulum eget pharetra, primis congue imperdiet arcu quisque sapien fames. amet donec massa nullam turpis dolor praesent, malesuada accumsan eget aliquam mattis ullamcorper id, elementum nostra vestibulum dolor nunc. imperdiet netus mauris sociosqu rhoncus adipiscing laoreet aliquam mauris imperdiet mauris molestie nec nisl, lacinia conubia mauris mi ultricies magna fusce sapien aliquet lorem suscipit curae. Auctor nunc iaculis aliquam odio condimentum dictum ad pretium interdum, convallis eget malesuada senectus ad augue ipsum semper hac ipsum, scelerisque nibh nisi tellus senectus vestibulum dictumst cras. in auctor accumsan dui neque cras senectus praesent phasellus mi diam aliquet eros, maecenas primis tortor integer ac sodales mollis tempus cras ad. imperdiet auctor mattis, malesuada.",
      dt: "Criado em 05/05/2023 às 18:01",
      people: "Renato Correa",
      color: ["#21D4FD", "#B721FF"],
      conclud: false,
    },
    {
      title:
        "Crie um banco de dados NoSQL para armazenar todos os dados do trabalho",
      descricao:
        "Lorem ipsum ut viverra orci bibendum sit consectetur urna mattis himenaeos lacus curabitur accumsan, maecenas aenean ultrices duis euismod torquent eleifend iaculis curabitur turpis at. aenean quisque tempus purus pellentesque volutpat cursus massa scelerisque, tristique consectetur ultrices consequat venenatis magna vestibulum eget pharetra, primis congue imperdiet arcu quisque sapien fames. amet donec massa nullam turpis dolor praesent, malesuada accumsan eget aliquam mattis ullamcorper id, elementum nostra vestibulum dolor nunc. imperdiet netus mauris sociosqu rhoncus adipiscing laoreet aliquam mauris imperdiet mauris molestie nec nisl, lacinia conubia mauris mi ultricies magna fusce sapien aliquet lorem suscipit curae. Auctor nunc iaculis aliquam odio condimentum dictum ad pretium interdum, convallis eget malesuada senectus ad augue ipsum semper hac ipsum, scelerisque nibh nisi tellus senectus vestibulum dictumst cras. in auctor accumsan dui neque cras senectus praesent phasellus mi diam aliquet eros, maecenas primis tortor integer ac sodales mollis tempus cras ad. imperdiet auctor mattis, malesuada.",
      dt: "Criado em 05/05/2023 às 18:01",
      people: "Renato Correa",
      color: ["#833ab4", "#fd1d1d", "#fcb045"],
      conclud: false,
    },
  ];

  function onOpenModal(id) {
    setModalVisible(true);
    setShowData(id);
  }

  async function loadingPage() {
    system.setPageLoading(true);
    var usuario = await user.getUserStorage();
    try {
      let project = 0;

      try {
        await api
          .post("/worker/getProject", {
            iD_ALUNO: usuario.id,
            iD_PROFESSOR: 0,
          })
          .then((response) => {
            console.log("getProject", response.data.result[0].iD_PROJETO);
            setProject(response.data.result);
            project = response.data.result[0].iD_PROJETO;
          });
      } catch (e) {
        console.log(e);
        if (
          e.response.data.mensagem ==
          "Nenhuma solcitação para esses parametros!"
        ) {
          project = 0;
        } else {
          alert("Erro ao buscar solcitação");
          project = 0;
        }
      }

      if (project === 0) {
        setTaskList([]);
      } else {
        try {
          await api
            .post("/worker/getTask", {
              iD_PROJETO: project,
            })
            .then((response) => {
              console.log("getTask", response);
              setTaskList(response.data.result);
            });
        } catch (e) {
          console.log(e);
          if (
            e.response.data.mensagem == "Nenhuma tarefa para esses parametros!"
          ) {
            setTaskList([]);
          } else {
            alert("Erro ao buscar solcitação");
            setTaskList([]);
          }
        }
      }
    } catch (e) {
      console.log(e);
      alert(e);
    }
    system.setPageLoading(false);
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
              {taskList.length > 0 ? (
                taskList.map((item, index) => (
                  <TaskList
                    key={index}
                    data={item}
                    project={project[0]}
                    selected={() => onOpenModal(index)}
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
                    Olá! Você ainda não tem tarefas cadastradas!
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

      {taskList[showData] && (
        <ModalTaskListDetails
          data={taskList[showData]}
          isOpen={modalVisible}
          onClose={(state) => setModalVisible(state)}
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
