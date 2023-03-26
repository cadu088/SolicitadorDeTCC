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
import { MaterialIcons } from '@expo/vector-icons'; 

import ButtonSelectBar from '../ButtonSelectBar/Index'

import { Ionicons } from '@expo/vector-icons'; 


export default function HeaderBase(props) {
	const navigation = useNavigation();
	const [ img, setImg ] = useState({ uri: props.dataImg });




    return (
        <>
            <View style={styles.container}>
							<Text onPress={() => navigation.navigate('Login')}>
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
		borderColor: colors.white,
		borderWidth: 1,
		padding:1
	},
});