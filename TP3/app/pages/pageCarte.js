import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


const PageCarte = () => {
    const params = useLocalSearchParams();
    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current && params.maLatitude && params.maLongitude && params.latitude && params.longitude) {
            const coordinates = [
                { latitude: parseFloat(params.maLatitude), longitude: parseFloat(params.maLongitude) },
                { latitude: parseFloat(params.latitude), longitude: parseFloat(params.longitude) },
            ];

            setTimeout(() => {
                mapRef.current?.fitToCoordinates(coordinates, {
                    edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                    animated: true,
                });
                console.log(mapRef.current)
            }, 100);
        }
    }, [params.maLatitude, params.maLongitude, params.latitude, params.longitude]);

    return (
        <View style={styles.main}>
            <MapView 
                ref={mapRef} 
                initialRegion={{
                    latitude: parseFloat(params.maLatitude),
                    longitude: parseFloat(params.maLongitude),
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                style={styles.map}
            >
                <Marker 
                    coordinate={{ 
                        latitude: parseFloat(params.maLatitude), 
                        longitude: parseFloat(params.maLongitude) 
                    }} 
                    title='Ma localisation actuelle'
                />
                <Marker 
                    coordinate={{ 
                        latitude: parseFloat(params.latitude), 
                        longitude: parseFloat(params.longitude) 
                    }} 
                    title={params.nom} 
                    description={params.description}
                />
            </MapView>
        </View>
    )
}


const styles = StyleSheet.create({
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
    },
    textSlider: {
        width: 70,
        textAlign: 'center'
    },
    flat: {
        width: '100%',
    },
    titleText: {
        fontSize: 24,
    }
})

export default PageCarte;