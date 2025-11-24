import { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { liste } from '../assets/libs/donnees.js';


function Galerie() {
  const [ index, setIndex ] = useState(0);

  //let index = 0;

  function gestion() {
    if(index < liste.length - 1){
      setIndex(index + 1);
      console.log('Index: ',{index})
    }
    if(index == liste.length - 1){
      setIndex(0)
      console.log('Index: ',{index})
    }
  } 
  function gestionPrec() {
    if(index == 0){
      setIndex(liste.length -1);
      console.log('Index: ',{index})
    }

    else{
      setIndex(index -1)
      console.log('Index: ',{index})
    }
  } 

  let oeuvre = liste[index];
  const image = { uri: oeuvre.url };
  return (
    
    <View style={styles.main}>
      <View style={styles.bouton}>
        <TouchableOpacity style={styles.styleBouton} onPress={gestion} title="suivant">
              <Text style={styles.styleBouton}>
                Suivant
              </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={gestionPrec} title="Précédent">
              <Text style={styles.styleBouton}>
                Précédent
              </Text>
        </TouchableOpacity>
      </View>
      <Text>
        {oeuvre.name + " de " +oeuvre.artist}
      </Text>
      <Text>  
        ({index + 1} of {liste.length})
      </Text>
      <Image style={styles.image}
        source={image} 
        
      />
     
    </View>
  );
}


const styles = StyleSheet.create(
  {
    image : {
      width:160,
      height:160,
    },

    main : {
      alignItems:'center',
      justifyContent:'center',
      flex:1,
      
    },
    bouton:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      gap:10,
    },
    styleBouton:{
      height:30,
      width:80,
      backgroundColor:'blue',
      color:'white',
      alignContent:'center',
      textAlign:'center',
      justifyContent:'center',
      textAlignVertical:'center',
      borderRadius:10
    }

  }
)
export default Galerie;

