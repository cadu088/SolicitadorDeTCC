import React, {useState} from 'react';
import {
    TextInput,
    StyleSheet,
    Text,
    View,
		SafeAreaView,
		ScrollView,
} from 'react-native';

import Accordion from '../../Components/Accordian/Index'

import { MaterialIcons } from '@expo/vector-icons'; 

import colors from '../../styles/colors';
//import Loading from '../../Components/Loading/Loading';

import AsyncStorage from '@react-native-async-storage/async-storage';

const eye = 'eye';
const eyeOff = 'eye-off';



export default function Home() {



return (
    <View style={styles.container}>
			<View style={styles.advisors}>
				<Text style={styles.titleAdvisors}>Orientadores</Text>
				<View style={{maxHeight: 600, marginBottom: 10}}>
					<SafeAreaView style={styles.containerScroll}>
						<ScrollView style={styles.scrollView} vertical={true}>
							<Accordion title="Humberto Melo" data="Desenvolvimento de APIs, Sistemas Web e Mobile" dataImg="https://files.uniaraxa.edu.br/assets/apps/lms/img/136-119.png"/>
							<Accordion title="Robinson Cruz" data="Banco de dados, desenvolvimento .NET" dataImg="https://sec.uniaraxa.edu.br/assets/lms/Pessoa/255-636645696799475269.jpg"/>
							<Accordion title="Maurício Júnior" data="Inteligência Artificial, Internet das Coisas" dataImg="https://sec.uniaraxa.edu.br/assets/lms/Pessoa/193-636687419898079554.jpg"/>
							<Accordion title="Renato Correa" data="Desenvolvimento de APIs, Sistemas Web" dataImg="https://sec.uniaraxa.edu.br/assets/lms/Pessoa/61-636645895338423567.png"/>
							<Accordion title="Nazir Júnior" data="Banco de dados, desenvolvimento .NET" dataImg="https://sec.uniaraxa.edu.br/assets/lms/Pessoa/7-636697411132549488.jpg"/>
						</ScrollView>
					</SafeAreaView>
				</View>
			</View>
			<View style={styles.infos}>
				<Text style={styles.infosTitle}>Escolha um Orientador</Text>
				<Text style={styles.infosBody}>Ele(a) vai acompanhar todo o processo de criação do TCC e ajudar em dúvidas e revisões!</Text>

			</View>
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
});