import React, {useState} from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	Platform,
	TextInput,
	Keyboard
} from 'react-native';
import colors from '../../styles/colors';
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { Foundation } from '@expo/vector-icons'; 



export default function MessagesReceiver({
	data,
	isReceiver
}){

	const datates = {
		"iD_MENSAGERIA": 1,
		"iD_EMISSOR": 1,
		"iD_RECEPTOR": 4,
		"mensagem": [
			{
				"iD_MENSAGERIA": 1,
				"dT_ENVIO": "06/05/2023 15:49:54",
				"tipo": "TEXTO",
				"mensagem": "Boa tarde Renato!",
				"extensão": "",
				"url": ""
			},
			{
				"iD_MENSAGERIA": 1,
				"dT_ENVIO": "06/05/2023 15:49:54",
				"tipo": "TEXTO",
				"mensagem": "Tudo bem?",
				"extensão": "",
				"url": ""
			},
			{
				"iD_MENSAGERIA": 1,
				"dT_ENVIO": "06/05/2023 15:49:54",
				"tipo": "TEXTO",
				"mensagem": "Preciso ver um negocio com você",
				"extensão": "",
				"url": ""
			},
			{
				"iD_MENSAGERIA": 1,
				"dT_ENVIO": "06/05/2023 15:49:54",
				"tipo": "TEXTO",
				"mensagem": "Podemos marcar uma reunião para amanha as 19h via meet, sobre como o PowerPoint deve ser",
				"extensão": "",
				"url": ""
			}
		]
	}

	function dataEnvio(dataEnv){
		const data = new Date(dataEnv);
		const hj = new Date().getDate();
		const horas = data.getHours();
		const minutos = data.getMinutes();
		const dia = data.getDate();
		const mes = data.getMonth();

		const resposta = (hj === dia ? 'Hoje' : (dia + '/' + mes)) + ' ' + horas + ':' + minutos;
		return resposta;
	}
	
	return (
		<View style={isReceiver ? styles.containerRight : styles.containerLeft} >
			{data.mensagem.map((item, index) => (
					<Text
						key={index}
						style={{
							backgroundColor: colors.gray,
							borderRadius: 12,
							// padding: 8,
							paddingLeft: isReceiver ? 10 : 15,
							paddingRight: isReceiver ? 15 : 10,
							paddingVertical: 5,
							maxWidth: '90%',
							alignSelf: isReceiver ? "flex-end" : "flex-start" ,
							marginVertical: 2,
							fontSize: 16
						}}
						
					>{item.mensagem}</Text>
			))}
			

			<Text
				style={{
					paddingHorizontal: 8,
					paddingVertical: 1,
				}}
			>
				{dataEnvio(data.mensagem[0].dT_ENVIO)}
			</Text>
			
		</View>
	);
}


const styles = StyleSheet.create({
	containerLeft: {
		// backgroundColor: 'green',
		width: '100%',
		// height: 80,
		paddingHorizontal: 10,
		paddingVertical: 5
	},
	containerRight: {
		width: '100%',
		// height: 80,
		paddingHorizontal: 10,
		paddingVertical: 5,
		alignItems: 'flex-end',
		justifyContent: 'center'
		// alignItems: 'right'
	},
});