import Slider from '@react-native-community/slider';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { commerces } from '../../assets/libs/donnees';

const pageCoordonnee = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [valeurSlide, setValeurSlide] = useState(0.00)
    const [filteredData, setFilteredData] = useState(commerces);

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
            } catch (e) {
                console.log("ERREUR DE GPS:", e);
            }
        }

        getCurrentLocation();
    }, []);

    const renderListItem = ({ item }) => (
        <Text style={styles.titleText}>{item.nom}</Text>

    );
    const DATA = [
        { id: '1', nom: 'Item 1' },
        { id: '2', nom: 'Item 2' },
        { id: '3', nom: 'Item 3' },
    ];



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
                            onValueChange={(value) => setValeurSlide(value)}

                        />
                        <Text style={styles.textSlider}>
                            {Math.round(valeurSlide)}
                        </Text>
                    </View>
                    <FlatList
                        style={styles.flat}
                        data={commerces}
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
            height:100
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
