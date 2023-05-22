import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../styles/colors";
import AdvisorList from "../../components/StudentComponents/AdvisorList";
import SendRequestAdvisor from "../../components/StudentComponents/SendRequestAdvisor";
import WaitingAdvisor from "../../components/StudentComponents/WaitingAdvisor";
import { LinearGradient } from "expo-linear-gradient";

export default function Home() {
  const visu = ["advisors", "createTCC", "details"];
  const [stage, setStage] = useState(0);
  const [advisor, setAdvisor] = useState({});

  function handleStage(newVisu) {
    setStage(visu.indexOf(newVisu));
  }

  const dataTeste = [
    {
      iD_PESSOA: 1,
      NOME: "Humberto Melo",
      DATA: "Desenvolvimento de APIs, Sistemas Web e Mobile",
      IMG: "https://files.uniaraxa.edu.br/assets/apps/lms/img/136-119.png",
    },
    {
      iD_PESSOA: 2,
      NOME: "Robinson Cruz",
      DATA: "Banco de dados, desenvolvimento .NET",
      IMG: "https://sec.uniaraxa.edu.br/assets/lms/Pessoa/255-636645696799475269.jpg",
    },
    {
      iD_PESSOA: 3,
      NOME: "Maurício Júnior",
      DATA: "Inteligência Artificial, Internet das Coisas",
      IMG: "https://sec.uniaraxa.edu.br/assets/lms/Pessoa/193-636687419898079554.jpg",
    },
    {
      iD_PESSOA: 4,
      NOME: "Renato Correa",
      DATA: "Desenvolvimento de APIs, Sistemas Web",
      IMG: "https://sec.uniaraxa.edu.br/assets/lms/Pessoa/61-636645895338423567.png",
    },
    {
      iD_PESSOA: 5,
      NOME: "Renato Correa",
      DATA: "Desenvolvimento de APIs, Sistemas Web",
      IMG: "https://sec.uniaraxa.edu.br/assets/lms/Pessoa/61-636645895338423567.png",
    },
    {
      iD_PESSOA: 6,
      NOME: "Renato Correa",
      DATA: "Desenvolvimento de APIs, Sistemas Web",
      IMG: "https://sec.uniaraxa.edu.br/assets/lms/Pessoa/61-636645895338423567.png",
    },
  ];

  const dataTesteWaiting = [
    {
      ID: 1,
      iD_PESSOA: 1,
      NOME: "Humberto Melo",
      DATA: "Desenvolvimento de APIs, Sistemas Web e Mobile",
      OrientadorIMG:
        "https://sec.uniaraxa.edu.br/assets/lms/Pessoa/61-636645895338423567.png",
      iD_SOLICITACAO: 3,
      AlunoNOME: "Mariana Cortez",
      TITULO:
        "Desenvolvimento de uma extensão de App Inventor para avaliação de interfaces de aplicativos utilizando Machine Learning Mostrar registro completo",
      DESCRICAO:
        "	Lorem ipsum ut viverra orci bibendum sit consectetur urna mattis himenaeos lacus curabitur accumsan, maecenas aenean ultrices duis euismod torquent eleifend iaculis curabitur turpis at. aenean quisque tempus purus pellentesque volutpat cursus massa scelerisque, tristique consectetur ultrices consequat venenatis magna vestibulum eget pharetra, primis congue imperdiet arcu quisque sapien fames. amet donec massa nullam turpis dolor praesent, malesuada accumsan eget aliquam mattis ullamcorper id, elementum nostra vestibulum dolor nunc. imperdiet netus mauris sociosqu rhoncus adipiscing laoreet aliquam mauris imperdiet mauris molestie nec nisl, lacinia conubia mauris mi ultricies magna fusce sapien aliquet lorem suscipit curae. Auctor nunc iaculis aliquam odio condimentum dictum ad pretium interdum, convallis eget malesuada senectus ad augue ipsum semper hac ipsum, scelerisque nibh nisi tellus senectus vestibulum dictumst cras. in auctor accumsan dui neque cras senectus praesent phasellus mi diam aliquet eros, maecenas primis tortor integer ac sodales mollis tempus cras ad. imperdiet auctor mattis, malesuada. ",
      AlunoIMG:
        "https://thumbs.dreamstime.com/b/imagem-do-perfil-das-raparigas-uma-ilustrada-loiras-num-fundo-branco-177134443.jpg",
    },
    {
      ID: 2,
      iD_PESSOA: 1,
      NOME: "Humberto Melo",
      DATA: "Desenvolvimento de APIs, Sistemas Web e Mobile",
      OrientadorIMG:
        "https://sec.uniaraxa.edu.br/assets/lms/Pessoa/61-636645895338423567.png",
      iD_SOLICITACAO: 3,
      AlunoNOME: "Mariana Cortez",
      TITULO:
        "Desenvolvimento de uma extensão de App Inventor para avaliação de interfaces de aplicativos utilizando Machine Learning Mostrar registro completo",
      DESCRICAO:
        "	Lorem ipsum ut viverra orci bibendum sit consectetur urna mattis himenaeos lacus curabitur accumsan, maecenas aenean ultrices duis euismod torquent eleifend iaculis curabitur turpis at. aenean quisque tempus purus pellentesque volutpat cursus massa scelerisque, tristique consectetur ultrices consequat venenatis magna vestibulum eget pharetra, primis congue imperdiet arcu quisque sapien fames. amet donec massa nullam turpis dolor praesent, malesuada accumsan eget aliquam mattis ullamcorper id, elementum nostra vestibulum dolor nunc. imperdiet netus mauris sociosqu rhoncus adipiscing laoreet aliquam mauris imperdiet mauris molestie nec nisl, lacinia conubia mauris mi ultricies magna fusce sapien aliquet lorem suscipit curae. Auctor nunc iaculis aliquam odio condimentum dictum ad pretium interdum, convallis eget malesuada senectus ad augue ipsum semper hac ipsum, scelerisque nibh nisi tellus senectus vestibulum dictumst cras. in auctor accumsan dui neque cras senectus praesent phasellus mi diam aliquet eros, maecenas primis tortor integer ac sodales mollis tempus cras ad. imperdiet auctor mattis, malesuada. ",
      AlunoIMG:
        "https://thumbs.dreamstime.com/b/imagem-do-perfil-das-raparigas-uma-ilustrada-loiras-num-fundo-branco-177134443.jpg",
    },
  ];

  function handleAdvisor(newAdvisor) {
    setAdvisor(newAdvisor);
    handleStage("createTCC");
  }

  function backAdvisor() {
    setAdvisor({});
    handleStage("advisors");
  }

  return (
    <LinearGradient
      colors={["rgba(5,23,111,1)", "rgba(24,95,240,1)"]}
      start={{ x: 0.8, y: 0.4 }}
      style={styles.container}
    >
      {visu[stage] === "advisors" && (
        <>
          <AdvisorList
            data={dataTeste}
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

      {visu[stage] === "details" && <WaitingAdvisor data={dataTesteWaiting} />}
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
    marginTop: 40,
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
