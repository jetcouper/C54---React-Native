import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function pageCoordonnee() {
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
            } catch (e) {
                console.log("ERREUR DE GPS:", e);
            }
        }

        getCurrentLocation();
    }, []);

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
            justifyContent: 'center',
            flex: 1,
            gap: 10,
        },
        text: {
            fontSize: 20,
            fontWeight: 'bold'
        },
    }
)
