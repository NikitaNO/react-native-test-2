import React from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList
} from 'react-native'

import DrinkPreview from './DrinkPreview'
import { getDrinksList } from '../../api/drinks';

class HomePage extends React.Component {

  state = {
    drinks: []
  }

  componentDidMount() {

    getDrinksList()
    .then(res => {
      const {drinks} = res.data;

      this.setState({drinks});
    })
    .catch(err => {
      console.log(err);
    });

  }

  render() {
    const {drinks} = this.state;
    const {navigation} = this.props;

    if(!drinks.length) {
      return ( 
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large"/>
        </View>
      );
    }

    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.headerText}>Random drinks 0.1</Text>
        </View>

        <FlatList 
          data={drinks}
          renderItem={({item}) => <DrinkPreview navigation={navigation} data={item} />}
          keyExtractor={(item) => item.idDrink}
          style={styles.scrollContainer} />
        
      </View>
    );
  }
};

export default HomePage;

const styles = StyleSheet.create({

  loaderContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'    
  },

  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#2bedff',
    alignItems: 'center'
  },

  scrollContainer: {
    width: '100%',
    paddingHorizontal: 20
  },

  header: {
    marginVertical: 15
  },

  headerText: {
    color: '#fff',
    fontSize: 18
  }

});