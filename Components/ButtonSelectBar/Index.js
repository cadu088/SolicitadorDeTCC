import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
		View,
		Image,
    TouchableOpacity,
    TouchableOpacityProps
} from 'react-native';
import colors from '../../styles/colors';
import { AntDesign } from '@expo/vector-icons'; 




export default function ButtonSelectBar(props) {

	const [ img, setImg ] = useState({ uri: props.dataImg });
	// const [ img, setImg ] = useState({ uri: props.dataImg });

	// props.type
	// props.dataImg
    return (
        <>
					<View style={
						{ borderRadius: 100, 
							width: props.width, 
							height: props.height, 
							alignItems: 'center', 
							justifyContent: 'center', 
							backgroundColor: props.active ? props.colorActive : props.colorDisabled
						}}
						> 
						{props.icon}
					</View>
        </>

    );
}


const styles = StyleSheet.create({
  container: {
		padding: 5,
		// backgroundColor: 'red',
		width: '90%',
		height: 50,
		// marginLeft: 20,
		// marginRight: 20,
		borderRadius: 100,
		borderWidth: 1,
		borderColor: colors.white,
		display:'flex', 
		flexDirection: 'row',
    justifyContent: 'space-between',
		alignItems: 'center'
	},
	selfPhoto: {
		width: 40,
		height: 40,
		borderRadius: 100,
		borderColor: colors.blackGrey,
		borderWidth: 1,
		padding:1
	},
});

