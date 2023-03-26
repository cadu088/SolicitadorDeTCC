import React, {useState} from 'react';
import {
    TextInput,
    StyleSheet,
    Text,
    View,
    FlatList,
    Alert,
		Image
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import api from '../../ApiService/api';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import MyButton  from '../../Components/MyButton/Index';
import LinkButton from '../../Components/LinkButton/Index';

import colors from '../../styles/colors';
//import Loading from '../../Components/Loading/Loading';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Switch } from 'react-native-gesture-handler';

const eye = 'eye';
const eyeOff = 'eye-off';



export default function NewUser() {
 
    const [flShowPass, setShowPass] =  useState(false);
    const [iconPass, setIconPass] =  useState(eye);
    const [isSelf, setIsSelf] = useState({ uri: 'https://avatars.githubusercontent.com/u/72260079?v=4' });

    const [txtName, setName] = useState('')
    const [txtDocument, setDocument] = useState('')
    const [txtEmail, setEmail] = useState('')
    const [txtPassword, setPassword] = useState('')
    const [txtPasswordConfirm, setPasswordConfirm] = useState('')
    const navigation = useNavigation();
 //   const [flLoading, setLoading] = React.useState(false)
    const [lstErrors, setListErrors] = useState([]);
    const [isStudent, setIsStudent] = useState(true);

    
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

            //  const response = await api.post(`/Users`, objNewStudent);
            //  alert('Usuario Criado!');

						if(isStudent){
							navigation.navigate('NewDataStudent'); 
						}
        }
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
 
     function camposPrenchidos(){
        let validacoes = [];
        let retorno = true;
        // if (txtName.trim() === '') {
        //     validacoes.push('Campo Nome é obrigatório');   
        //     retorno = false;         
        // }
        // if (txtEmail.trim() === '') {
        //     validacoes.push('Campo Email é obrigatório');            
        //     retorno = false;         
        // }
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
 
 
   return (
     <SafeAreaView style={styles.container}>
			<View style={styles.content}>			
		 <View >
				{/* <Text style={styles.textTitle}>Adicione uma foto</Text> */}

				<View style={{display:'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
						<Image
							style={styles.selfPhoto}
							alt='self'
							source={isSelf}
						/>
						{/* <LinkButton title='Adicionar'onPress={onFromPickerImage} /> */}

					
				</View>

			</View>
     <TextInput
         style={styles.textInput}
         placeholder="Nome"
         onChangeText={text => setName(text)}
         maxLength={50}
         value={txtName}
				 placeholderTextColor={colors.white}
     />
     <TextInput
         style={styles.textInput}
         placeholder="CPF"
         onChangeText={text => setDocument(text)}
         maxLength={11}
         value={txtDocument}
				 placeholderTextColor={colors.white}
     />
     <TextInput
         style={styles.textInput}
         placeholder="Email"
         onChangeText={text => setEmail(text)}
         maxLength={50}
				 placeholderTextColor={colors.white}
         value={txtEmail}
     />

		

		<View style={styles.switch}>
			<Text style={!isStudent ? styles.textActive : styles.textDisabled}>Orientador</Text>
			<Switch 
			trackColor={{false: '#767577', true: '#767577'}}
			thumbColor={colors.blue}
			ios_backgroundColor="#3e3e3e"
			onValueChange={() => setIsStudent(!isStudent)}
			value={isStudent}
			
			/>
			<Text style={isStudent ? styles.textActive : styles.textDisabled}>Aluno</Text>
		</View>

		{isStudent && (
			<TextInput
				style={styles.textInput}
				placeholder="RA"
				onChangeText={text => setDocument(text)}
				maxLength={11}
				placeholderTextColor={colors.white}
				value={txtDocument}
			/>
		)}

<Text></Text>
			{/* <br/> */}
		
		
 
    
<View style={styles.passwordContainer}>
         <TextInput
             style={styles.textInputPassword}
             placeholder="Senha"
             onChangeText={text => setPassword(text)}
             value={txtPassword}
             secureTextEntry={flShowPass}
             maxLength={11}
						 placeholderTextColor={colors.white}
         />
         <Feather
             style={styles.iconEye}
             name={iconPass}
             size={28}
             color={colors.white}
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
						 placeholderTextColor={colors.white}
         />
         <Feather
             style={styles.iconEye}
             name={iconPass}
             size={28}
             color={colors.white}
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
     <MyButton title='Avançar' onPress={handlePostNewStudent} />
        
     <LinkButton title='Voltar' onPress={navigateToBack} />
			</View>
 </SafeAreaView>
 
 );
 }
 
 
 const styles = StyleSheet.create({
 container: {
 flex: 1,
 backgroundColor: colors.blue,
 alignItems: 'center',
 justifyContent: 'center'
 },
 content: {
	flex: 1,
	marginTop: 5,
	marginBottom: 10,
	borderRadius: 16,
	paddingTop: 20,
	width: '90%',
	backgroundColor: colors.blackSpace,
	alignItems: 'center',
	justifyContent: 'center'
 },

 selfPhoto: {
	width: 120,
	height: 120,
	borderRadius: 120
},
 textTitle: {
 color: colors.white,
 fontSize: 28,
 marginBottom: 8
 },
 switch: {
	display: 'flex',
	flexDirection: "row",
	justifyContent: 'center',
	alignItems: 'center'
 },
 textActive:{
	fontWeight: 'bold',
	color: colors.white,
 },
 textDisabled:{
	fontWeight: '200',
	color: colors.white,
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