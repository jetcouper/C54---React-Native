// La composante permettant d'aller chercher les paramètres envoyés depuis le router.push
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
// Composant de la carte et des marqueurs
import MapView, { Circle, Marker } from 'react-native-maps';
import { styles } from '../../assets/libs/styles';
// Composant personnalisé pour le texte avec le font spécifique
import CustomText from "../../components/CustomText";


const PageCarte = () => {
    // Récupération des paramètres pour la carte
    const params = useLocalSearchParams();
    // Le rayon du cercle autour de la position
    const rayon = parseFloat(params.rayon);
    // Référence pour la carte
    const mapRef = useRef(null);
    //Le centre défini pour le cercle
    const [centre, setCentre] = useState(null)
    //Les autres commerces affichers sur la carte
    const [autreCommerces, setAutreCommerces] = useState([])
    //État pour vérifier si la carte est prête
    const [isMapReady, setIsMapReady] = useState(false)

    //Quand les paramètres changent, on met à jour le centre et les autres commerces
    useEffect(() => {
        if (params.maLatitude && params.maLongitude && params.latitude && params.longitude) {
            setCentre({ latitude: parseFloat(params.maLatitude), longitude: parseFloat(params.maLongitude) })
            setAutreCommerces(JSON.parse(params.autreCommerces) || []);
        }
    }, [params.maLatitude, params.maLongitude, params.latitude, params.longitude]);

    //Quand la carte est prête, on ajuste la vue pour inclure les deux marqueurs
    useEffect(() => {
        if (isMapReady && mapRef.current && params.maLatitude && params.maLongitude && params.latitude && params.longitude) {
            const coordinates = [
                { latitude: parseFloat(params.maLatitude), longitude: parseFloat(params.maLongitude) },
                { latitude: parseFloat(params.latitude), longitude: parseFloat(params.longitude) },
            ];

            mapRef.current.fitToCoordinates(coordinates, {
                edgePadding: { top: 150, right: 100, bottom: 150, left: 100 },
                animated: true,
            });
        }
    }, [isMapReady]);

    return (
        <View style={styles.main}>
            <CustomText style={styles.text}>Carte des commerces</CustomText>
            <View style={styles.legendsContainer}>
                <CustomText style={styles.text}>Légende</CustomText>
                <View style={styles.legendItem}>
                    <View style={styles.pointOrange} />
                    <CustomText style={styles.textMauveSeul}>Ma position</CustomText>
                </View>
                <View style={styles.legendItem}>
                    <View style={styles.pointBleu} />
                    <CustomText style={styles.textMauveSeul}>Commerces dans le rayon</CustomText>
                </View>
                <View style={styles.legendItem}>
                    <View style={styles.pointVert} />
                    <CustomText style={styles.textMauveSeul}>Commerce sélectionné</CustomText>
                </View>
            </View>
            {/* La carte avec les marqueurs et le cercle */}
            <MapView
                ref={mapRef}
                initialRegion={{
                    latitude: parseFloat(params.maLatitude),
                    longitude: parseFloat(params.maLongitude),
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                style={styles.map}
                onMapReady={() => setIsMapReady(true)}
            >
                {/* Cercle représentant le rayon autour de la position */}
                <Circle
                    center={centre}
                    radius={rayon}
                    strokeWidth={2}
                    strokeColor={'#1a66ff'}
                    fillColor={'rgba(230,238,255,0.5)'}
                />
                {/* Pour chaque commerce dans le rayon, on place un marqueur bleu */}
                {autreCommerces.map((commerce, index) => (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: parseFloat(commerce.latitude),
                                longitude: parseFloat(commerce.longitude),
                            }}
                            pinColor='blue'
                            title={commerce.nom}
                            description={commerce.description}
                        />
                    ))}
                {/* Marqueur pour la position actuelle (orange) et le commerce sélectionné (vert) */}
                <Marker
                    coordinate={{
                        latitude: parseFloat(params.maLatitude),
                        longitude: parseFloat(params.maLongitude)
                    }}
                    title='Ma localisation actuelle'
                    pinColor='orange'
                />
                <Marker
                    coordinate={{
                        latitude: parseFloat(params.latitude),
                        longitude: parseFloat(params.longitude)
                    }}
                    pinColor='green'
                    title={params.nom}
                    description={params.description}
                />
            </MapView>
        </View>
    )
}
export default PageCarte;