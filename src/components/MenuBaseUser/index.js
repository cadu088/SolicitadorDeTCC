import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
		View,
		Image,
    TouchableOpacity,
    TouchableOpacityProps,
		Alert,
		Keyboard
} from 'react-native';
import colors from '../../styles/colors';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/core';
import { useSystem } from '../../contexts/SystemContext';

import ButtonSelectBar from '../ButtonSelectBar/Index'



export default function MenuBaseUser(props) {

	const system = useSystem();

	function handlePagesState(page){
		props.handlePage(props.pages.indexOf(page));
	}

    return (
        <>
				{!Keyboard.isVisible() && (system.visibleMenu) &&(
					<View style={styles.container}>
					<Text onPress={() => handlePagesState('Home')}>
						<ButtonSelectBar width={35} height={35} active={props.pageValue === "Home"} colorActive={colors.white} colorDisabled={colors.transparent} icon={<AntDesign name="home" size={25} color={props.pageValue === "Home" ? colors.blackSpace : colors.white} />} />
					</Text>

					<Text onPress={() => handlePagesState('Msg')}>
						<ButtonSelectBar width={35} height={35} active={props.pageValue === "Msg"} colorActive={colors.white} colorDisabled={colors.transparent} icon={<AntDesign name="inbox" size={25} color={props.pageValue === "Msg" ? colors.blackSpace : colors.white}/>} />
					</Text>
					
					<Text onPress={() => handlePagesState('List')}>
						<ButtonSelectBar width={35} height={35} active={props.pageValue === "List"} colorActive={colors.white} colorDisabled={colors.transparent} icon={<AntDesign name="database" size={25} color={props.pageValue === "List" ? colors.blackSpace : colors.white} />} />
					</Text>

					<Text onPress={() => handlePagesState('Task')}>
						<ButtonSelectBar width={35} height={35} active={props.pageValue === "Task"} colorActive={colors.white} colorDisabled={colors.transparent} icon={<AntDesign name="form" size={25} color={props.pageValue === "Task" ? colors.blackSpace : colors.white} />} />
					</Text>
				</View>
				)}
        </>

    );
}


const styles = StyleSheet.create({
  container: {
		padding: 5,
		backgroundColor: colors.backgroundMenu,
		width: '50%',
		height: 45,
		marginLeft: 100,
		marginRight: 40,
		borderRadius: 100,
		// borderWidth: 1,
		// borderColor: colors.white,
		display:'flex', 
		flexDirection: 'row',
    justifyContent: 'space-between',
		alignItems: 'center',
		position: 'absolute',
		bottom: 20,
	},
	selfPhoto: {
		width: 35,
		height: 35,
		borderRadius: 100,
		borderColor: colors.blackGrey,
		borderWidth: 1,
		padding:1
	},
});