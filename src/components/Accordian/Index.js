import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager, Image} from "react-native";
import Colors from '../../styles/colors';
import Icon from "react-native-vector-icons/MaterialIcons";
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 

export default class Accordian extends Component{

    constructor(props) {
        super(props);
        this.state = { 
          data: props.data,
          expanded : true,
					dataImg: props.dataImg,
					response: props.response
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
  
  render() {

    return (
       <View>
            <TouchableOpacity ref={this.accordian} style={this.state.expanded ? styles.rowOpen : styles.row} onPress={()=>this.toggleExpand()}>
								<View style={styles.identifier}>
									<Image
										style={styles.selfPhoto}
										alt='self'
										source={{ uri: this.state.dataImg }}
									/>
									<Text style={[styles.title, styles.font]}>
										{this.props.title}
									</Text>
								</View>
              
                <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={Colors.DARKGRAY} />
            </TouchableOpacity>
            <View style={styles.parentHr}/>
            {
                this.state.expanded &&
                <View style={styles.child}>
									<View style={styles.content}>
										<Text 
											style={{
												fontSize: 17,
												maxWidth: '90%'
											}}
										>{this.props.data}</Text>    
										<View style={styles.act}>
											<Feather name="check-circle" size={20} color="green" onPress={() => this.props.response()} />
											{/* <AntDesign name="infocirlceo" size={20} color="red" onPress={() => this.props.response('details')} /> */}
										</View>
									</View>
                </View>
            }
            
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
		color: Colors.blackGrey,
		marginLeft: 10,
	},
	row:{
		marginTop:10,
		flexDirection: 'row',
		justifyContent:'space-between',
		height:40,
		paddingLeft:8,
		paddingRight:10,
		alignItems:'center',
		backgroundColor: Colors.white,
		borderRadius: 100,
		borderWidth: 0,
	},
	rowOpen:{
		marginTop:10,
		flexDirection: 'row',
		justifyContent:'space-between',
		height:40,
		paddingLeft:8,
		paddingRight:10,
		alignItems:'center',
		backgroundColor: Colors.white,
		borderBottomEndRadius: 0,
		borderBottomStartRadius: 0,
		borderTopEndRadius: 8,
		borderTopStartRadius: 8,
	},
	parentHr:{
		// height:1,
		color: Colors.white,
		width:'100%'
	},
	child:{
		backgroundColor: Colors.white,
		padding:16,
		borderBottomEndRadius: 8,
		borderBottomStartRadius: 8,
	},
	selfPhoto: {
		width: 30,
		height: 30,
		borderRadius: 100,
		// borderColor: Colors.white,
		// borderWidth: 1,
		padding:1
	},
	identifier:{
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent:'space-between',
		// paddingTop: 10
		// backgroundColor: 'red',
		// width: '80%'
	},
	content: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent:'space-between',
	},
	act:{
		width: 50,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent:'flex-end',
	}
    
});