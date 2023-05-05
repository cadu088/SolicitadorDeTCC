import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
		View,
		Image,
    TouchableOpacity,
    TouchableOpacityProps,
		Alert,
		SafeAreaView,
		ScrollView,
} from 'react-native';
import colors from '../../styles/colors';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/core';
import { MaterialIcons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

import ButtonSelectBar from '../ButtonSelectBar/Index'

import { Ionicons } from '@expo/vector-icons'; 


export default function HeaderBase(props) {
	const navigation = useNavigation();
	const [ img, setImg ] = useState({ uri: props.dataImg });

	
	async function schedulePushNotification() {
		await Notifications.scheduleNotificationAsync({
			content: {
				title: "Você tem uma nova mensagem de Mauricio",
				body: 'Here is the notification body',
				data: { data: 'goes here' },
			},
			trigger: { seconds: 5 },
		});
	}

	async function setLogoff(){
		await AsyncStorage.setItem('@solicitaTCC:people', null); 
		navigation.navigate('Login');
	}

    return (
        <>
            <View style={styles.container}>
							<Text onPress={() => schedulePushNotification()}>
								{/*  {' '} */}
								<ButtonSelectBar width={40} height={30} active={false} colorActive={colors.white} colorDisabled={colors.transparent} icon={<Ionicons name="ios-log-out-outline" size={25} color={colors.white} />} />
							</Text>

							<Text style={{color: colors.white, fontWeight: 'bold'}}>
								{props.pageValue}
							</Text>

						
							<Image
								style={styles.selfPhoto}
								alt='self'
								source={img}
								onPress={async () => await schedulePushNotification()}
							/>
						</View>
        </>

    );
}



const styles = StyleSheet.create({
  container: {
		padding: 5,
		backgroundColor: colors.backgroundMenu,
		width: '90%',
		height: 40,
		marginLeft: 20,
		marginRight: 20,
		borderRadius: 100,
		borderWidth: 1,
		borderColor: colors.transparent,
		display:'flex', 
		flexDirection: 'row',
    justifyContent: 'space-between',
		alignItems: 'center',
		position: 'absolute',
		top: 40,
	},
	selfPhoto: {
		width: 30,
		height: 30,
		borderRadius: 100,
		// borderColor: colors.white,
		// borderWidth: 1,
		padding:1
	},
});