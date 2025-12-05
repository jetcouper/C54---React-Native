import Slider from '@react-native-community/slider';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { commerces } from '../../assets/libs/donnees.js';

const pageCoordonnee = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [valeurSlide, setValeurSlide] = useState(1500)
    const [filteredData, setFilteredData] = useState([]);
    const [valeurFormule, setValeurFormule] = useState(0.00)

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
                filtrerRechercheAvecLocation(1500, location);
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
        const toRad = (angle) => angle * (Math.PI / 180);
        const commercesFiltre = commerces.filter(commerce => {

            const lat1Rad = toRad(loc.coords.latitude);
            const lat2Rad = toRad(commerce.latitude);
            const lon1Rad = toRad(loc.coords.longitude);
            const lon2Rad = toRad(commerce.longitude);

            const distanceLat = lat2Rad - lat1Rad;
            const distanceLon = lon2Rad - lon1Rad;

            const a = Math.sin(distanceLat / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(distanceLon / 2) ** 2

            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            const d = 6371 * c * 1000;
            return d <= value
        });
        setFilteredData(commercesFiltre)

    }

    const renderListItem = ({ item }) => (
        <Text style={styles.titleText}>{item.nom}</Text>

    );
    const filtrerRecherche = (value) => {
        filtrerRechercheAvecLocation(value, location);
    }


    let text = 'En attente...';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = location;
    }

    return (
        <View style={styles.main}>
            <Text style={styles.text}>Position actuelle:</Text>

            {errorMsg ? (
                <Text>{errorMsg}</Text>
            ) : location ? (
                <>
                    <Text>Latitude: {location.coords.latitude}</Text>
                    <Text>Longitude: {location.coords.longitude}</Text>
                    <View style={styles.slider}>
                        <Slider
                            style={{ width: 200, height: 40 }}
                            minimumValue={0}
                            maximumValue={3000}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#000000"
                            onValueChange={(value) => filtrerRecherche(value)}
                            value={valeurSlide}
                        />
                        <Text style={styles.textSlider}>
                            {Math.round(valeurSlide)}
                        </Text>
                    </View>
                    <FlatList
                        style={styles.flat}
                        data={filteredData}
                        renderItem={renderListItem}
                        keyExtractor={(item) => item.id.toString()}
                        ItemSeparatorComponent={<View style={styles.separateur}></View>}
                    />

                </>
            ) : (
                <Text>Chargement...</Text>
            )}
        </View>
    );
}
const styles = StyleSheet.create(

    {
        main: {
            alignItems: 'center',
            flex: 1,
            gap: 10,
            paddingTop: 20,
        },
        text: {
            fontSize: 20,
            fontWeight: 'bold'
        },
        slider: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 100
            //flex: 1,
        },
        textSlider: {
            width: 70,
            textAlign: 'center'
        },
        flat: {
            width: '100%',
            //backgroundColor: '#ADD8E6',
        },
        titleText: {
            fontSize: 24,
        }
    }
)

export default pageCoordonnee;
