import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const image = require("../assets/images/caufield.jpg")

export default function Index() {

  const [ nom, setNom ] = useState(false);

  return (
    <View style={styles.ecran}>
      <Text style={styles.text}>Cliquez sur la photo pour savoir mon nom !</Text>
      <TouchableOpacity onPress={() => {setNom(!nom)}}>
        <Image source={image} ></Image>
      </TouchableOpacity>
      
      <Text style={styles.textCole}>
        {nom && "Cole Caufield, #13"}
      </Text>
    </View>
  );
}



const styles = StyleSheet.create(
  {
    ecran:{
      justifyContent:'center',
      alignItems:'center',
      flex:1,
    },
    text:{
      fontWeight:'bold',
      textAlign:'center',
      fontSize:24,
    },
    textCole:{
      fontWeight:'bold',
      textAlign:'center',
      fontSize:24,
      color:'red'
    }
  }


)
