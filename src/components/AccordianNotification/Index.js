import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager, Image} from "react-native";
import Colors from '../../styles/colors';
import Icon from "react-native-vector-icons/MaterialIcons";
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 

export default class AccordianNotification extends Component{

    constructor(props) {
        super(props);
        this.state = { 
          data: props.data,
          expanded : false,
					dataImg: props.dataImg,
					response: props.response,
					qtdMSG: props.qtdMSG
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
  
  render() {

    return (
       <View>
            <TouchableOpacity ref={this.accordian} style={this.state.expanded ? styles.rowOpen : styles.row} >
								<View style={styles.identifier}>
									<TouchableOpacity onPress={()=>this.toggleExpand()} style={{paddingTop: !this.state.expanded ? 10 : 0}}>
										{!this.state.expanded && (
										<Text style={{
											color: Colors.white, 
											backgroundColor: Colors.red, 
											fontSize: 15, 
											zIndex:5, 
											position: 'absolute', 
											fontWeight: 'bold', 
											borderRadius: 100, 
											width: this.props.qtdMSG > 99 ? 25 : 18, 
											height: 18, 
											marginTop:5, 
											textAlign: 'center', 
											display: 'flex', 
											alignItems: 'center'
										}}>{this.props.qtdMSG > 99 ? '+99': this.props.qtdMSG}</Text>
										)}
										<Image
											style={styles.selfPhoto}
											alt='self'
											source={{ uri: this.state.dataImg }}
										/>
									</TouchableOpacity>
									<TouchableOpacity onPress={() => this.props.response()}>
									{
										this.state.expanded &&
										<View style={{padding: 10, width: 250, display: 'flex'}}>
											<View style={styles.content}>
												<Text style={{width: 210, height: 30, paddingRight: 10}}>{this.props.data}</Text>    
												<View style={styles.act}>
												<Ionicons name="open-outline" size={24} color="black" />
												</View>
											</View>
										</View>
									}
									</TouchableOpacity>
								</View>
            </TouchableOpacity>
            
            
       </View>
    )
  }

  toggleExpand=()=>{
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded : !this.state.expanded})
  }

}

const styles = StyleSheet.create({
	title:{
		fontSize: 14,
		fontWeight:'bold',
		color: Colors.white,
		marginLeft: 10,
	},
	titleOpen:{
		fontSize: 14,
		fontWeight:'bold',
		color: Colors.blackSpace,
		marginLeft: 10,
	},
	row:{
		// marginTop:10,
		flexDirection: 'row',
		justifyContent:'space-between',
		height:50,
		width: 50,
		alignItems:'center',
		// backgroundColor: Colors.white,
		borderRadius: 100,
		marginRight: 10,
	},
	rowOpen:{
		// marginTop:10,
		flexDirection: 'row',
		justifyContent:'space-between',
		height:50,

		alignItems:'center',
		backgroundColor: Colors.white,
		borderRadius: 100,
		marginRight: 10,

	},
	parentHr:{
		// height:1,
		color: Colors.blackSpace,
		width:200
	},
	child:{
		backgroundColor: Colors.white,
		// padding:16,
		marginLeft: 10
	},
	selfPhoto: {
		width: 50,
		height: 50,
		borderRadius: 100,
		// borderColor: Colors.white,
		// borderWidth: 1,
	},
	identifier:{
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent:'space-between',
		// backgroundColor: 'red',
		// maxWidth: ,
		paddingRight: 10
	},
	content: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent:'space-between',
	},
	act:{
		width: 40,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent:'space-between',
	}
    
});