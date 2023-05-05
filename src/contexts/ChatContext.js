import { createContext, useEffect, useState, useRef, useContext } from "react";
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { useUser } from './UserContext';


const ChatContext = createContext({});

export function ChatProvider({ children }) {
	const userLogin = useUser();
	const navigation = useNavigation();

	const [ chatOpen, setChatOpen ] = useState(false);
	const [ typeChat, setTypeChat ] = useState('');
	const [ chatUser, setChatUser] = useState({
		id: 0,
		name: '',
		email: '',
		photo: '',
		type: '',
		RA: null,
		usuario: null,
		dt: ''
	});

	// async function createChat(id){
	// 	try{
	// 		setChatUser(userLogin.getPeople(id));
	// 	}catch(e){

	// 	}
	// }

	async function createChat(user){
		try{
			setChatUser(user);
			setTypeChat(user.type);
		}catch(e){

		}
	}

	async function closeChat() {
		setChatUser({
			id: 0,
			name: '',
			email: '',
			photo: '',
			type: '',
			RA: null,
			usuario: null,
			dt: ''
		});
		setTypeChat('');
	}

	useEffect(() => {
		if(chatUser.dt === ''){
			setChatOpen(false);
		}else {
			setChatOpen(true);
		}
	},[chatUser]);


	useEffect(() => {
		if (chatOpen) {
			navigation.navigate('Chat'); 
		}else {
			const type = userLogin.typeUser 
			if (type === 'Advisor'){
				navigation.navigate('Advisor'); 
			}else if (type === 'Student'){
				navigation.navigate('Student'); 
			}else {
				// userLogin.clearUserStorage();
			}
		}
	},[chatOpen]);  

  return (
    <ChatContext.Provider
      value={{ createChat, closeChat, typeChat, chatUser }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export default ChatContext;

export const useChat = () => {
  const context = useContext(ChatContext);
  return context;
};