import { Image, Dimensions, StyleSheet, Text, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { useState } from "react";
import { useBackHandler } from '@react-native-community/hooks'



const height = Math.round(Dimensions.get('window').height);
const width = Math.round(Dimensions.get('window').width);

export default function QrPage({ route, navigation }) {

    const [userAsync, setUserAsync] = useState();

    console.log("Navigasyon parametreleri bastırılıyor-QR:", userAsync);



    if (!userAsync) {
        setUserAsync(route.params);
    }



    return (
        <View style={styles.container}>
            <View style={[styles.containerLoading]}>

                <Text style={styles.TexterLoading}>QR KODUN</Text>
                <View style={styles.shadower}>

                    <Shadow>
                        <Image source={{ uri: "http://190.92.179.153:5000/qrimage/" + userAsync }} style={styles.ImagerLoading} />

                    </Shadow>
                </View>
                <Text style={styles.TexterLoading}>{userAsync}</Text>


            </View>
        </View>

    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10,
        backgroundColor: '#fff',

    },



    TexterLoading: {
        alignItems: "center",
        fontSize: 46,
        fontWeight: '100',
        textAlign: "center"
    },
    ImagerLoading: {
        alignItems: "center",
        width: 200,
        height: 200,

    },
    shadower: {
        alignItems: "center",
        marginVertical: 40,
    }, TexterLoadingInternet: {
        alignItems: "center",
        fontSize: 12,
        fontWeight: '100',
        textAlign: "center"
    },




});
