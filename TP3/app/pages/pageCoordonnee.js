import Slider from '@react-native-community/slider';
import * as Location from 'expo-location';
import { router } from "expo-router";
import { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { commerces } from '../../assets/libs/donnees.js';
import { styles } from '../../assets/libs/styles';
import CustomText from "../../components/CustomText";

const pageCoordonnee = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [valeurSlide, setValeurSlide] = useState(0)
    const [filteredData, setFilteredData] = useState([]);

    //Fonction pour obtenir la position actuelle de mon téléphone au chargement du composant
    useEffect(() => {
        async function getCurrentLocation() {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('La permission est refusée.');
                return;
            }

            try {
                let location = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High
                });
                setLocation(location)
                filtrerRechercheAvecLocation(0, location);
            } catch (e) {
                console.log("ERREUR DE GPS:", e);
            }
        }

        getCurrentLocation();
    }, []);

    const filtrerRechercheAvecLocation = (value, loc) => {

        setValeurSlide(value)

        if (!commerces || commerces.length === 0 || !loc) {
            return;
        }
        // Fonction pour convertir les degrés en radians
        const toRad = (angle) => angle * (Math.PI / 180);
        // Filtrer les commerces en fonction de la distance
        const commercesFiltre = commerces.filter(commerce => {
            // Debut du calcul de la fonction haversine
            const lat1Rad = toRad(loc.coords.latitude);
            const lat2Rad = toRad(commerce.latitude);
            const lon1Rad = toRad(loc.coords.longitude);
            const lon2Rad = toRad(commerce.longitude);

            const distanceLat = lat2Rad - lat1Rad;
            const distanceLon = lon2Rad - lon1Rad;

            const a = Math.sin(distanceLat / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(distanceLon / 2) ** 2

            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            const d = 6371 * c * 1000;
            // Ajout de la distance calculée à l'objet commerce
            commerce.distance = d
            // Ne retourne que les commerces dans le rayon spécifié
            return d <= value
        });
        setFilteredData(commercesFiltre)

    }

    // Fonction pour naviguer vers la page de la carte avec les paramètres nécessaires
    const pageCarte = (item) => {
        router.push({
            pathname: 'pages/pageCarte', params: {
                id: String(item.id),
                //Tous les autres commerces sauf celui sélectionné
                autreCommerces: JSON.stringify(filteredData.filter(com => com.id !== item.id)),
                //Le rayon sélectionné
                rayon: String(valeurSlide),
                //Nom et description du commerce sélectionné
                nom: item.nom,
                description: item.description,
                //Coordonnées du commerce sélectionné
                latitude: String(item.latitude),
                longitude: String(item.longitude),
                //Ma position
                maLatitude: String(location.coords.latitude),
                maLongitude: String(location.coords.longitude)
            }
        })
    }

    // Rendu d'un élément de la liste des commerces, avec un TouchableOpacity pour naviguer vers la page de la carte
    const renderListItem = ({ item }) => (
        <View style={styles.sliderMain}>
            <TouchableOpacity style={styles.sliderView} onPress={() => pageCarte(item)}>
                <CustomText style={styles.sliderItem}>{item.nom}</CustomText>
                <CustomText style={styles.sliderItem}>{`${Math.round(item.distance)} mètres`}</CustomText>
            </TouchableOpacity>
        </View>


    );
    const filtrerRecherche = (value) => {
        filtrerRechercheAvecLocation(value, location);
    }

    // Message d'attente ou d'erreur
    let text = 'En attente...';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = location;
    }

    return (
        <View style={styles.mainPageCoord}>
            <CustomText style={styles.text}>Position actuelle:</CustomText>
            {/* S'il y a un message d'erreur, on l'affiche, sinon on affiche la position actuelle
                ou s'il n'y a pas encore de position, on affiche "Chargement..." */}
            {errorMsg ? (
                <CustomText style={styles.textSlider}>{errorMsg}</CustomText>

            ) : location ? (
                <>
                    <CustomText style={styles.textSlider}>Latitude: {location.coords.latitude}</CustomText>
                    <CustomText style={styles.textSlider}>Longitude: {location.coords.longitude}</CustomText>
                    <View style={styles.slider}>
                        {/* Le slider pour choisir le rayon de recherche de 0 à 3000 mètres */}
                        <Slider
                            style={{ width: 200, height: 40 }}
                            minimumValue={0}
                            maximumValue={3000}
                            minimumTrackTintColor="#007AFF"
                            maximumTrackTintColor="#1800F2"
                            thumbTintColor='purple'
                            onValueChange={(value) => filtrerRecherche(value)}
                            value={valeurSlide}
                        />
                        <CustomText style={styles.textSlider}>
                            {`${Math.round(valeurSlide)} mètres`}
                        </CustomText>
                    </View>
                    {/* La flatlist des commerces filtrés en fonction du slider et de la position actuelle */}
                    <FlatList
                        style={styles.flat}
                        data={filteredData}
                        renderItem={renderListItem}
                        keyExtractor={(item) => item.id.toString()}
                        ItemSeparatorComponent={<View style={styles.separateur}></View>}
                    />
                </>
            ) : (
                <CustomText>Chargement...</CustomText>
            )}
        </View>
    );
}


export default pageCoordonnee;
