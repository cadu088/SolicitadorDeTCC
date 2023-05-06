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



export default function Index() {
  const { createChat, closeChat, typeChat, chatUser } = useChat();


return (
		<>
			<View style={styles.container}>
        <Chat 
					name={chatUser.name} 
					photo={chatUser.photo} 
					idPeople={chatUser.id}
					closeChat={() => closeChat()}
					loginPeople={1}
				/>
			</View>
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