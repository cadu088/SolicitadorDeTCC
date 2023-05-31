import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Keyboard } from "react-native";
import colors from "../../styles/colors";
import AdvisorList from "../../components/StudentComponents/AdvisorList";
import SendRequestAdvisor from "../../components/StudentComponents/SendRequestAdvisor";
import WaitingAdvisor from "../../components/StudentComponents/WaitingAdvisor";
import InfoWork from "../../components/StudentComponents/InfoWork";
import { LinearGradient } from "expo-linear-gradient";
import { useUser } from "../../contexts/UserContext";
import { useSystem } from "../../contexts/SystemContext";
import api from "../../services/api";
import { useNavigation } from "@react-navigation/core";

export default function Home() {
  const visu = ["advisors", "createTCC", "details", "infoWork"];
  const [stage, setStage] = useState(9);
  const [advisor, setAdvisor] = useState({});
  const [requests, setRequests] = useState([]);
  const [project, setProject] = useState([]);
  const [listAdvisor, setListAdvisor] = useState([]);
  const user = useUser();
  const system = useSystem();
  const navigation = useNavigation();

  function handleStage(newVisu) {
    setStage(visu.indexOf(newVisu));
  }

  function handleAdvisor(newAdvisor) {
    setAdvisor(newAdvisor);
    handleStage("createTCC");
  }

  function backAdvisor() {
    setAdvisor({});
    handleStage("advisors");
  }

  async function loadingPage() {
    system.setPageLoading(true);
    var usuario = await user.getUserStorage();
    try {
      let resultrequest = "";
      try {
        await api
          .post("/worker/getRequests", {
            iD_ALUNO: usuario.id,
            iD_PROFESSOR: 0,
          })
          .then((response) => {
            setRequests(response.data.result);
            resultrequest = "details";
          });
      } catch (e) {
        if (
          e.response.data.mensagem ==
          "Nenhuma solcitação para esses parametros!"
        ) {
          resultrequest = "advisors";
          await listinAdvisor(usuario);
        } else {
          alert("Erro ao buscar solcitação");
          resultrequest = "erro";
        }
      }

      let resultproject = "";

      try {
        await api
          .post("/worker/getProject", {
            iD_ALUNO: usuario.id,
            iD_PROFESSOR: 0,
          })
          .then((response) => {
            setProject(response.data.result);
            resultproject = "infoWork";
          });
      } catch (e) {
        if (
          e.response.data.mensagem ==
          "Nenhuma solcitação para esses parametros!"
        ) {
          resultproject = "state";
        } else {
          alert("Erro ao buscar solcitação");
          resultproject = "erro";
        }
      }

      if (resultrequest === "erro" || resultproject === "erro") {
        system.setPageLoading(false);

        return;
      }
      if (resultproject === "state") {
        setStage(visu.indexOf(resultrequest));
      } else {
        setStage(visu.indexOf(resultproject));
      }
    } catch (e) {
      alert(e);
    }
    system.setPageLoading(false);
  }

  async function listinAdvisor(usuario) {
    try {
      await api
        .post("/worker/getAdvisor", {
          iD_PESSOA: usuario.id,
        })
        .then((response) => {
          setListAdvisor(response.data.result);
        });
    } catch (e) {
      if (
        e.response.data.mensagem ==
        "Nenhum professor foi encontrado para esse usuario!"
      ) {
        setListAdvisor([]);
        navigation.navigate("AddArea");
      } else {
        alert(e);
      }
    }
  }

  async function sendRequest(iD_PESSOA, description, title) {
    console.log(iD_PESSOA, description, title);
    system.setPageLoading(true);
    var usuario = await user.getUserStorage();
    const data = {
      iD_ALUNO: usuario.id,
      iD_PROFESSOR: iD_PESSOA,
      nome: title,
      descricao: description,
    };
    try {
      await api.post("/worker/sendRequest", data).then(async (response) => {
        await loadingPage();
      });
    } catch (e) {
      alert(e.response.data.mensagem);
    }
    system.setPageLoading(false);
  }

  useEffect(() => {
    loadingPage();
    return () => {};
  }, []);

  return (
    <LinearGradient
      colors={
        visu[stage] === "infoWork" || stage === 9
          ? ["rgba(34,34,34,1)", "rgba(34,34,34,1)"]
          : ["rgba(5,23,111,1)", "rgba(24,95,240,1)"]
      }
      start={{ x: 0.8, y: 0.4 }}
      style={styles.container}
    >
      {visu[stage] === "advisors" && (
        <>
          <AdvisorList
            data={listAdvisor}
            selected={(dataSelect) => handleAdvisor(dataSelect)}
          />
          <View style={styles.infos}>
            <Text style={styles.infosTitle}>Escolha um Orientador</Text>
            <Text style={styles.infosBody}>
              Ele(a) vai acompanhar todo o processo de criação do TCC e ajudar
              em dúvidas e revisões!
            </Text>
          </View>
        </>
      )}

      {visu[stage] === "createTCC" && (
        <>
          <SendRequestAdvisor
            selectAdvisor={advisor}
            close={() => backAdvisor()}
            sendRequest={(iD_PESSOA, description, title) =>
              sendRequest(iD_PESSOA, description, title)
            }
          />
          <View style={styles.infos}>
            <Text style={styles.infosTitle}>Complete os dados do TCC</Text>
            <Text style={styles.infosBody}>
              Adicione todas as informações para que o orientador analise e
              aprove o Projeto!
            </Text>
          </View>
        </>
      )}

      {visu[stage] === "details" && requests && (
        <WaitingAdvisor data={requests} />
      )}
      {visu[stage] === "infoWork" && project && <InfoWork data={project} />}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.blue,
    alignItems: "center",
    // justifyContent: 'center',
    width: "100%",
    height: "100%",
    paddingTop: 100,
    paddingHorizontal: 10,
  },
  infos: {
    marginTop: Keyboard.isVisible ? 20 : 40,
    width: "100%",
    // backgroundColor: colors.blackSpace,
    // borderColor: colors.blackWhite,
    // borderWidth: 1.5,
    borderRadius: 8,
    padding: 10,
  },
  infosTitle: {
    color: colors.white,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 24,
  },
  infosBody: {
    color: colors.white,
    // fontWeight: 'bold',
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 18,
  },
});
