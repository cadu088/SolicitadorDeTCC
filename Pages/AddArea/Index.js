import React, {useEffect, useState} from 'react';
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
		ActivityIndicator
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import api from '../../services/api';

import PinButton  from '../../Components/PinButton/index';
import LinkButton from '../../Components/LinkButton/Index';
import imgEscolha from '../../assets/undraw_Landscape_photographer_5nvi.png'

import colors from '../../styles/colors';
//import Loading from '../../Components/Loading/Loading';

import { Switch } from 'react-native-gesture-handler';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MyButton  from '../../Components/MyButton/Index';
import PageLoader from '../../Components/PageLoader/index'
const eye = 'eye';
const eyeOff = 'eye-off';



export default function AddArea() {

	let data = [
    {
      "iD_AREA": 1,
      "descricao": "Sistemas de Informação"
    },
    {
      "iD_AREA": 3,
      "descricao": "Direito"
    },
    {
      "iD_AREA": 4,
      "descricao": "IoT"
    },
    {
      "iD_AREA": 5,
      "descricao": "Administração"
    },
    {
      "iD_AREA": 6,
      "descricao": "Agronomia"
    },
    {
      "iD_AREA": 7,
      "descricao": "Biomedicina"
    },
    {
      "iD_AREA": 8,
      "descricao": "Ciências Contábeis"
    },
    {
      "iD_AREA": 9,
      "descricao": "Fisioterapia"
    },
    {
      "iD_AREA": 10,
      "descricao": "Administração e Negócios"
    },
    {
      "iD_AREA": 11,
      "descricao": "Ciência da Computação e Tecnologia"
    },
    {
      "iD_AREA": 12,
      "descricao": "Ciências Sociais e Humanas"
    },
    {
      "iD_AREA": 13,
      "descricao": "Educação e Ensino"
    },
    {
      "iD_AREA": 14,
      "descricao": "Engenharia e Tecnologia"
    },
    {
      "iD_AREA": 15,
      "descricao": "Medicina e Saúde"
    },
    {
      "iD_AREA": 16,
      "descricao": "Meio Ambiente"
    },
    {
      "iD_AREA": 17,
      "descricao": "Sustentabilidade"
    },
    {
      "iD_AREA": 18,
      "descricao": "Artes e Humanidades"
    },
    {
      "iD_AREA": 19,
      "descricao": "Justiça"
    }
  ]
  const [areaChoice, setAreaChoice] = useState([])
	const [dataArea, setDataArea] = useState(data)
	const [isStudent, setIsStudent] = useState(false)
	const [loading, setLoading] = useState(false);
	const [newArea, setNewArea] = useState('');
	const [functionAction, setFunctionAction] = useState(() => () => null);
	const navigation = useNavigation();

	function onLoading(){
	// 	api.get('/area/getAll').then((response) => {
	// 		setDataArea(response.data.result);
	//  });
	}

	function handleArea(id){
		const newAreaChoice = areaChoice.includes(id)
			? areaChoice.filter(value => value !== id)
			: [...areaChoice, id];
	
		setAreaChoice(newAreaChoice);
	}

	useEffect(() => {
		onLoading();
	},[]);

	function handleAreaChoice(){
		if(areaChoice.length < 3) {
			alert('Você deve selecionar no minimo três áreas!');
			return;
		}
		setLoading(true);
		setFunctionAction(() => () => goHome());
		setTimeout(() => setLoading(false), 7000)
	}
 
	function goHome() {
		if(isStudent){
			navigation.navigate('Student');  
		}else{
			navigation.navigate('Advisor');  
		}
	}
	function handleAddArea(){
		data.push({
      "iD_AREA": data.length + 2,
      "descricao": newArea
    });
		setDataArea(data);
		setNewArea('');
	}
  return (<>
		<SafeAreaView style={styles.container}>
			<View style={{backgroundColor: colors.white, borderRadius:8,justifyContent: 'center', alignItems: 'center',}}>
				<View style={styles.infos}>
					<Text style={styles.infosTitle}>Escolha a área</Text>
					<Text style={styles.infosName}>Olá, {isStudent ? 'Carlos': 'Maurício'}!</Text>
					{isStudent ? (<Text style={styles.infosBody}>
						Para ajudá-lo(a) a escolher a área ideal para o seu trabalho de conclusão de curso, listamos abaixo algumas opções comuns de áreas de pesquisa acadêmica.
					</Text>)
					: (<Text style={styles.infosBody}>
						Obrigado por se inscrever em nosso sistema de orientação de TCC. Para ajudá-lo a encontrar alunos em áreas de pesquisa que correspondam às suas habilidades e experiência, listamos abaixo algumas áreas comuns de pesquisa acadêmica.					</Text>)
					}
					
				</View>
				
				<Image
					style={{width:200, height: 240, justifyContent: 'center'}}
					alt='escolha'
					source={imgEscolha}
				/>
				<SafeAreaView style={{ width: '85%' ,height: 130, display:'flex', marginTop: -20}}>
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
							É importante lembrar que você deve escolher pelo menos três áreas de interesse para avançar na solicitação do seu TCC. Isso permitirá que o sistema apresente uma lista de orientadores que se encaixem no perfil da sua pesquisa.
						</Text>
					)}
					{!isStudent && (
						<Text style={styles.infosBody}>			
							Selecione pelo menos três áreas desejadas e	caso a área não esteja acima, adicione uma nova abaixo!		
						</Text>
					)}
					{!isStudent && (
						<View style={styles.passwordContainer}>
							<TextInput
								style={styles.textInputPassword}
								placeholder="Nova area"
								onChangeText={text => setNewArea(text)}
								value={newArea}
								placeholderTextColor={colors.blackGrey}
							/>
							<Feather
								style={styles.iconEye}
								name={'plus'}
								size={28}
								color={colors.green}
								
								onPress={handleAddArea}
							/>
						</View>
					)}

					
				</View>
				<View style={{height: 70, width: 320, alignItems: 'center', marginTop: 20, borderTopColor: colors.blackGrey, borderTopWidth: 0.8, marginBottom: 20}}>
					<LinkButton title='Concluir' onPress={() => handleAreaChoice()} />
				</View>
			</View>
		</SafeAreaView>
		<PageLoader fadeIn={1000} fadeOut={500} data={['Aguarde...', 'Enviando dados', 'Recebendo pacotes', 'Criando interface']} isActive={loading} action={() => functionAction()}/>
		
		</>
  );
 }
 
 
 const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.blue,
		alignItems: 'center',
		justifyContent: 'center',
		color: colors.white,
		width: '100%',
		height: '100%',
	},
	frame:{
		backgroundColor: colors.white,
		// width: 300,
		// height: '80%',
		borderRadius: 8,
		// borderColor: colors.blackWhite,
		// borderWidth: 2,
		display:'flex', 
		alignContent:'flex-start',
		justifyContent: 'center',
		alignItems: 'flex-start',
		// justifyContent: 'space-evenly',
		flexDirection: 'row',
		flexWrap: 'wrap',
		padding: 2,
		// Width: '85%'
	},
	title: {
		color: colors.white,
		fontSize: 25,
		marginBottom:10,
		fontWeight:'bold'
	}, 
  infos:{
		// marginTop: 40,
		width: '90%',
		// backgroundColor: colors.blackSpace,
		// borderColor: colors.blackWhite,
		// borderWidth: 1.5,
		borderRadius: 8,
		padding: 10
	},
	infosTitle:{
		color: colors.black,
		fontWeight: 'bold',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		fontSize: 24
	},
	infosName:{
		color: colors.black,
		fontWeight: 'bold',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'left',
		fontSize: 22,
		paddingLeft: 5,
		marginTop: 20
	},
	infosBody:{
		// borderColor: 'white',
		// borderWidth: 1,
		padding: 5,
		borderRadius: 8,
		color: colors.black,
		// fontWeight: 'bold',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'justify',
		fontSize: 18
	},passwordContainer: {
    height: 50,
    // borderColor: colors.white,
    color: colors.blackGrey,
    borderRadius: 8,
    // borderWidth: 2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
		backgroundColor: colors.white,
		justifyContent: 'center',
		marginTop: 5,

		
	},textInputPassword: {
		height: 50,
		borderWidth: 0,
		width: '60%',
		marginBottom: 16,
		paddingHorizontal: 8,
		// borderColor: colors.white,
		color: colors.blackGrey,
		backgroundColor: colors.white,
		borderRadius: 8,
		borderColor: colors.blue,
		borderWidth: 1.5

	},iconEye: {
		// paddingHorizontal: 8,
		// marginTop: 10,
		width: 32,
		height: 32,
		color: colors.green,
		backgroundColor: colors.white,
		borderRadius: 100,
		fontSize: 30,
		justifyContent: 'center',
		textAlign: 'center',
		alignContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		marginLeft: 5,
		borderColor: colors.green,
		borderWidth: 1.5,
	}
 });