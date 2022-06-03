import React from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, View } from 'react-native';

export default class SearchBar extends React.Component {
	constructor(props) {
		
		super(props);
		this.state = {
			textValue: '',
		};
	}	handleChangeText = (newStockSymbolTextValue) => {
		
		this.setState({
			textValue: newStockSymbolTextValue
		});
	}

    	handleSubmitEditing = () => {
		
		const { onSubmit } = this.props;		
		const { textValue } = this.state;	
        
        if (textValue.length > 0) {
			
			onSubmit(textValue);			
			this.setState({
				textValue: '',
			});

		} else {
			return;
		}
	}
    	render() {
		const { placeholderTextInputLabelText } = this.props;
		const { textValue } = this.state;		
        
        return (
			<View>
				<View style={styles.container}>
					<TextInput 
						style={styles.textInput}
						value={textValue}
						placeholder={placeholderTextInputLabelText}
						placeholderTextColor="white"
						underlineColorAndroid="transparent"
						clearButtonMode="always"
						autoCorrect={false}
						onChangeText={this.handleChangeText}
						onSubmitEditing={this.handleSubmitEditing}
					/>				
				</View>
				<TouchableOpacity
          style={styles.submitButton}
          onPress={this.handleSubmitEditing}
      	>
					<Text style={[styles.buttonText, styles.textStyle]}>Submit</Text>
				</TouchableOpacity>
			</View>
		);
    }
}


const styles = StyleSheet.create({
	container: {
		height: 40,
		marginTop: 20,
		backgroundColor: '#7F8C8D',
		marginHorizontal: 80,
		paddingHorizontal: 10,
		borderRadius: 5,
	},
	textInput: {
		flex: 1,
		color: 'white',
		textAlign: 'center',
		fontFamily: 'Roboto',
	},
	submitButton: {
		height: 40,
		marginTop: 10,
		backgroundColor: '#007AFF',
		marginHorizontal: 80,
		paddingHorizontal: 10,
		borderRadius: 5,
		justifyContent: 'center'
	},
	textStyle: {
		fontFamily: 'Roboto',
		textAlign: 'center',
		color: 'white',
	},
	buttonText: {
		fontSize: 20,
	}
});