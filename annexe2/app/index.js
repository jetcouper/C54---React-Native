import { Image, StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.fond}>
      <Image source={imageFond}>
      </Image>
      <View style={styles.fond2}>
          <Image source={imagePlay}></Image>
          <Image source={imageSound}></Image>
          <View style={styles.fondSeek}>
            <View style={styles.fondSeek2}>

            </View>
          </View>
          <Image source={imageHD}></Image>
          <Image source={imageFull}></Image>
      </View>
    </View>
  );
}

const imagePlay = require("../assets/images/play.png")
const imageFull = require("../assets/images/full-screen.png")
const imageHD = require("../assets/images/hd-sign.png")
const imageSound = require("../assets/images/sound.png")
const imageFond = require("../assets/images/video.jpg")

const styles = StyleSheet.create(

  {
    fond: {
      alignItems:'center',
      justifyContent:'center',
      flex:1
    },
    fond2:{
      height:50,
      width:'100%',
      alignItems:'center',
      backgroundColor: "black",
      flexDirection:'row',
      justifyContent:'space-around'
    },
    fondSeek:{
      height:15,
      flexDirection:'row',
      backgroundColor:"grey",
      width:150,
      borderRadius: 15,
      
    },
    fondSeek2:{
      height:15,
      flexDirection:'row',
      backgroundColor:"red",
      width:100,
      borderRadius: 15
    }
  }
)