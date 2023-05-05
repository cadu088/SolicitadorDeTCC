import React, {useEffect, useState} from 'react';
import {
    TextInput,
    StyleSheet,
    View,
		SafeAreaView,
		ScrollView,
} from 'react-native';
import ChoicePeople from '../../components/MessagesComponents/ChoicePeople';
import Chat from '../../components/MessagesComponents/Chat';
import colors from '../../styles/colors';


export default function Msg() {
	const [ chatPeople, setChatPeople ] = useState({});
	const [ chatOpen, setChatOpen ] = useState(false);

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

	function handleChoiceChat(people){
		// alert(JSON.stringify(people));
		setChatPeople(people);
	}

	function closeChat(){
		setChatPeople({});
	}

	useEffect(() => {
		if(chatPeople.iD_PESSOA){
			setChatOpen(true);
		}else{
			setChatOpen(false);
		}

	},[chatPeople]);

return (
    <View style={styles.container}>
			<View style={{height: '10%', width: '100%'}}></View>
			{!chatOpen && (
				<View style={styles.listMSG}>
				<SafeAreaView>
					<ScrollView vertical={true}>
						{dataTeste.map((item, index) => (
							<ChoicePeople 
								name={item.NOME} 
								photo={item.IMG} 
								lastNotification={item.DATA} 
								notificationCount={index * 36}
								date={new Date().getHours() + ':' + new Date().getMinutes()} 
								key={index}
								choice={() => handleChoiceChat(item)}
							/>
						))}
					</ScrollView>
				</SafeAreaView>
			</View>
			)}
			
			{chatOpen && (
				<Chat 
					name={chatPeople.NOME} 
					photo={chatPeople.IMG} 
					idPeople={chatPeople.iD_PESSOA}
					closeChat={() => closeChat()}
				/>
			)}
			
    </View>

);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.gray,
		alignItems: 'center',
		justifyContent: 'center',
	},
	listMSG: {
		backgroundColor: colors.gray,
		width: '100%',
		height: '90%',
		paddingHorizontal: 8,
		paddingTop: 10,
		flexWrap:'wrap',
		flexDirection: 'column',
	}
});