import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
		View,
		Image,
    TouchableOpacity,
    TouchableOpacityProps,
		Alert
} from 'react-native';
import colors from '../../styles/colors';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/core';

import ButtonSelectBar from '../ButtonSelectBar/Index'



export default function PinButton(props) {

    return (
			<Text 
				style={{
					backgroundColor: props.active ?  colors.blue : colors.white,
					display: 'flex',
					height: 25,
					textAlign: 'center',
					justifyContent: 'center',
					padding: 5,
					margin: 3,
					borderRadius: 8,
					fontSize: 15,
					color: props.active ? colors.white : colors.black,
					fontWeight: 'bold',
					borderColor: props.active ? 'transparent' : colors.blackWhite,
					borderWidth: 1,
					opacity: props.active ? 1 : 0.5}} 
				onPress={() => props.setActive(props.data.iD_AREA)}>
				{props.data.descricao}
			</Text>
    );
}


const styles = StyleSheet.create({
  pin:{
		
	}
});