import { StyleSheet, Text, View } from "react-native";


//VERSION NORMALE
/* export default  */function Chanson({nom}) {
  //const nom = "L’autre hémisphère";
  return (
    <View style={styles.fond}>
      <Text style={styles.texte}>{nom}</Text>
    </View>
  );
}

//VERSION ARROW-FUNCTION
// const Chanson = () => {
//   const nom = "Goéland";
//   return (
//     <View>
//       <Text>{nom}</Text>
//     </View>
//   );
// }
// export default Chanson;

//VERSION DE COMPOSANTE DE CLASSE
// class Chanson extends React.Component
// {
//   render() {
//     const nom = "Beat it";
//     return (
//       <View>
//         <Text>{nom}</Text>
//       </View>
//     );
//   }
// }
// export default Chanson;


function PlayList(nom) {
  return (
    <View>
      {creerTab2Lignes("Touch me")}
    </View>
  );
}

// function creerTab(nom){
//   let tab = [];
//       for (let i = 0; i < 4; i++) {
//         tab[i]= <Chanson nom={nom} key={i}/>
//       }
//   return tab
// }

function creerTab2Lignes(nom){
  let tab = [];
    for (let i = 0; i < 2; i++) 
      {
        //Chaque élément du tableau représente une ligne
        tab[i]=  
        <View key={i} style={styles.ligne}>
            <Chanson nom={nom} />
            <Chanson nom={nom}/>
        </View>
      }
  return tab;

}


export default PlayList;


const styles = StyleSheet.create(

  {
    fond: {
      backgroundColor: "green",
      margin: 8,
      borderRadius: 4
    },
    texte: {
      fontSize: 26,
      fontStyle: "italic",
      textAlign: "center"
    },
    ligne:{
      flexDirection:'row',
      justifyContent:'space-between'
    }
  }
)


