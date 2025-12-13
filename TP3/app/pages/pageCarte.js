import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import { styles } from '../../assets/libs/styles';
import CustomText from "../../components/CustomText";


const PageCarte = () => {
    const params = useLocalSearchParams();
    const rayon = parseFloat(params.rayon);
    const mapRef = useRef(null);
    const [centre, setCentre] = useState(null)
    const [autreCommerces, setAutreCommerces] = useState([])
    const [isMapReady, setIsMapReady] = useState(false)

    useEffect(() => {
        if (params.maLatitude && params.maLongitude && params.latitude && params.longitude) {
            setCentre({ latitude: parseFloat(params.maLatitude), longitude: parseFloat(params.maLongitude) })
            setAutreCommerces(JSON.parse(params.autreCommerces) || []);
        }
    }, [params.maLatitude, params.maLongitude, params.latitude, params.longitude]);

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
                <Circle
                    center={centre}
                    radius={rayon}
                    strokeWidth={2}
                    strokeColor={'#1a66ff'}
                    fillColor={'rgba(230,238,255,0.5)'}
                />
                {
                    autreCommerces.map((commerce, index) => (
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