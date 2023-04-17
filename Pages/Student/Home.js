import React, {useState} from 'react';
import {
    TextInput,
    StyleSheet,
    Text,
    View,
		SafeAreaView,
		ScrollView,
		Image
} from 'react-native';

import Accordion from '../../Components/Accordian/Index'

import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 

import colors from '../../styles/colors';
//import Loading from '../../Components/Loading/Loading';

import AsyncStorage from '@react-native-async-storage/async-storage';

const eye = 'eye';
const eyeOff = 'eye-off';



export default function Home() {

	const visu = ['advisors', 'createTCC', 'details']; 
	const [stage, setStage] = useState(0);
	const [advisor, setAdvisor] = useState({});

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	function handleStage(newVisu, dataAdvisor){
		setStage(visu.indexOf(newVisu));
		setAdvisor(dataAdvisor)
	}

	const dataTeste = [{
		'iD_PESSOA': 1,
		'NOME': 'Humberto Melo',
		'DATA': 'Desenvolvimento de APIs, Sistemas Web e Mobile',
		'IMG': 'https://files.uniaraxa.edu.br/assets/apps/lms/img/136-119.png'
	},{
		'iD_PESSOA': 2,
		'NOME': 'Robinson Cruz',
		'DATA': 'Banco de dados, desenvolvimento .NET',
		'IMG': 'https://sec.uniaraxa.edu.br/assets/lms/Pessoa/255-636645696799475269.jpg'
	},{
		'iD_PESSOA': 3,
		'NOME': 'Maurício Júnior',
		'DATA': 'Inteligência Artificial, Internet das Coisas',
		'IMG': 'https://sec.uniaraxa.edu.br/assets/lms/Pessoa/193-636687419898079554.jpg'
	},{
		'iD_PESSOA': 4,
		'NOME': 'Renato Correa',
		'DATA': 'Desenvolvimento de APIs, Sistemas Web',
		'IMG': 'https://sec.uniaraxa.edu.br/assets/lms/Pessoa/61-636645895338423567.png'
	}]

return (
    <View style={styles.container}>
			{visu[stage] === 'advisors' && (<>
				<View style={styles.advisors}>
					<Text style={styles.titleAdvisors}>Orientadores</Text>
					<View style={{maxHeight: 600, marginBottom: 10}}>
						<SafeAreaView style={styles.containerScroll}>
							<ScrollView style={styles.scrollView} vertical={true}>
								{dataTeste.map((item) => (
									<Accordion 
										key={item.iD_PESSOA}
										response={(newVisu) => handleStage(newVisu, item)} 
										title={item.NOME} 
										data={item.DATA} 
										dataImg={item.IMG}
									/>
									))}
								</ScrollView>
						</SafeAreaView>
					</View>
			</View>
			<View style={styles.infos}>
				<Text style={styles.infosTitle}>Escolha um Orientador</Text>
				<Text style={styles.infosBody}>Ele(a) vai acompanhar todo o processo de criação do TCC e ajudar em dúvidas e revisões!</Text>
			</View>
			</>)}

			{visu[stage] === 'createTCC' && (
				<>
					<View style={styles.advisors}>
					
						<Text style={styles.titleAdvisors}>{<AntDesign name="leftcircleo" onPress={() => handleStage('advisors','')} size={30} color={colors.white} />}  Cadastre seu trabalho</Text>
						<View style={{maxHeight: 600, marginBottom: 10}}>
							<SafeAreaView style={styles.containerScroll}>
								<ScrollView style={styles.scrollView} vertical={true}>
									<Text style={styles.subtag}>Titulo do projeto</Text>
									<TextInput
										style={styles.input}
										placeholder="Titulo do projeto"
										onChangeText={text => setTitle(text)}
										value={title}
										placeholderTextColor={colors.blackSpace}
									/>
									<Text style={styles.subtag}>Descrição do Projeto</Text>
									{/* multiline={true} */}
									<TextInput
										style={styles.inputTextArea}
										placeholder="Descreva o projeto"
										onChangeText={text => setDescription(text)}
										value={description}
										multiline={true}
										numberOfLines={4}
										placeholderTextColor={colors.blackSpace}
									/>
									<View style={{justifyContent: 'center', width: '100%', alignItems: 'center'}}>
										<View style={styles.inputAdvisors}>
											{/* <Image /> */}
											<Image
												style={styles.selfPhoto}
												alt='self'
												source={{ uri: advisor.IMG }}
											/>
											<Text style={{color: colors.white, fontWeight: 'bold'}}>{advisor.NOME}</Text>
										</View>
									</View>
								</ScrollView>
							</SafeAreaView>
						</View>
					</View>
					<View style={styles.infos}>
						<Text style={styles.infosTitle}>Complete os dados do TCC</Text>
						<Text style={styles.infosBody}>Adicione todas as informações para que o orientador analise e aprove o Projeto!</Text>
					</View>
				</>
			)}

			{visu[stage] === 'details' && (
				<>
				<View style={styles.advisors}>
					<Text>Info dos professores</Text>
				</View>
				</>
			)}
			
    </View>

);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.blue,
		alignItems: 'center',
		// justifyContent: 'center',
		width: '100%',
		height: '100%',
		paddingTop: 100,
		paddingHorizontal: 10,
	},
	advisors: {
		width: '100%',
		backgroundColor: colors.blackSpace,
		// borderColor: colors.blackWhite,
		// borderWidth: 1.5,
		borderRadius: 8,
		padding: 10,
		maxHeight: 570,
		overflow:'scroll'
	},
	titleAdvisors: {
		color: colors.white,
		fontSize: 22,
		marginBottom:10
	}, 
	infos:{
		marginTop: 40,
		width: '100%',
		// backgroundColor: colors.blackSpace,
		// borderColor: colors.blackWhite,
		// borderWidth: 1.5,
		borderRadius: 8,
		padding: 10
	},
	infosTitle:{
		color: colors.white,
		fontWeight: 'bold',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		fontSize: 24
	},
	infosBody:{
		color: colors.white,
		// fontWeight: 'bold',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		fontSize: 18
	},
	containerScroll: {
    // flex: 1,
    // paddingTop: 10,
  },
  scrollView: {

  },
	input:{
		height: 50,
    borderWidth: 0,
    width: '100%',
    marginBottom: 16,
    paddingHorizontal: 8,
		// borderColor: colors.white,
		color: colors.blackSpace,
		backgroundColor: colors.white,
		borderRadius: 8,
		fontSize:16
	},
	inputTextArea:{
		height: 200,
    borderWidth: 0,
    width: '100%',
    marginBottom: 16,
    paddingHorizontal: 8,
		// borderColor: colors.white,
		color: colors.blackSpace,
		backgroundColor: colors.white,
		borderRadius: 8,
		fontSize:16,
		textAlign: 'left',
		alignSelf: 'flex-end'
	},
	subtag: {
		color: colors.white,
		fontSize: 18,
		fontWeight:'bold',
		marginBottom: 10,
		borderLeftWidth: 2,
		borderLeftColor: colors.blackGrey,
		paddingLeft: 10,
	}, 
	inputAdvisors:{
		height: 35,
    borderWidth: 0,
    width: 140,
    // marginBottom: 16,
    paddingHorizontal: 8,
		// borderColor: colors.white,
		color: colors.white,
		backgroundColor: colors.blue_light,
		borderRadius: 100,
		fontSize:16,
		fontWeight:'bold',
		textAlign: 'center',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		paddingRight: 20,
	},	selfPhoto: {
		width: 27,
		height: 27,
		borderRadius: 100,
		// borderColor: Colors.white,
		// borderWidth: 1,
		padding:1
	},
});