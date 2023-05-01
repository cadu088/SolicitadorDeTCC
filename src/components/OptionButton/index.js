import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../../styles/colors';



export default function OptionButton(props) {
    return (
        <RectButton style={styles.container}>
            <Text style={styles.text}>
                {props.title}
            </Text>
        </RectButton>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: '45%',
        backgroundColor: colors.shape,
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
        margin: 10
    },
    text: {
        color: colors.purple,
        marginVertical: 16
    }
});
