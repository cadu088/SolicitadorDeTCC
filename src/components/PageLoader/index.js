import React, {useState, useRef, useEffect} from 'react';
import {
    StyleSheet,
    Text,
		View,
		Image,
    TouchableOpacity,
    TouchableOpacityProps,
		Alert,
		ActivityIndicator,
		Animated
} from 'react-native';
import colors from '../../styles/colors';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/core';
import { MaterialIcons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

import ButtonSelectBar from '../ButtonSelectBar/Index'

import { Ionicons } from '@expo/vector-icons'; 


export default function PageLoader(props) {
	const [ active, setActive] = useState(true);
	const [position, setPosition] = useState(0);
	const [action, setAction] = useState(['Aguarde...', 'Enviando dados', 'Recebendo pacotes', 'Criando interface'])
	const [inOpen, setInOpen] = useState(false);
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const fadeAnimScreen = useRef(new Animated.Value(0)).current;
	
	useEffect(() => {
		setAction(props.data)
	},[]);

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: props.fadeIn,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: props.fadeOut,
      useNativeDriver: true,
    }).start();
  };
	setTimeout(() => changeAnimation(), props.fadeIn)

	function changeAnimation(){
		
		if(active){
			
			fadeOut();
			setActive(false);
		}else{
			fadeIn();
			setActive(true);
			handlePasition();
		}
	}

	function handlePasition(){
		const limite = action.length - 1;
		const inicio = 0;
		let novaPosicao;
		
		if(position >= limite){
			novaPosicao = inicio;
		}else {
			novaPosicao = position + 1;
		}
		setPosition(novaPosicao);
	}

	const fadeInScreen = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnimScreen, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
		
  };

  const fadeOutScreen = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnimScreen, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
		setTimeout(() => {
			setInOpen(false); 
			props.action();
		}, 510);
  };



	useEffect(() => {
		if(props.isActive){
			setPosition(0);
			setInOpen(true);
			fadeInScreen();
			fadeIn()
			// setTimeout(() => fadeIn(), 100);
		}else{
			fadeOutScreen();
		}
	},[props.isActive]);

    return (<>
		{inOpen && (
			<Animated.View
			style={[
				styles.container,
				{
					// Bind opacity to animated value
					opacity: fadeAnimScreen,
				},
			]}>
			<View style={styles.container}>
				<View style={{height: '40%', width:'100%'}}>
					
				</View>
				<View style={{
					width:'100%',
					height: '60%', 
					// backgroundColor: 'red', 
					flexDirection:'column', 
					alignItems: 'center',
					justifyContent: 'space-between',
					paddingBottom: 150
				}}>
					<View style={{ width: '100%', height: 60}}>

					</View>
					<View style={{
						borderTopColor:colors.blue_light,
						borderTopWidth:5,
						width:'100%',
						flexDirection:'row'
						// paddingLeft:10,
					}}>
						<ActivityIndicator size={20} color={colors.blackGrey} />
						 <Animated.View
							style={[
								styles.fadingContainer,
								{
									// Bind opacity to animated value
									opacity: fadeAnim,
								},
							]}>
							<Text style={{
								fontWeight: 'bold',
								fontSize:22
							}}> {action[position]}</Text>
						</Animated.View>
					</View>
				</View>
				
			</View>
			</Animated.View>
		)}
		</>
    );
}


const styles = StyleSheet.create({
  container: {
		padding: 5,
		backgroundColor: colors.white,
		width: '100%',
		height: '100%',
		display:'flex', 
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: 40,
		zIndex: 999,
		position: 'absolute',
	},
	fadingContainer: {
    // padding: 20,
    // backgroundColor: 'powderblue',
  },
});