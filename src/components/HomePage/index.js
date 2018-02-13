import React from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList
} from 'react-native'

import DrinkPreview from './DrinkPreview'
import Loader from '../../common/components/Loader'
import { getDrinksList } from '../../api/drinks';

import commonStyles from '../../common/styles'

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

    if(!drinks.length) return <Loader />

    return (
      <View style={commonStyles.container}>

        <View style={commonStyles.header}>
          <Text style={commonStyles.headerText}>Random drinks 0.1</Text>
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

  scrollContainer: {
    width: '100%',
    paddingHorizontal: 20
  },

});