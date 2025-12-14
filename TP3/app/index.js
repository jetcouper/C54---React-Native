import { Link } from "expo-router";
import { Image, Pressable, View } from "react-native";
import { styles } from '../assets/libs/styles';
import CustomText from "../components/CustomText";


export default function Index() {
  const imageVille = require("../assets/images/Saint-Basile.jpg")

  return (
    <View style={styles.main}>
      <CustomText  style={styles.textTitre}>Application TP3</CustomText >
      <CustomText style={styles.titleText}>Ville: Saint-Basile-Le-Grand</CustomText >
      <Image style={styles.image} resizeMode="contain" source={imageVille}></Image>
      <Link href="pages/pageCoordonnee" asChild>
      {/*Le lien pour aller à la page des coordonnées*/}
      <Pressable>
          {/*Le texte du lien avec un style différent quand on appuie dessus*/}
          {({ pressed }) => (
            <CustomText  style={[styles.lien, pressed && styles.lienPressed]}>
              Suivant
            </CustomText >
          )}
        </Pressable>
      </Link>
    </View>
  );
}


