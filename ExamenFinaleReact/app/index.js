import { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { joueuses } from '../assets/joueuses';


const Index = () => {
  const [nom, setNom] = useState("");
  const [image, setImage] = useState(null);

  const changerImage = (item) => {
    setNom(item.nom)
    setImage(item.image)
  }

  const renderListItem = ({ item }) => (
    <View style={styles.sliderMain}>
      <TouchableOpacity style={styles.sliderView} onPress={() => changerImage(item)}>
        <Text >{item.numero}</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.main}>
      <FlatList
        style={styles.flat}
        data={joueuses}
        renderItem={renderListItem}
        ItemSeparatorComponent={<View ></View>}
      />
      <View>
        {image && nom ? (
          <View style={styles.textImage}>
            <Image source={image}>

            </Image>
            <Text style={styles.textImage}>
              {nom}
            </Text>
          </View>
        )
          :
          (
            <View>
              <Image >
              </Image>
              <Text>
              </Text>
            </View>
          )}

      </View>
      { }
    </View>
  );
}
export default Index;


const styles = StyleSheet.create(
  {
    flat: {
      width: '100%',
      gap: 10,
    },
    main: {
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      textAlign: 'center',
      gap: 10,
    },
    textImage: {
      textAlign: 'center',
    },

    sliderMain: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      marginTop: 10
    },
    sliderView: {
      width: 40,
      height: 40,
      gap: 10,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }


  }
)