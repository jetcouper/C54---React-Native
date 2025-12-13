import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create(

    {
        main: {
            alignItems: 'center',
            flex: 1,
            gap: 10,
            paddingTop: 10,
            backgroundColor: 'lightblue'
        },
        mainPageCoord: {
            alignItems: 'center',
            flex: 1,
            gap: 10,
            paddingTop: 20,
            backgroundColor: 'lightblue'
        },
        text: {
            fontSize: 24,
            color: 'purple'
        },
        map: {
            width: '100%',
            height: '100%',
        },
        sliderMain: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        sliderView: {
            width: 300,
            height: 100,
            backgroundColor: 'lightblue',
            borderWidth: 3,
            borderColor: 'darkblue',
            borderRadius: 15,
            marginBottom: 20,

        },
        slider: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 100
        },
        textSlider: {
            width: 70,
            textAlign: 'center',
            alignItems: 'center',
            color: 'purple'
        },
        sliderItem: {
            textAlign: 'center',
            alignItems: 'center',
            color: 'purple',
            fontSize: 24,
            tintColor: 'purple',
        },
        flat: {
            width: '100%',
        },
        titleText: {
            fontSize: 24,
        },
        textTitre: {
            fontSize: 40,
            //fontWeight: 'bold',
            color: 'purple'
        },
        lien: {
            marginTop: 30,
            paddingVertical: 12,
            paddingHorizontal: 30,
            backgroundColor: '#7d38ffff', 
            borderRadius: 8,
            fontSize: 16,
            fontWeight: '600',
            color: '#fff',
            textAlign: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        lienPressed: {
            backgroundColor: '#6f00ffff',
            shadowOpacity: 0.4,
            shadowRadius: 2,
            elevation: 2,
            transform: [{ scale: 0.98 }],
        },
        image: {
            width: 400,
            height: 350,
        },
        legendsContainer: {
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
            paddingLeft: 10
        },
        legendItem: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8
        },
        pointOrange: {
            backgroundColor: "orange",
            width: 10,
            height: 10,
            borderRadius: 10 / 2, 
        },
        pointBleu: {
            backgroundColor: "blue",
            width: 10,
            height: 10,
            borderRadius: 10 / 2, 
        },
        pointVert: {
            backgroundColor: "green",
            width: 10,
            height: 10,
            borderRadius: 10 / 2, 
        },
        textMauveSeul: {
            color: 'purple'
        },
    }
)