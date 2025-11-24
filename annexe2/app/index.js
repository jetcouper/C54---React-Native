import { Image, StyleSheet, View } from "react-native";


const imagePlay = require("../assets/images/play.png")
const imageFull = require("../assets/images/full-screen.png")
const imageHD = require("../assets/images/hd-sign.png")
const imageSound = require("../assets/images/sound.png")
const imageFond = require("../assets/images/video.jpg")


export default function Index() {
  return (
    <View style={styles.ecran}>
      <Image style={styles.image} source={imageFond}>
      </Image>
      <View style={styles.ligneControle}>
          <Image source={imagePlay}></Image>
          <Image source={imageSound}></Image>
          <View style={styles.conteneur}>
            <View style={styles.liquide}>

            </View>
          </View>
          <Image source={imageHD}></Image>
          <Image source={imageFull}></Image>
      </View>
    </View>
  );
}

const styles = StyleSheet.create(

  {
    ecran:{
      justifyContent:'center',
      flex:1
    },
    image:{
        height:'40%'
    },
    ligneControle:{
      height:50,
      alignItems:'center',
      backgroundColor: "black",
      flexDirection:'row',
      justifyContent:'space-around'
    },
    conteneur:{
      height:15,
      justifyContent:'flex-start',
      alignItems:'stretch',
      flexDirection:'row',
      backgroundColor:"grey",
      width:150,
      borderRadius: 5,
      
    },
    liquide:{
      backgroundColor:"red",
      width:60,
      borderRadius: 15
    }
  }
)