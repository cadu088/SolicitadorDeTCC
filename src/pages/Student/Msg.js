import React, {useState} from 'react';
import {
    TextInput,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import api from '../../services/api';

import MyButton  from '../../components/MyButton/Index';
import LinkButton from '../../components/LinkButton/Index';
import MenuBaseUser from '../../components/MenuBaseUser/index';

import colors from '../../styles/colors';
//import Loading from '../../components/Loading/Loading';

import AsyncStorage from '@react-native-async-storage/async-storage';

const eye = 'eye';
const eyeOff = 'eye-off';



export default function Msg() {

	const dataTeste = [{
		'iD_PESSOA': 1,
		'NOME': 'Humberto Melo',
		'DATA': 'Desenvolvimento de APIs, Sistemas Web e Mobile',
		'IMG': 'https://files.uniaraxa.edu.br/assets/apps/lms/img/136-119.png'
	},{
		'iD_PESSOA': 2,
		'NOME': 'Robinson Cruz',
		'DATA': 'Banco de dados, desenvolvimento .NET',
		'IMG': 'https://sec.uniaraxa.edu.br/assets/lms/Pessoa/255-636645696799475269.jpg'
	},{
		'iD_PESSOA': 3,
		'NOME': 'Maurício Júnior',
		'DATA': 'Inteligência Artificial, Internet das Coisas',
		'IMG': 'https://sec.uniaraxa.edu.br/assets/lms/Pessoa/193-636687419898079554.jpg'
	},{
		'iD_PESSOA': 4,
		'NOME': 'Renato Correa',
		'DATA': 'Desenvolvimento de APIs, Sistemas Web',
		'IMG': 'https://sec.uniaraxa.edu.br/assets/lms/Pessoa/61-636645895338423567.png'
	}]


return (
    <View style={styles.container}>
			<Text>MSG</Text>
    </View>

);
}


const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
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