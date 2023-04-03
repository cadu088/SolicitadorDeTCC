import React, {useState} from 'react';
import {
    TextInput,
    StyleSheet,
    Text,
    View,
    FlatList,
    Alert,
		Image,
		Button,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import api from '../../ApiService/api';

import MyButton  from '../../Components/MyButton/Index';
import LinkButton from '../../Components/LinkButton/Index';

import colors from '../../styles/colors';
//import Loading from '../../Components/Loading/Loading';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Switch } from 'react-native-gesture-handler';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const eye = 'eye';
const eyeOff = 'eye-off';



export default function NewDataStudent() {
 
    const [flShowPass, setShowPass] =  useState(false);
    const [iconPass, setIconPass] =  useState(eye);

    const [txtName, setName] = useState('')
    const [txtDocument, setDocument] = useState('')
    const [txtEmail, setEmail] = useState('')
    const [txtPassword, setPassword] = useState('')
    const [txtPasswordConfirm, setPasswordConfirm] = useState('')
    const navigation = useNavigation();
 //   const [flLoading, setLoading] = React.useState(false)
    const [lstErrors, setListErrors] = useState([]);
    const [isStudent, setIsStudent] = useState(true);
    const [isSelf, setIsSelf] = useState({ uri: 'https://avatars.githubusercontent.com/u/72260079?v=4' });


    

    function handleChangeIcon() {
         let icone = iconPass == eye ? eyeOff : eye;
         let flShowPassAux = !flShowPass;
         setShowPass(flShowPassAux);
         setIconPass(icone);
     }
 
     function handleChangeIconConfirm() {
        let icone = iconPass == eye ? eyeOff : eye;
         let flShowPassAux = !flShowPass;
         setShowPass(flShowPassAux);
         setIconPass(icone);
     }
 
     async function handlePostNewStudent() {
        if(camposPrenchidos()){
            let objNewStudent = {
                name: txtName,
                password: txtPassword,
                document: txtDocument,
                login: txtEmail
            };

             const response = await api.post(`/Users`, objNewStudent);
             alert('Usuario Criado!');
        }
     }
 
     function camposPrenchidos(){
        let validacoes = [];
        let retorno = true;
        if (txtName.trim() === '') {
            validacoes.push('Campo Nome é obrigatório');   
            retorno = false;         
        }
        if (txtEmail.trim() === '') {
            validacoes.push('Campo Email é obrigatório');            
            retorno = false;         
        }
        setListErrors(validacoes);
        return retorno;
     }
 
 /*    function navigateToBack() {
         navigation.goBack();
     }
 */
     function navigateToBack() {
         navigation.goBack();
     }

		 function onFromPickerImage() {
			var options = {
				title: 'Select Avatar',
				storageOptions: {
					skipBackup: true,
					path: 'images'
				}
			};
			launchImageLibrary(options, (response)  => {
				// Same code as in above section!
				let source = { uri: response.data };

				setIsSelf(source);

				if (response.data) {
					if (clickedPage =='report') {
						this.props.addressActions.addImage({res: response.data});
					} else {
						this.props.accountActions.addImage({res: response.data});
					}
				}

			});
		}
 
 
   return (
     <SafeAreaView style={styles.container}>

        <Text style={styles.title}>Escolha a Area</Text>
        <View style={styles.frame}>
            <Text style={styles.pin} onPress={() => Alert('Msg')}>
                Sistemas de informação
            </Text>
            <Text style={styles.pin} onPress={() => Alert('Msg')}>
                Direito
            </Text>
            <Text style={styles.pin} onPress={() => Alert('Msg')}>
                ioT
            </Text>
        </View>

			
     <LinkButton title='Concluir' onPress={navigateToBack}/>
 </SafeAreaView>
 
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
    frame:{
        backgroundColor: colors.white,
        width: '90%',
        height: '80%',
        borderRadius: 8,
        borderColor: colors.blackWhite,
        borderWidth: 2,
        display:'flex', 
		flexDirection: 'row',
        padding: 2
    },
    title: {
		color: colors.white,
		fontSize: 25,
		marginBottom:10,
        fontWeight:'bold'
	}, 
    pin:{
        backgroundColor: colors.white,
        display: 'flex',
        height: 25,
        textAlign: 'center',
        justifyContent: 'center',
        padding: 5,
        margin: 3,
        borderRadius: 8,
        fontSize: 15,
        fontWeight: 'bold',
        borderColor: colors.blackWhite,
        borderWidth: 1,
        opacity: 0.5
    }

	
	
 });