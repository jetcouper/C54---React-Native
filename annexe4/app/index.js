import { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { liste } from '../assets/libs/donnees.js';


function Galerie() {
  const [ index, setIndex ] = useState(0);
  const [ ferme, setFerme ] = useState(false);
  const nomBouton = ferme ? "Fermer description" : "Afficher description";


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
      <TouchableOpacity  onPress={() => setFerme(!ferme)}>
        <Text style={styles.styleBouton}>
          {nomBouton}
        </Text>
      </TouchableOpacity>
      <ScrollView style={{flexGrow:0}} contentContainerStyle={styles.contentContainer}>
        <Text style={{textAlign:'center', paddingHorizontal:10}}>
        {!ferme && oeuvre.desc}
        </Text>
      </ScrollView>
      
     
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
      alignContent:'center',
      gap:10,
    },
    bouton:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      gap:10,
    },
    styleBouton:{
      height:40,
      width:100,
      backgroundColor:'blue',
      color:'white',
      alignContent:'center',
      textAlign:'center',
      justifyContent:'center',
      textAlignVertical:'center',
      borderRadius:10
    },
    contentContainer:{
      paddingVertical: 20,
      alignItems: 'center',
      paddingVertical: 20,
      textAlign: 'center',
    },

  }
)
export default Galerie;

