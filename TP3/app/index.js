import { Link } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const imageVille = require("../assets/images/Saint-Basile.jpg")


  return (
    <View style={styles.main}>
        <Text style={styles.text}>Application TP3</Text>
        <Text>Ville: Saint-Basile-Le-Grand</Text>
        <Image style={styles.image} resizeMode="contain" source={imageVille}></Image>
        <Link style={styles.lien} href="pages/pageCoordonnee">Suivant</Link>
        <Link style={styles.lien} href="pages/pageCarte">Carte</Link>
    </View>
  );
}


const styles = StyleSheet.create(

  {
    main:{
      alignItems:'center',
      justifyContent:'center',
      flex:1,
      gap:10,
    },
    text:{
      fontSize:40,
    },
    lien:{
      fontSize:30,
      height:60,
      width:120,
      backgroundColor:'blue',
      color:'white',
      padding:6,
      textAlign:'center',
      alignItems:'center',
      alignContent:'center',
      borderRadius:20
    },
    image:{
      width: 400, // Or use Dimensions.get('window').width for dynamic sizing
      height: 350,
    },
  }
)