import React, {useState} from 'react';
import {
    TextInput,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import api from '../../ApiService/api';

import MyButton  from '../../Components/MyButton/Index';
import LinkButton from '../../Components/LinkButton/Index';
import MenuBaseUser from '../../Components/MenuBaseUser/index';
import HeaderBase from '../../Components/HeaderBase/index';

import colors from '../../styles/colors';
//import Loading from '../../Components/Loading/Loading';

import AsyncStorage from '@react-native-async-storage/async-storage';

const eye = 'eye';
const eyeOff = 'eye-off';

import Home from './Home';
import List from './List';
import Msg from './Msg';
import Task from './Task';



export default function Index() {
	const [ page, setPage ] = useState(0);
	const pages = ['Home', 'List','Msg','Task'];

	function handlePage(pageValue){
		setPage(pageValue);
	}


return (
		<>
			<View style={styles.container}>
				{pages[page] === 'Home' ? (<Home />) 
					: pages[page] === 'List' ? (<List />)
						: pages[page] === 'Msg' ? (<Msg />)
					 		: pages[page] === 'Task' ? (<Task />): null}
				
			</View>
			<MenuBaseUser type="student" pages={pages} pageValue={pages[page]} handlePage={(pageValue) => handlePage(pageValue)} />
			<HeaderBase type="student" dataImg="https://avatars.githubusercontent.com/u/72260079?v=4" pages={pages} pageValue={pages[page]}/>
		</>
);
}


const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: colors.blackSpace,
		width: '100%',
		height: '100%',
},
textTitle: {
    color: 'red',
    fontSize: 28,
    marginBottom: 8
},
textInput: {
    height: 40,
    borderColor: colors.gray,
    borderRadius: 8,
    borderWidth: 1,
    width: '70%',
    marginBottom: 16,
    paddingHorizontal: 8
},
textInputPassword: {
    height: 40,
    borderWidth: 0,
    width: '70%',
    marginBottom: 16,
    paddingHorizontal: 8
},
buttonIn: {
    backgroundColor: colors.redButton,
    borderRadius: 8,
    height: 50,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center'
},
buttonTextIn: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
},
passwordContainer: {
    marginBottom: 16,
    height: 40,
    borderColor: '#dcdce6',
    borderRadius: 8,
    borderWidth: 1,
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between'
},
iconEye: {
    paddingHorizontal: 8,
    marginTop: 6
},
});