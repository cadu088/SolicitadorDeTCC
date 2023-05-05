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
import Messages from './Messages'


export default function Chat({
	name,
	photo,
	idPeople,
	closeChat
}){

	const [ menssagenSend, setMenssagenSend ] = useState('');
	const [ menssagenSendDescHeight, setMenssagenSendDescHeight ] = useState(0);

	return (
		<View style={styles.container} >
			<View style={styles.headerChat}>
				<TouchableOpacity 
					onPress={() => closeChat()}
					style={{
						alignItems: 'center',
						justifyContent: 'flex-start',
						flexDirection: 'row',
						width: '22%'
					}}
				>
					<AntDesign name="left" size={24} color="white" />
					<Image
						style={styles.selfPhoto}
						alt='self'
						source={{ uri: photo }}
					/>
				</TouchableOpacity>
				<Text
					style={{
						fontSize:24,
						color:colors.white,
						width:'80%',
						fontWeight:'bold'
					}}
				>Chat com {name}</Text>
			</View>


			{/* body */}

			<View
				style={{
					width: '100%',
					// height: menssagenSendDescHeight + 20 > 120 ? '76%' : Keyboard.isVisible() === true ? '70%' : '80%',
				}}
			>
				<Messages />

			</View>

			{/* send Msg */}
			<View
				style={{
					width: '100%',
					height: menssagenSendDescHeight + 20 > 120 ? 120 : menssagenSendDescHeight + 30,
					backgroundColor: colors.blackChat,
					borderBottomLeftRadius: 8,
					borderBottomRightRadius: 8,
					flexDirection:'row',
					alignItems: 'center',
					paddingHorizontal: 10,
					position: 'absolute',
					bottom: 0,
					// justifyContent: 'center',
				}}
			>
				<TextInput
					style={{
						height: menssagenSendDescHeight > 100 ? 100 : menssagenSendDescHeight,
						borderWidth: 0,
						width: '70%',
						paddingHorizontal: 8,
						color: colors.blackSpace,
						backgroundColor: colors.white,
						borderRadius: 8,
						fontSize:16,
						textAlign: 'left',
						// marginBottom: 60
					}}
					placeholder="Mensagem"
					onChangeText={text => setMenssagenSend(text)}
					value={menssagenSend}
					multiline={true}
					numberOfLines={4}
					placeholderTextColor={colors.blackSpace}
					onContentSizeChange={(e) => setMenssagenSendDescHeight(e.nativeEvent.contentSize.height + 24)}
				/>
				<View
					style={{
						width:'30%',
						height: '100%',
						flexDirection: 'row',
						justifyContent: 'space-around',
						alignItems: 'center',
						paddingHorizontal: 5
					}}
				>
					<Foundation name="paperclip" size={28} color={colors.blue} />
					<Feather name="send" size={28} color={colors.green_dark} />
				</View>
			</View>
		
		</View>
	);
}


const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		width: '100%',
		height: '100%',
		borderRadius: 8,
		flexDirection:'column',
	},
	selfPhoto: {
		width: 40,
		height: 40,
		borderRadius: 100,
		padding:1,
		marginLeft: 10
		// borderWidth:1,
		// borderColor: colors.gray
	},
	headerChat:{
		width: '100%',
		paddingTop: 30,
		height: 100,
		backgroundColor: colors.blue,
		alignItems: 'center',
		justifyContent: 'flex-start',
		flexDirection: 'row',
		borderTopRightRadius: 8,
		borderTopLeftRadius: 8,
		paddingHorizontal: 8
	}
});