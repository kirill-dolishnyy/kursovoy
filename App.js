import React from 'react';
import { 
  ImageBackground, 
  StyleSheet, 
  Text,
  View, 
  StatusBar,
  ActivityIndicator
} from 'react-native';

import SearchBar from './components/SearchBar';
import StockView from './components/StockView';
import fetchStocks from './utils/fetchStocks';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loading: false,
      error: false,
      stockName: '',
      Sector:'',
      stockTicker: '',
      Pe: '',
      Ps: '',
      Pbv:'',
      Evebitda:'',
      Debt:'',

    }
  }  
  
  handleFetchStocks = async (stockTickerSymbol) => {
    if (stockTickerSymbol) {
      this.setState({
        loading: true
      },
        async () => {
        try {
          const { stockTicker,  stockName, Sector, Pe, Ps, Pbv, Evebitda, Debt } = await fetchStocks(stockTickerSymbol); 
          this.setState({
            error: false,
            loading: false,
            stockName: stockName,
            Sector: Sector,
            stockTicker: stockTicker,
            Pe: Pe,
            Ps:Ps,
            Pbv:Pbv,
            Evebitda:Evebitda,
            Debt:Debt
          });
        } catch (e) {
          this.setState({
            error: true,
            loading: false
          });
        }
      });
    } else {
      return;
    }
  }
  

  componentDidMount() {
    this.handleFetchStocks('gazp')
  }  
  
  render() {
    const {
      loading,
      error,
      stockName,
      Sector,
      stockTicker,
      Pe,
      Ps,
      Pbv,
      Evebitda,
      Debt
    } = this.state;
    
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ImageBackground 
        source={require('./assets/unknw.png')}
        style={styles.imageContainer}
        imageStyle={styles.image}

        >
          <View style={styles.detailsContainer}>
            <ActivityIndicator
              animating={loading}
              color="#007AFF"
              size="large"
            />            
          
            {!loading && error && 
              <View>
                <Text style={[styles.smallText, styles.textStyle]}>
                  Could not load the stock price, please try again.
                </Text>
                <SearchBar
                  placeholderTextInputLabelText="Search another"
                  onSubmit={this.handleFetchStocks}
                />
              </View>
            }

            {!loading && !error && stockName === 'ml' &&
              <View>
                <Text style={[styles.smallText, styles.textStyle]}>
                  Wrong tiker, please check it and try again.
                </Text>
                <SearchBar
                  placeholderTextInputLabelText="Search another"
                  onSubmit={this.handleFetchStocks}
                />
              </View>
            }

            
            {!loading && !error && stockName != 'ml' &&
              
              <StockView 
              stockName={stockName}
              stockTicker={stockTicker}
              Sector = {Sector}
              Pe={Pe}
              Ps ={Ps}
              Pbv = {Pbv}
              Evebitda = {Evebitda}
              Debt = {Debt}
              onSubmit={this.handleFetchStocks}
              />
          
            }
    
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  textStyle: {
    fontFamily: 'Roboto',
    textAlign: 'center',
    color: 'white',
  },
  smallText: {
    fontSize: 25,
  },
  imageContainer: {
    flex: 0,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
  }
});