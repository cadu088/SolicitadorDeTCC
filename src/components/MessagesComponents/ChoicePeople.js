import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity 
} from 'react-native';
import colors from '../../styles/colors';
import { AntDesign } from '@expo/vector-icons'; 
export default function ChoicePeople({
	name, 
	photo, 
	lastNotification, 
	notificationCount, 
	date, 
	choice
}){

	return (
		<TouchableOpacity  onPress={() => choice()}>
			<View style={styles.container} >
				<View style={styles.identity}>

					<View style={{
						flexDirection: 'row'
					}}>
						<Image
							style={styles.selfPhoto}
							alt='self'
							source={{ uri: photo }}
						/>
						<View style={{
							marginLeft: 10,
							height: '100%',
							flexDirection: 'column',
							justifyContent: 'space-between',
							paddingBottom: 8
						}}>
							<Text style={{
								fontSize: 20,
								color: colors.blackGrey
							}}>
								{name}
							</Text>

							<Text style={{
								fontSize: 15,
								color: colors.blackWhite
							}}>
								{lastNotification.slice(0,45) + (lastNotification.length > 45 ? '...' : '')}
							</Text>
						</View>
					</View>

					
				</View>


				<View style={styles.arrow}>
					<Text style={{
						color: colors.blue,
						marginBottom: 4
					}}>
						{date}
					</Text>
					{/* <AntDesign name="right" size={24} color={colors.white} /> */}
					<View style={{
						backgroundColor: colors.blue,
						width: 20,
						height: 20,
						alignItems: "center",
						justifyContent: "center",
						borderRadius: 100
						
					}}>
						<Text style={{
							color: colors.white,
							fontSize: notificationCount > 99 ? 12 : 14
						}}>
							{notificationCount > 99 ? '+99' : notificationCount}
						</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
}


const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		width: '100%',
		height: 65,
		borderRadius: 8,
		marginBottom: 5,
		flexDirection:'row',
	},
	identity: {
		width: '88%',
		padding: 8,
	},
	arrow:{
		width: '12%',
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor:colors.blue,
		borderTopRightRadius: 8,
		borderBottomRightRadius: 8
	},
	selfPhoto: {
		width: 50,
		height: 50,
		borderRadius: 100,
		padding:1,
		// borderWidth:1,
		// borderColor: colors.gray
	},
});