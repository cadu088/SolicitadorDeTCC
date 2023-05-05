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



export default function Messages({
	dataReceiver,
	dataIssuer
}){

	const [ menssagenSend, setMenssagenSend ] = useState('');
	const [ menssagenSendDescHeight, setMenssagenSendDescHeight ] = useState(0);

	return (
		<View style={styles.container} >
			<View 
				style={{
					backgroundColor: colors.gray,
					borderRadius: 10,
					padding: 8,
					maxWidth: '70%'
				}}
			>
				<Text>AAAAAAAAAAAAAAA AAAAAA AAAAA AAAAAA AAAAAAAAAAAAAAAAA </Text>
			</View>

			<Text
				style={{
					paddingHorizontal: 8,
					paddingVertical: 1,
				}}
			>
				22:08
			</Text>
			
		</View>
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