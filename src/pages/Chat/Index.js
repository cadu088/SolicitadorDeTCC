import React, {useState, useEffect} from 'react';
import {
    TextInput,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Chat from '../../components/MessagesComponents/Chat';
import colors from '../../styles/colors';
import { useChat } from '../../contexts/ChatContext';
import { LinearGradient } from 'expo-linear-gradient';



export default function Index() {
  const { createChat, closeChat, typeChat, chatUser } = useChat();


return (
		<>
			<LinearGradient
				colors={['rgba(5,23,111,1)', 'rgba(24,95,240,1)']}
				start={{ x: 0.8, y: 0.4 }}
				style={styles.container}
				>
        <Chat 
					name={chatUser.name} 
					photo={chatUser.photo} 
					idPeople={chatUser.id}
					closeChat={() => closeChat()}
					loginPeople={1}
				/>
			</LinearGradient>
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
});