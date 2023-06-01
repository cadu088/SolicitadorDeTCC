import React, { useEffect, useState } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import ModalInformRequest from "../../components/AdvisorComponents/ModalInformRequest";

import AccordianNotification from "../../components/AccordianNotification/Index";
import colors from "../../styles/colors";
import { useUser } from "../../contexts/UserContext";
import { useSystem } from "../../contexts/SystemContext";
import api from "../../services/api";
import ButtonTCC from "../../components/ButtonTCC/index";

export default function Home() {
  const visu = ["advisors", "createTCC", "details"];
  const [stage, setStage] = useState(0);
  const [advisor, setAdvisor] = useState("");
  const [loadingSolici, setLoadingSolici] = useState(false);
  const [loadingNotification, setLoadingNotification] = useState(false);
  const [modalSolici, setModalSolici] = useState(false);
  const [peopleSetSolici, setPeopleSetSolici] = useState(0);
  const [requests, setRequests] = useState([]);

  const user = useUser();
  const system = useSystem();

  function handleStage(newVisu, dataAdvisor) {
    setStage(visu.indexOf(newVisu));
    setAdvisor(dataAdvisor);
  }

  const listSolici = [
    {
      iD_SOLICITACAO: 3,
      aluno: {
        iD_PESSOA: 1,
        nome: "CARLOS RODRIGUES",
        iD_TIPO_PESSOA: 2,
        email: "carloseduardors088@gmail.com",
        ra: "042700",
        usuario: "",
        img: "https://avatars.githubusercontent.com/u/72260079?v=4",
        fL_ATIVO: 1,
      },
      professor: {
        iD_PESSOA: 4,
        nome: "Renato Correa",
        iD_TIPO_PESSOA: 1,
        email: "renato",
        ra: "NULL",
        usuario: "renato.correa",
        img: "https://sec.uniaraxa.edu.br/assets/lms/Pessoa/61-636645895338423567.png",
        fL_ATIVO: 1,
      },
      iD_SITUACAO: 2,
      situacao: "REPROVADO",
      nome: "Aprovações acadêmicas públicas e auditáveis com o uso de blockchain implementadas no padrão de soulbound token",
      descricao:
        "Lorem ipsum ut viverra orci bibendum sit consectetur urna mattis himenaeos lacus curabitur accumsan, maecenas aenean ultrices duis euismod torquent eleifend iaculis curabitur turpis at. aenean quisque tempus purus pellentesque volutpat cursus massa scelerisque, tristique consectetur ultrices consequat venenatis magna vestibulum eget pharetra, primis congue imperdiet arcu quisque sapien fames. amet donec massa nullam turpis dolor praesent, malesuada accumsan eget aliquam mattis ullamcorper id, elementum nostra vestibulum dolor nunc. imperdiet netus mauris sociosqu rhoncus adipiscing laoreet aliquam mauris imperdiet mauris molestie nec nisl, lacinia conubia mauris mi ultricies magna fusce sapien aliquet lorem suscipit curae. Auctor nunc iaculis aliquam.",
      dT_APROVACAO: "",
      dT_REPROVACAO: "24/05/2023 21:29:49",
      justificativa: "Não atendeu aos requisitos requisitados",
      pessoA_REPROVACAO: {
        iD_PESSOA: 4,
        nome: "Renato Correa",
        iD_TIPO_PESSOA: 1,
        email: "renato",
        ra: "NULL",
        usuario: "renato.correa",
        img: "https://sec.uniaraxa.edu.br/assets/lms/Pessoa/61-636645895338423567.png",
        fL_ATIVO: 1,
      },
      dT_CADASTRO: "21/05/2023 22:55:46",
      fL_ATIVO: 1,
    },
  ];

  const dataTeste = [
    {
      iD_SOLICITACAO: 1,
      NOME: "Carlos Rodriguess",
      TITULO:
        "Aprovações acadêmicas públicas e auditáveis com o uso de blockchain implementadas no padrão de soulbound token",
      IMG: "https://avatars.githubusercontent.com/u/72260079?v=4",
    },
    {
      iD_SOLICITACAO: 2,
      NOME: "Rogerio Nascimento",
      TITULO: "Sistema para gerenciamento de tarefas com gamificação",
      IMG: "https://thumbs.dreamstime.com/b/imagem-de-perfil-meninos-uma-ilustrada-do-dos-loiros-sobre-um-fundo-branco-177134636.jpg",
    },
    {
      iD_SOLICITACAO: 3,
      NOME: "Mariana Cortez",
      TITULO:
        "Desenvolvimento de uma extensão de App Inventor para avaliação de interfaces de aplicativos utilizando Machine Learning Mostrar registro completo",
      IMG: "https://thumbs.dreamstime.com/b/imagem-do-perfil-das-raparigas-uma-ilustrada-loiras-num-fundo-branco-177134443.jpg",
    },
    {
      iD_SOLICITACAO: 4,
      NOME: "João Paulo Fagundes",
      TITULO:
        "Proposta de um Modelo de Automação de Quadro Kanban com abordagem Bpm: Estudo de Caso em uma Empresa de Diagnóstico com Bpm System",
      IMG: "https://4maos.com.br/wp-content/uploads/2022/10/d0e3603e3ff62c97aa02f7974ba9f5cc.jpg",
    },
  ];

  function openModal(index) {
    setModalSolici(!modalSolici);
    setPeopleSetSolici(index);
  }

  async function loadingPage() {
    system.setPageLoading(true);
    var usuario = await user.getUserStorage();
    try {
      await api
        .post("/worker/getRequests", {
          iD_ALUNO: 0,
          iD_PROFESSOR: usuario.id,
        })
        .then((response) => {
          setRequests(
            response.data.result.filter((item) => item.iD_SITUACAO === 1)
          );
        });
    } catch (e) {
      if (
        e.response.data.mensagem == "Nenhuma solcitação para esses parametros!"
      ) {
        setRequests([]);
      } else {
        alert("Erro ao buscar solcitação");
        setRequests([]);
      }
    }
    system.setPageLoading(false);
  }

  async function confirmRequest(id, advisor, student) {
    console.log(id, advisor, student);
    system.setPageLoading(true);
    try {
      await api
        .post("/worker/createProject", {
          iD_ALUNO: student,
          iD_PROFESSOR: advisor,
          iD_SOLICITACAO: id,
        })
        .then((response) => {
          // console.log(response);
          setModalSolici(false);
          loadingPage();
        });
    } catch (e) {
      if (
        e.response.data.mensagem == "Nenhuma solcitação para esses parametros!"
      ) {
        // setRequests([]);
      } else {
        alert(e);
      }
    }
    system.setPageLoading(false);
  }

  useEffect(() => {
    loadingPage();
    return () => {};
  }, []);

  return (
    <>
      <View
        // colors={["rgba(5,23,111,1)", "rgba(24,95,240,1)"]}
        // start={{ x: 0.8, y: 0.4 }}
        style={styles.container}
      >
        <View
          style={{
            width: "100%",
            height: 400,
            backgroundColor: "#F4F4F415",
            borderRadius: 8,
            padding: 8,
          }}
        >
          {loadingSolici ? (
            <ActivityIndicator size={50} color={colors.blackSpace} />
          ) : (
            <>
              <Text
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: "bold",
                  marginBottom: 10,
                  color: colors.white,
                }}
              >
                Solicitações de orientação
              </Text>
              {requests.length > 0 ? (
                <SafeAreaView style={{ height: 350, borderRadius: 8 }}>
                  <ScrollView vertical={true} style={{ borderRadius: 8 }}>
                    {requests.map((item, index) => (
                      <ButtonTCC
                        name={item.aluno.nome}
                        title={item.nome}
                        img={item.aluno.img}
                        key={item.iD_SOLICITACAO}
                        onClick={() => openModal(index)}
                      />
                    ))}
                  </ScrollView>
                </SafeAreaView>
              ) : (
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: colors.white, fontSize: 15 }}>
                    Você ainda não tem solicitações...
                  </Text>
                </View>
              )}
            </>
          )}
        </View>

        <View
          style={{
            marginTop: 15,
            width: "100%",
            height: 95,
            backgroundColor: "#F4F4F415",
            borderRadius: 8,
            padding: 5,
            borderColor: colors.white,
            borderLeftWidth: 5,
          }}
        >
          <Text
            style={{
              width: "100%",
              textAlign: "left",
              fontSize: 18,
              fontWeight: "bold",
              // marginBottom: 10,
              color: colors.white,
            }}
          >
            Notificações
          </Text>
          {loadingNotification ? (
            <ActivityIndicator size={50} color={colors.blackSpace} />
          ) : (
            <View
              style={{
                flexDirection: "row",
                padding: 5,
              }}
            >
              <SafeAreaView style={{ height: 75, borderRadius: 8 }}>
                <ScrollView
                  vertical={false}
                  horizontal={true}
                  style={{ borderRadius: 8 }}
                >
                  {dataTeste.map((item) => (
                    <AccordianNotification
                      key={item.TITULO}
                      dataImg={item.IMG}
                      data={item.TITULO}
                      response={() => console.log("a")}
                      qtdMSG={item.iD_SOLICITACAO * 41}
                    />
                  ))}

                  {dataTeste.map((item) => (
                    <AccordianNotification
                      key={item.TITULO}
                      dataImg={item.IMG}
                      data={item.TITULO}
                      response={() => console.log("a")}
                      qtdMSG={item.iD_SOLICITACAO * 3}
                    />
                  ))}
                </ScrollView>
              </SafeAreaView>
            </View>
          )}

          {/* <Text 
					style={{
						width: '100%', 
						textAlign: 'center', 
						fontSize: 18, 
						fontWeight: 'bold',
						marginBottom: 10,
						color:colors.white
					}}
				>
					Notificações
				</Text> */}
        </View>

        <View
          style={{
            marginTop: 15,
            width: "100%",
            height: 150,
            backgroundColor: "#F4F4F415",
            borderRadius: 8,
            padding: 5,
            alignItems: "center",
            justifyContent: "center",
            // borderColor: "#0B0B0B70",
            // borderWidth: 2,
          }}
        >
          <View style={styles.infos}>
            <Text style={styles.infosTitle}>Lembre-se</Text>
            <Text style={styles.infosBody}>
              As entregas devem ser feitas até o dia 12/10/2023! Para que haja
              tempo, é necessário que alinhe um prazo com o aluno e evite
              maiores problemas na finalização dos trabalhos.
            </Text>
          </View>
          {/* <Image
					style={{width: '100%', height: '100%', borderRadius:8}}
					alt='self'
					source={{ uri: 'https://site.uniaraxa.edu.br/wp-content/uploads/2023/02/Banner-I-Pre-Classificados.jpg' }}
				/> */}
        </View>
      </View>
      {requests[peopleSetSolici] && (
        <ModalInformRequest
          data={requests[peopleSetSolici]}
          isOpen={modalSolici}
          onClose={(state) => setModalSolici(state)}
          acpeted={(id, advisor, student) =>
            confirmRequest(id, advisor, student)
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
    // justifyContent: 'center',
    width: "100%",
    height: "100%",
    paddingTop: 100,
    paddingHorizontal: 10,
  },
  advisors: {
    width: "100%",
    backgroundColor: colors.blackSpace,
    // borderColor: colors.blackWhite,
    // borderWidth: 1.5,
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
  infos: {
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
  containerScroll: {
    // flex: 1,
    // paddingTop: 10,
  },
  scrollView: {},
  input: {
    height: 50,
    borderWidth: 0,
    width: "100%",
    marginBottom: 16,
    paddingHorizontal: 8,
    // borderColor: colors.white,
    color: colors.blackSpace,
    backgroundColor: colors.white,
    borderRadius: 8,
    fontSize: 16,
  },
  inputTextArea: {
    height: 200,
    borderWidth: 0,
    width: "100%",
    marginBottom: 16,
    paddingHorizontal: 8,
    // borderColor: colors.white,
    color: colors.blackSpace,
    backgroundColor: colors.white,
    borderRadius: 8,
    fontSize: 16,
    textAlign: "left",
    alignSelf: "flex-end",
  },
  subtag: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    borderLeftWidth: 2,
    borderLeftColor: colors.blackGrey,
    paddingLeft: 10,
  },
  inputAdvisors: {
    height: 50,
    borderWidth: 0,
    width: "100%",
    marginBottom: 16,
    paddingHorizontal: 8,
    // borderColor: colors.white,
    color: colors.white,
    backgroundColor: colors.green,
    borderRadius: 8,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  selfPhoto: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 10,
    // borderColor: Colors.white,
    // borderWidth: 1,
    padding: 1,
  },
});
