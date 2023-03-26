import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import React, {useState} from 'react';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../../styles/colors';



export default function MyButton(props) {
    return (
				<RectButton  style={styles.MyButtonStyle}   {...props}>
            <Text style={styles.MyTextButtonStyle}>
                {props.title}
            </Text>
        </RectButton>
    );
}


const styles = StyleSheet.create({
    MyButtonStyle: {
        backgroundColor: colors.blue,
        borderRadius: 8,
        height: 50,
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 16
    },
    MyTextButtonStyle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
});