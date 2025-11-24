import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";


const image = require("../assets/images/heart.png")



export default function App() 
{
	const [ aime, setAime ] = useState(false);
  const styleCoeur = aime ? styles.aime : styles.aime_pas;

	return (
      <View style={styles.fond}>
      	<TouchableOpacity onPress={() => {setAime(!aime)} }>
          <Image style={styleCoeur} source={image} >
          </Image>
        </TouchableOpacity>
      	<Text>{aime ? "J'aime" : "J'aime pas"}</Text>
      </View>

      );
}

const styles = StyleSheet.create(
  {
    aime:{
      tintColor:'red'
    },
    aime_pas:{
      tintColor:'cyan'
    },

    fond:{
      flex:1, //Toujours utilisé
      justifyContent:'center',
      alignItems:'center'
    }


  }
)
