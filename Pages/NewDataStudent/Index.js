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

			<View>
				<Text style={styles.textTitle}>Adicione uma foto</Text>

				<View style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
						<Image
							style={styles.selfPhoto}
							alt='self'
							source={isSelf}
						/>
						<LinkButton title='Adicionar'onPress={onFromPickerImage} />
					
				</View>

			</View>
     


     <TextInput
         style={styles.textInput}
         placeholder="Nome"
         onChangeText={text => setName(text)}
         maxLength={50}
         value={txtName}
     />
     <TextInput
         style={styles.textInput}
         placeholder="CPF"
         onChangeText={text => setDocument(text)}
         maxLength={11}
         value={txtDocument}
     />
     <TextInput
         style={styles.textInput}
         placeholder="Email"
         onChangeText={text => setEmail(text)}
         maxLength={50}
         value={txtEmail}
     />

		{isStudent && (
			<TextInput
				style={styles.textInput}
				placeholder="RA"
				onChangeText={text => setDocument(text)}
				maxLength={11}
				value={txtDocument}
			/>
		)}

		<View style={styles.switch}>
			<Text style={!isStudent ? styles.textActive : styles.textDisabled}>Orientador</Text>
			<Switch 
			trackColor={{false: '#767577', true: '#767577'}}
			thumbColor={isStudent ?  colors.redButton : '#6AE200'}
			ios_backgroundColor="#3e3e3e"
			onValueChange={() => setIsStudent(!isStudent)}
			value={isStudent}
			
			/>
			<Text style={isStudent ? styles.textActive : styles.textDisabled}>Aluno</Text>
		</View>

		
		
 
    
<View style={styles.passwordContainer}>
         <TextInput
             style={styles.textInputPassword}
             placeholder="Senha"
             onChangeText={text => setPassword(text)}
             value={txtPassword}
             secureTextEntry={flShowPass}
             maxLength={11}
         />
         <Feather
             style={styles.iconEye}
             name={iconPass}
             size={28}
             color={colors.redButton}
             onPress={handleChangeIcon}
         />
     </View>
     <View style={styles.passwordContainer}>
         <TextInput
             style={styles.textInputPassword}
             placeholder="Confirmar Senha"
             onChangeText={text => setPasswordConfirm(text)}
             value={txtPasswordConfirm}
             secureTextEntry={flShowPass}
             maxLength={11}
         />
         <Feather
             style={styles.iconEye}
             name={iconPass}
             size={28}
             color={colors.redButton}
             onPress={handleChangeIconConfirm}
         />
     </View>

  <FlatList
 
         data={lstErrors}
         keyExtractor={error => error}
         showsVerticalScrollIndicator={false}
         renderItem={({ item }) => (
             <Text>{item}</Text>
 
         )}
     />
     <MyButton title='Salvar' onPress={handlePostNewStudent} />
        
     <LinkButton title='Voltar'
                onPress={navigateToBack}
            />
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
	selfPhoto: {
		width: 120,
		height: 120,
		borderRadius: 120
	},
	textTitle: {
		color: colors.white,
	fontSize: 24,
	marginBottom: 8,
	fontWeight: 'bold',
	},
	switch: {
		display: 'flex',
		flexDirection: "row",
		justifyContent: 'center',
		alignItems: 'center'
	},
	textActive:{
		fontWeight: 'bold',
	},
	textDisabled:{
		fontWeight: '200',
	},
	textInput: {
	height: 40,
	backgroundColor: colors.blackSpace,
	borderRadius: 8,
	// borderWidth: 1,
	width: '70%',
	marginBottom: 16,
	paddingHorizontal: 8
	},
	textInputPassword: {
	height: 40,
	borderWidth: 0,
	width: '70%',
	marginBottom: 16,
	paddingHorizontal: 8
	},
	buttonIn: {
	backgroundColor: colors.redButton,
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
	height: 40,
	borderColor: '#dcdce6',
	borderRadius: 8,
	borderWidth: 1,
	width: '70%',
	flexDirection: 'row',
	justifyContent: 'space-between'
	},
	iconEye: {
	paddingHorizontal: 8,
	marginTop: 6
	},
 });