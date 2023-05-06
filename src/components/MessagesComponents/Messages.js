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
import MessagesReceiver from './MessagesReceiver'



export default function Messages({
	data,
	receiver,
	issuer
}){
	
	const [ menssagenSend, setMenssagenSend ] = useState('');
	const [ menssagenSendDescHeight, setMenssagenSendDescHeight ] = useState(0);

	return (
		<>
			{data.map((item, index) => (
				<MessagesReceiver key={index} data={item} isReceiver={item.iD_RECEPTOR === receiver} />
			))}
			
			
		</>
	);
}


const styles = StyleSheet.create({
	container: {
		// backgroundColor: 'green',
		width: '100%',
		height: 80,
		padding: 10
	},
	
});