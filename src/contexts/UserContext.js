import { createContext, useEffect, useState } from "react";
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';

const UserContext = createContext({});

export function UserProvider({ children }) {
	const navigation = useNavigation();
  const [user, setDataUser] = useState({
		id: 0,
		name: '',
		email: '',
		photo: '',
		type: '',
		RA: null,
		usuario: null,
		dt: ''
	});

	//inicialização
	useEffect(() => {
		const user = getUserStorage();
		if(user === null){
			navigation.navigate('Login'); 
			return;
		}
		const now = new Date();
		const savedDate = new Date(user.dt);
		const diffInMilliseconds = now.getTime() - savedDate.getTime();
		const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
		if (diffInDays >= 2) {
			clearUserStorage();
			navigation.navigate('Login');  
			clearUser();
		}else{
			setUser(user.id);
		}
	},[]);

	//Pega qualquer atualização do user
	useEffect(() => {
		if(user.type === 'Student'){
			navigation.navigate('Student');  
		}else if (user.type === 'Advisor'){
			navigation.navigate('Advisor');  
		}else{
			navigation.navigate('Login'); 
		}
	},[user]);

	function clearUser(){
		setDataUser({
			id: 0,
			name: '',
			email: '',
			photo: '',
			type: '',
			RA: null,
			usuario: null,
			dt: ''
		});
	}

	async function setUserStorage(user){
		await AsyncStorage.setItem('@solicitaTCC:user', JSON.stringify(user));
	}

	async function getUserStorage(){
		const user = await JSON.parse(await AsyncStorage.getItem('@solicitaTCC:user'))
		return user;
	}

	async function clearUserStorage(){
		await AsyncStorage.removeItem('@solicitaTCC:user');
		clearUser();
		navigation.navigate('Login');  
	}

	async function getPeople(user) {
		try{
			let userResponse
			await api.post('/login/getPeople', {iD_PESSOA: user}).then(async (response) => {
				const result = response.data.result;
				userResponse = {
					id: result.iD_PESSOA,
					name: result.nome,
					email: result.email,
					photo: result.img,
					type: result.iD_TIPO_PESSOA === 2 ? 'Student' : 'Advisor',
					RA: result.ra === '' ? null : result.ra ,
					usuario: result.usuario === '' ? null : result.usuario,
					dt: new Date()
				};
			});
			return userResponse;
		}catch(e){
			return null;
		}
	}

	async function setUserLogin(email, pwd) {
		const data = {
			email,
			senha: pwd
		}

		try{
			await api.post('/login/post', data).then(async (response) => {
				if(!await setUser(response.data.result.iD_PESSOA)){
					return false;
				}
			});			
	
			return true
		}catch(e){
			alert('Usuario e/ou senha inválido!');
			return false;
		}
	}

	async function setUser(id) {
		try{
			const result = await getPeople(id)
			if(result === null){
				alert('Erro pegar dados do usuario');
				return false;
			}
			setUserStorage(result);
			setDataUser(result);
			return true
		}catch(e){
			alert('Erro pegar dados do usuario');
			return false;
		}
	}

	async function reloadingUser(){
		const user = getUserStorage();
		if(user === null){
			navigation.navigate('Login'); 
			return;
		}
		setUser(user.id);
	}

  return (
    <UserContext.Provider
      value={{ 
				setUserLogin, 
				getPeople, 
				getUserStorage, 
				clearUserStorage, 
				reloadingUser
			}}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;