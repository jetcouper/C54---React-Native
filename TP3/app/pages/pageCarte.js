import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';


const pageCarte = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

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
                //filtrerRechercheAvecLocation(1500, location);
            } catch (e) {
                console.log("ERREUR DE GPS:", e);
            }
        }

        getCurrentLocation();
    }, []);

    
    if (errorMsg) {
        return (
            <View style={styles.main}>
                <Text>{errorMsg}</Text>
            </View>
        );
    }

    if (!location) {
        return (
            <View style={styles.main}>
                <Text>Chargement de la localisation...</Text>
            </View>
        );
    }




    return (
        <View style={styles.main}>
            <MapView
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: location.latitudeDelta,
                    longitudeDelta: location.longitudeDelta,
                }}
                style={styles.map}
            />
        </View>
    )


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
        map: {
            width: '100%',
            height: '100%',
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

export default pageCarte;