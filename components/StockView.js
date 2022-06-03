import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchBar from './SearchBar';
import Simple from './simple'
import New from './new'

export default function StockView(props) {
  console.log(props)
	return (
    
    <View>
      
    
    <Text 
      style={[styles.textStyle,styles.largeText]}>
        {props.stockName}
    </Text>

    <Text 
      style={[styles.textStyle,styles.mediumText]}>
        {props.Sector}
    </Text>

		<Text 
        style={[styles.rectangleShapeContainer, props.Pe < 10 && styles.positiveChange || props.Pe > 15 && styles.negativeChange || props.Pe >10<15 && 
        styles.normalChange, styles.smallText, styles.textStyle]}>
        {'P/E: ' }{props.Pe}
    </Text>
    <Text 
      style={[styles.rectangleShapeContainer, props.Ps < 1 && styles.positiveChange || props.Ps > 2 && styles.negativeChange || props.Ps >1<2 && 
        styles.normalChange, styles.smallText, styles.textStyle]}>
        {'P/S: ' }{props.Ps}
    </Text>
    <Text 
      style={[styles.rectangleShapeContainer, props.Pbv < 1 && styles.positiveChange || props.Pbv > 2 && styles.negativeChange || props.Pbv >1<2.5 && 
        styles.normalChange, styles.smallText, styles.textStyle]}>
        {'P/BV: ' }{props.Pbv}
    </Text>
    <Text 
      style={[styles.rectangleShapeContainer, props.Evebitda < 1 && styles.positiveChange || props.Evebitda > 10 && styles.negativeChange || props.Evebitda >1<9 && 
        styles.normalChange, styles.smallText, styles.textStyle]}>
        {'EV/EBITDA: ' }{props.Evebitda}
    </Text>
     <View>
    <Text
      style={[styles.rectangleShapeContainer, props.Debt > 1 ? styles.positiveChange : styles.negativeChange,styles.smallText, styles.textStyle]}>
        {'DEBT/EBITDA: '}{props.Debt}
    </Text>
    </View>
    
			<SearchBar 
				placeholderTextInputLabelText="Search (e.g. AAPL)" 
				onSubmit={props.onSubmit}
			/>
      <New></New>
      
      
      
		</View>

	)
}

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Roboto',
    textAlign: 'center',
    color: 'white',
  },
    borders:{
      flex:0,
      borderWidth:1,
      borderStyle: 'solid',
      borderColor: 'green',
      backgroundColor:'grey',
      borderRadius: 1,
      justifyContent: 'center',
      
      
    },
  largeText: {
    fontSize: 45,
  },
  mediumText: {
    fontSize: 20,
  },
  smallText: {
    fontSize: 25,
  },
  rectangleShapeContainer: {
    flex:0,
    marginTop: 10,
    marginHorizontal: 'auto' ,
    borderColor: 'grey',
    borderStyle: 'solid',
    borderWidth: 3,
    borderRadius: 2,
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  positiveChange: {

    backgroundColor: 'green',
  },
  negativeChange: {
    backgroundColor: 'red',
  },
  normalChange:{
    backgroundColor: '#9a8901',
  }
});