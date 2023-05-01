import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';

import { useNavigation } from '@react-navigation/native'

export default function Hello() {
 
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pagina Introdução</Text>
      <View style={styles.inputContainer}> 
         <Text style={styles.textResult}>Olá</Text>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Imc')} > 
          <Text style={styles.buttonText} >Calcular IMC</Text> 
        </TouchableOpacity> 
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('JokesList')}  > 
          <Text style={styles.buttonText}>Lista de Piadas</Text> 
        </TouchableOpacity> 
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('NewUser')}  > 
          <Text style={styles.buttonText}>Novo Usuário</Text> 
        </TouchableOpacity> 
      </View>      
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#D93600',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
  },
  inputContainer: {
    
    marginTop: 30,
    width: '90%',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'stretch',
    backgroundColor: '#fff',
    height: '80%'

  },
  input: {
    marginTop: 10,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'stretch'
  },
  button: {
    marginTop: 10,
    height: 60,
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
    shadowOpacity: 20,
    shadowColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textResult: {
    color: '#000',
    fontWeight: 'bold',
    textAlign : 'center'
  }
});
