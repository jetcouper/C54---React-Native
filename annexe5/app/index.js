import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

import { merveillesDuMondeModerne } from '../assets/libs/merveilles.js';

function Liste(){

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
  

  return (
    <FlatList
      data={merveillesDuMondeModerne}
      renderItem={renderListItem}
      keyExtractor={(item) => item.id.toString()}
    />
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
});

export default Liste;