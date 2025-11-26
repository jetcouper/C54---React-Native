import { useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { merveillesDuMondeModerne } from '../assets/libs/merveilles.js';


function Liste(){
  const [ recherche, setRecherche ] = useState('');
  const [ filteredData, setFilteredData ] = useState(merveillesDuMondeModerne);

  const renderListItem = ({ item }) => (
      <TouchableOpacity onPress={() => itemPress(item)} style={styles.itemContainer}>
        <Text style={styles.titleText}>{item.nom}</Text>
        <Text style={styles.descriptionText}>{item.lieu}</Text>
      </TouchableOpacity >
    
  );

  const itemPress = (item) => {
    Alert.alert('Description',  item.description,
              [
                {
                  text: 'OK',
                  onPress: () => console.log('OK Pressed for ' + item.description),
                },
              ],
              {cancelable: true}
            );
  };

  const rechercheText = (text) => {
    setRecherche(text);
    if(text.length === 0) {
      setFilteredData(merveillesDuMondeModerne);
      return;
    }
    else {
      setFilteredData(merveillesDuMondeModerne.filter((item) => item.nom.toLowerCase().includes(text.toLowerCase())));
    }
  }
  

  return (
    <View>
      <TextInput style={styles.zoneInput} value={recherche} onChangeText={rechercheText}></TextInput>
      <FlatList
        data={filteredData}
        renderItem={renderListItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  zoneInput: {
    backgroundColor: '#b3aaaaff',
  },

});

export default Liste;