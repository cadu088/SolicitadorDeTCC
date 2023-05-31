import React, { useEffect, useState } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  Image,
  Button,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
  Modal,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import api from "../../services/api";

import PinButton from "../../components/PinButton/index";
import LinkButton from "../../components/LinkButton/Index";
import imgEscolha from "../../../assets/undraw_Landscape_photographer_5nvi.png";
import colors from "../../styles/colors";
import PageLoader from "../../components/PageLoader/index";
import { useUser } from "../../contexts/UserContext";
import ModalNewArea from "../../components/ModalNewArea/index";
import { LinearGradient } from "expo-linear-gradient";

export default function AddArea() {
  const [areaChoice, setAreaChoice] = useState([]);
  const [dataArea, setDataArea] = useState([]);
  const [isStudent, setIsStudent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [functionAction, setFunctionAction] = useState(() => () => null);
  const navigation = useNavigation();
  const userContext = useUser();
  const [user, setUser] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  async function onLoading() {
    api.get("/area/getAll").then((response) => {
      setDataArea(response.data.result);
    });
    setUser(await userContext.getUserStorage());
  }

  useEffect(() => {
    if (user && user.id) {
      setIsStudent(user.type === "Student");
    }
  }, [user]);

  function handleArea(id) {
    const newAreaChoice = areaChoice.includes(id)
      ? areaChoice.filter((value) => value !== id)
      : [...areaChoice, id];

    setAreaChoice(newAreaChoice);
  }

  useEffect(() => {
    onLoading();
    return () => {};
  }, []);

  async function handleAreaChoice() {
    if (areaChoice.length < 3) {
      alert("Você deve selecionar no minimo três áreas!");
      return;
    }
    setLoading(true);
    try {
      for (let i = 0; i < areaChoice.length; i++) {
        console.log(areaChoice[i]);
        await createLink(user.id, areaChoice[i]);
      }
    } catch (e) {
      alert(e);
    }
    setTimeout(() => {}, 1000);
    setFunctionAction(() => () => goHome());
    setTimeout(() => setLoading(false), 7000);
  }

  async function createLink(people, id) {
    try {
      await api.post("/area/createLink", { iD_PESSOA: people, iD_AREA: id });
    } catch (e) {
      alert("Erro ao adicionar area " + id);
    }
  }

  function goHome() {
    if (isStudent) {
      navigation.navigate("Student");
    } else {
      navigation.navigate("Advisor");
    }
  }
  async function handleAddArea(area) {
    try {
      if (area.replace(" ", "").length > 0) {
        await api.post("/area/create", { descricao: area });
      }

      onLoading();
      setModalOpen(!modalOpen);
    } catch (e) {
      alert(e);
    }
  }
  return (
    <>
      <LinearGradient
        colors={["rgba(5,23,111,1)", "rgba(24,95,240,1)"]}
        start={{ x: 0.8, y: 0.4 }}
        style={styles.container}
      >
        <View
          style={{
            backgroundColor: colors.white,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {user && (
            <View style={styles.infos}>
              <Text style={styles.infosTitle}>Escolha a área</Text>
              <Text style={styles.infosName}>Olá, {user.name}!</Text>
              {isStudent ? (
                <Text style={styles.infosBody}>
                  Para ajudá-lo(a) a escolher a área ideal para o seu trabalho
                  de conclusão de curso, listamos abaixo algumas opções comuns
                  de áreas de pesquisa acadêmica.
                </Text>
              ) : (
                <Text style={styles.infosBody}>
                  Obrigado por se inscrever em nosso sistema de orientação de
                  TCC. Para ajudá-lo a encontrar alunos em áreas de pesquisa que
                  correspondam às suas habilidades e experiência, listamos
                  abaixo algumas áreas comuns de pesquisa acadêmica.{" "}
                </Text>
              )}
            </View>
          )}

          <Image
            style={{ width: 200, height: 240, justifyContent: "center" }}
            alt="escolha"
            source={imgEscolha}
          />
          <SafeAreaView
            style={{
              width: "85%",
              height: 200,
              display: "flex",
              marginTop: -20,
            }}
          >
            <ScrollView vertical={true}>
              <View style={styles.frame}>
                {dataArea.map((item) => (
                  <PinButton
                    key={item.iD_AREA}
                    data={item}
                    setActive={(item) => handleArea(item)}
                    active={areaChoice.includes(item.iD_AREA)}
                  />
                ))}
              </View>
            </ScrollView>
          </SafeAreaView>
          <View style={styles.infos}>
            {isStudent && (
              <Text style={styles.infosBody}>
                É importante lembrar que você deve escolher pelo menos três
                áreas de interesse para avançar na solicitação do seu TCC. Isso
                permitirá que o sistema apresente uma lista de orientadores que
                se encaixem no perfil da sua pesquisa.
              </Text>
            )}
            {!isStudent && (
              <Text style={styles.infosBody}>
                Selecione pelo menos três áreas desejadas e caso a área não
                esteja acima, adicione uma nova abaixo!
              </Text>
            )}
          </View>
          <View
            style={{
              height: 70,
              width: 320,
              alignItems: "center",
              marginTop: 20,
              borderTopColor: colors.blackGrey,
              borderTopWidth: 0.8,
              marginBottom: 20,
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            {!isStudent && (
              <TouchableOpacity
                style={styles.ButtonStyleAdd}
                activeOpacity={0.7}
                onPress={() => setModalOpen(!modalOpen)}
              >
                <Text style={styles.MyTextButtonStyle}>Adicionar</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.ButtonStyleConc}
              activeOpacity={0.7}
              onPress={() => handleAreaChoice()}
            >
              <Text style={styles.MyTextButtonStyle}>Concluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
      <PageLoader
        fadeIn={1000}
        fadeOut={500}
        data={[
          "Aguarde...",
          "Enviando dados",
          "Recebendo pacotes",
          "Criando interface",
        ]}
        isActive={loading}
        action={() => functionAction()}
      />
      <ModalNewArea
        isOpen={modalOpen}
        onClose={() => setModalOpen(!modalOpen)}
        handleNewArea={(area) => handleAddArea(area)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
    color: colors.white,
    width: "100%",
    height: "100%",
  },
  frame: {
    backgroundColor: colors.white,
    // width: 300,
    // height: '80%',
    borderRadius: 8,
    // borderColor: colors.blackWhite,
    // borderWidth: 2,
    display: "flex",
    alignContent: "flex-start",
    justifyContent: "center",
    alignItems: "flex-start",
    // justifyContent: 'space-evenly',
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 2,
    // Width: '85%'
  },
  title: {
    color: colors.white,
    fontSize: 25,
    marginBottom: 10,
    fontWeight: "bold",
  },
  infos: {
    // marginTop: 40,
    width: "90%",
    // backgroundColor: colors.blackSpace,
    // borderColor: colors.blackWhite,
    // borderWidth: 1.5,
    borderRadius: 8,
    padding: 10,
  },
  infosTitle: {
    color: colors.black,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 24,
  },
  infosName: {
    color: colors.black,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "left",
    fontSize: 22,
    paddingLeft: 5,
    marginTop: 20,
  },
  infosBody: {
    // borderColor: 'white',
    // borderWidth: 1,
    padding: 5,
    borderRadius: 8,
    color: colors.black,
    // fontWeight: 'bold',
    justifyContent: "center",
    alignItems: "center",
    textAlign: "justify",
    fontSize: 18,
  },
  MyTextButtonStyle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  ButtonStyleAdd: {
    backgroundColor: colors.green_dark,
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
    paddingHorizontal: 30,
  },
  ButtonStyleConc: {
    backgroundColor: colors.blue,
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
    paddingHorizontal: 30,
  },
});
