import React, {useEffect, useState} from 'react';
import {
    TextInput,
    StyleSheet,
    Text,
    View,
		SafeAreaView,
		ScrollView,
		Image,
		KeyboardAvoidingView,
		Platform,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import colors from '../../styles/colors';
import { Feather } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 

import { MaterialIcons } from '@expo/vector-icons'; 

export default function WaitingAdvisor({data}) {
	

	return (
		<View style={{width: '100%', height: '100%'}}>
			<SafeAreaView >
				<ScrollView vertical={true} >
					{data.map((item) => (
						<View key={item.ID} style={styles.cardSolicited}>
							<View style={styles.headerSolicited}>
								{/* <Image
									style={styles.selfPhoto}
									alt='self'
									source={{ uri: item.AlunoIMG}}
								/> */}
								<Text style={styles.titleAdvisor}>Solicitado para {item.NOME}</Text>
							</View>
							<View style={styles.bodySolicited}>
								<Text style={styles.titleTask}>{item.TITULO}</Text>
								<Text style={styles.bodyTask}>{item.DESCRICAO}</Text>
							</View>
							<View style={styles.baseboard}>
								<View style={{flexDirection: 'row',alignItems: 'center'}}>
									<Image
										style={{
											width: 30,
											height: 30,
											borderRadius: 100,
											padding:1
										}}
										alt='self'
										source={{ uri: item.OrientadorIMG}}
									/>
									<Text style={styles.nameAdvisor}>{item.NOME}</Text>
								</View>
								{/* add quando reprovado! */}
								{/* <Text style={{padding: 10,textAlign: 'center',fontWeight: 'bold',fontSize: 15, color: colors.red}}>{item.TITULO}</Text> */}
								<View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
									<View style={{flexDirection:'row', alignItems: 'center', maxWidth: '50%'}}>
										<AntDesign name="hourglass" size={24} color={colors.blackSpace} />
										<Text style={{fontSize: 17, paddingLeft: 2, color:colors.blackSpace}}>Aguardando resposta!</Text>
									</View>
									{/* add quando reprovado! */}
									{/* <View style={{flexDirection:'row', alignItems: 'center', maxWidth: '50%'}}>
										<MaterialIcons name="not-interested" size={24} color={colors.red} />
										<Text style={{fontSize: 17, paddingLeft: 2, color:colors.red}}>Reprovado!</Text>
									</View> */}
									<View style={{flexDirection:'row', alignItems: 'center', maxWidth: '50%'}}>
										<AntDesign name="calendar" size={24} color={colors.blackSpace} />
										<Text style={{fontSize: 17, paddingLeft: 2, color:colors.blackSpace}}>24/05/2023 ás 14:58</Text>
									</View>
								</View>
								<View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'center'}}>
									
									<View style={{flexDirection:'row', alignItems: 'center', maxWidth: '50%', backgroundColor: colors.red, borderRadius: 100, paddingHorizontal: 10, paddingVertical: 5}}>
										<Ionicons name="ios-trash-outline" size={24} color={colors.white} />
										<Text style={{fontSize: 17, paddingLeft: 2, color:colors.white}}>Cancelar solicitação</Text>
									</View>
									{/* add quando reprovado! */}
									{/* <View style={{flexDirection:'row', alignItems: 'center', maxWidth: '50%',backgroundColor: colors.green, borderRadius: 100, paddingHorizontal: 10, paddingVertical: 5}}>
										<MaterialIcons name="open-in-new" size={24} color={colors.white} />
										<Text style={{fontSize: 17, paddingLeft: 2, color:colors.white}}>Criar nova solicitação</Text>
									</View> */}
								</View>
							</View>
						</View>
					))}
					<Text></Text>
					<Text></Text>
					<Text></Text>
					<Text></Text>
				</ScrollView>
			</SafeAreaView>
		</View>
	);
}

// 'ID': 1,
// 		'iD_PESSOA':
// 		'NOME': 
// 		'DATA':
// 		'OrientadorIMG': 
// 		'iD_SOLICITACAO': 
// 		'AlunoNOME': 
// 		'TITULO': 
// 		'DESCRICAO': 
// 		'AlunoIMG'



const styles = StyleSheet.create({
	cardSolicited: {
		width: '100%',
		padding: 10,
		backgroundColor: colors.white,
		borderRadius: 8,
		marginBottom: 20,
	},
	headerSolicited: {
		backgroundColor: colors.white,
		width: '100%',
		// flexDirection: 'row',
		textAlign: 'center',
		alignItems: 'center',
		borderBottomColor: colors.blue,
		borderBottomWidth: 1,
		paddingBottom: 10
	},
	selfPhoto: {
		width: 24,
		height: 24,
		borderRadius: 100,
		// padding:1
	},
	nameAdvisor:{
		color: colors.blackGrey,
		fontSize: 17,
		paddingLeft: 5,
		// fontWeight: 'bold',
	},
	titleAdvisor:{
		color: colors.blackGrey,
		fontSize: 20,
		paddingLeft: 5,
		fontWeight: 'bold',
	},
	bodySolicited: {
		// height: 300,
		// justifyContent: 'center'
		alignItems: 'center',
	},
	titleTask: {
		padding: 25, 
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 16,
	},
	bodyTask: {
		paddingTop: 0, 
		padding: 10, 
		textAlign: 'justify',
		fontSize: 15,
	},
	baseboard:{
		borderTopColor: colors.blue,
		borderTopWidth: 1,
		paddingTop: 10,
	}
});