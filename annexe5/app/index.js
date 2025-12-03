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
      <TouchableOpacity onPress={() => itemPress(item)} >
        <Text style={styles.titleText}>{item.nom}</Text>
        <Text style={styles.descriptionText}>{item.lieu}</Text>
      </TouchableOpacity >
    
  );

  const itemPress = (item) => {
    Alert.alert('Description',  item.description,
              [
                {
                  text: 'OK',
                },
              ],
              {cancelable: true}
            );
  };

  const rechercheText = (text) => {
    setRecherche(text);
    if(text === '') {
      setFilteredData(merveillesDuMondeModerne);
      return;
    }
    else {
      let filtre = merveillesDuMondeModerne.filter((item) => item.nom.toLowerCase().includes(text.toLowerCase()))
      setFilteredData(filtre);
    }
  }
  

  return (
    <View>
      <TextInput placeholder='Recherche' style={styles.zoneInput} value={recherche} onChangeText={rechercheText}></TextInput>
      <FlatList
        data={filteredData}
        renderItem={renderListItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={<View style={styles.separateur}></View>}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  separateur:{
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },

  itemContainer: {
    padding: 10,
    borderBottomWidth: 2,
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