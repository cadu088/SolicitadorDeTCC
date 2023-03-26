import React, {useState} from 'react';
import {
    TextInput,
    StyleSheet,
    Text,
    View,
		Linking,
		StatusBar,
		Image
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import api from '../../ApiService/api';

import MyButton  from '../../Components/MyButton/Index';
import LinkButton from '../../Components/LinkButton/Index';

import colors from '../../styles/colors';
//import Loading from '../../Components/Loading/Loading';

import AsyncStorage from '@react-native-async-storage/async-storage';

const eye = 'eye';
const eyeOff = 'eye-off';



export default function Login() {

const [flShowPass, setShowPass] =  useState(false);
const [iconPass, setIconPass] =  useState(eye);
const [txtLogin, setLogin] = useState('')
const [txtSenha, setSenha] = useState('')
const navigation = useNavigation();
const [flLoading, setLoading] = useState(false)

function handleChangeIcon() {
    let icone = iconPass == eye ? eyeOff : eye;
    let flShowPassAux = !flShowPass;
    setShowPass(flShowPassAux);
    setIconPass(icone);
}

async function navigateToHome() {

    if (txtLogin.trim() === '') {
        alert('Campo login é obrigatório');
        return;
    }
    if (txtSenha.trim() === '') {
        alert('Campo senha é obrigatório');
        return;
    }
  //  setLoading(true);

    if(txtLogin == "h1" && txtSenha == "123"){
        await AsyncStorage.setItem('@nomeApp:userName', txtLogin);
        navigation.navigate('Home');    
    } else {
        alert('Usuario e/ou senha inválido!');
        return;
    }
  //  setLoading(false);
}

function navigateToNewUser() {
    navigation.navigate('NewUser');
}
/*if (flLoading) {
    return (<Loading />);
}*/

return (
    <View style={styles.container}>
			{/* <StatusBar hidden={true} /> */}

			<View style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
						<Image
							style={styles.selfPhoto}
							alt='self'
							source={{ uri: 'https://auth.uniaraxa.edu.br/app/Content/img/banner-logo-nova.png' }}
						/>					
			</View>
			<Text style={styles.textTitle}>TRABALHOS DE CONCLUSÃO</Text>
			<View style={styles.content}>
        {/* <Text style={styles.textTitle}></Text> */}
        <TextInput
            style={styles.textInput}
            placeholder="Login"
            onChangeText={text => setLogin(text)}
            value={txtLogin}
						placeholderTextColor={colors.white}
        />
        <View style={styles.passwordContainer}>
            <TextInput
                style={styles.textInputPassword}
                placeholder="Senha"
                onChangeText={text => setSenha(text)}
                value={txtSenha}
                secureTextEntry={flShowPass}
								placeholderTextColor={colors.white}
            />
            <Feather
                style={styles.iconEye}
                name={iconPass}
                size={28}
                color={colors.purple}
								
                onPress={handleChangeIcon}
            />
        </View>

			
        <MyButton title='Entrar' onPress={navigateToHome}/>

        {/* <LinkButton title='Inscrever-se'
            onPress={navigateToNewUser}
        /> */}

				{/* <br/> */}
					<Text style={styles.textInsc} onPress={navigateToNewUser}>Inscrever-se</Text>
					<Text style={styles.textPassword} onPress={() => navigation.navigate('Login')}>Esqueci minha senha</Text>
        
				</View>
    </View>

);
}


const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
		color: colors.white,
		width: '100%',
		height: '100%',
},
selfPhoto: {
	width: 200,
	height: 200,
	marginTop:'30%',
	marginBottom: '10%'
	// borderRadius: 120
},
content: {    
	// marginTop:'80%',
	width: '90%',
	height:400,
	flex: 1,
	backgroundColor: colors.blackSpace,
	alignItems: 'center',
	// justifyContent: 'center',
	borderRadius: 8,
	color: colors.white,
	height: 50,
	paddingTop: 20
},
textTitle: {
    color: colors.white,
    fontSize: 28,
    marginBottom: 8,
		fontWeight: 'bold',
},
textInsc: {
	color: colors.white,
	fontSize: 22,
	marginBottom: 8,
},
textPassword: {
	color: colors.body_dark,
	fontSize: 12,
	marginTop: 20,
},
textInput: {
    height: 50,
    // borderColor: colors.white,
		backgroundColor: colors.blackGrey,
		color: colors.white,
    borderRadius: 8,
    // borderWidth: 2,
    width: '90%',
    marginBottom: 16,
    paddingHorizontal: 8,
		borderBottomRightRadius: 0
		// borderRightWidth: 0,
		// borderTopWidth: 0,
},
textInputPassword: {
    height: 50,
    borderWidth: 0,
    width: '70%',
    marginBottom: 16,
    paddingHorizontal: 8,
		// borderColor: colors.white,
		color: colors.white,
		backgroundColor: colors.blackGrey,
		borderRadius: 8,

},
buttonIn: {
    backgroundColor: colors.purple,
    borderRadius: 8,
    height: 50,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center'
},
buttonTextIn: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
},
passwordContainer: {
    marginBottom: 16,
    height: 50,
    // borderColor: colors.white,
    color: colors.white,
    borderRadius: 8,
    // borderWidth: 2,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
		backgroundColor: colors.blackGrey,
},
iconEye: {
    paddingHorizontal: 8,
    marginTop: 10,
		color: colors.white,
		backgroundColor: colors.blackGrey,
}
});