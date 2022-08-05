import { Alert, Linking, BackHandler, ActivityIndicator, Dimensions, TouchableOpacity, DevSettings, Button, Image, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import base64 from 'react-native-base64'
import { useBackHandler } from '@react-native-community/hooks'

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);



export default function HomePage({ route, navigation }) {
    const [userAsync, setUserAsync] = useState(null);
    const [loadingData, setLoadingData] = useState(true);
    const [username, setUsername] = useState();
    const isVisible = useIsFocused();
    const [shouldBeHandledHere, setShouldBeHandleHere] = useState(true);
    const killAccount = async () => {
        Alert.alert(
            "Çıkış",
            "Uygulamadan çıkış yapmak istediğinizden emin misiniz?",
            [
                {
                    text: "Evet",
                    onPress: () => {
                        AsyncStorage.removeItem('essential'),
                            navigation.goBack()
                    },
                },

                { text: "Hayır", onPress: () => console.log("Hayır basıldı") }
            ]
        );

    }
    const exitAccount = async () => {
        await killAccount();
    }
    const createThreeButtonAlert = () => {
        Alert.alert(
            "Kapat",
            "Uygulamayı kapatmak istediğinizden emin misiniz?",
            [
                {
                    text: "Evet",
                    onPress: () => BackHandler.exitApp(),
                },

                { text: "Hayır", onPress: () => console.log("Hayır basıldı") }
            ]
        );

    }
    useBackHandler(() => {
        if (shouldBeHandledHere) {
            createThreeButtonAlert();
            return true
        }
        // let the default thing happen
        return false
    })


    // This is the part of reading data from server by essential id.
    const readData = async () => {
        try {
            const value = await AsyncStorage.getItem('essential');
            console.log(value);

            if (value !== null) {
                getUserInfosAsync(value);
            }
        } catch (e) {
            alert('Failed to fetch the input from storage');
        }
    };

    // This basically navigating to the screen for updating info. 
    // fixme basically this part needs to be based on essential.
    function navigateToUpdate() {

        navigation.navigate("Update");
    }

    // This basically navigating to the screen for updating info. and this is getting for 
    const getUserInfosAsync = async (dataFound) => {
        try {
            console.log("This is essential:", dataFound);
            const response = await fetch(
                'http://190.92.179.153:8080/api/user/get-user-by-essential/' + dataFound, {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + base64.encode('basic_user:ankara')

                }
            }
            );
            const json = await response.json();
            setUserAsync(json);
            setUsername(json.username);

            setLoadingData(false);
            console.log("This is json in home----------------:", json);
        } catch (error) {
            console.error(error);
        }
    };

    // When screen onloads.
    useEffect(() => {
        if (isVisible) {
            console.log("called when screen open or when back on screen ");
            readData();
        } else {
            console.log("This is ankaragücü");
            readData();

        }



    }, [isVisible]);

    if (loadingData === true) {
        console.log("Loading is true !!");
        return (
            <View style={styles.container}>
                <Text style={styles.TexterLoading}>...Loading...</Text>
                <ActivityIndicator size="large" color="#17ab00" />

                <Text style={styles.TexterLoadingInternet}>If this screen freezes your internet is so slow try to solve</Text>

            </View>

        );

    } else {


        return (
            <View style={styles.container}>
                <View style={[styles.InnerFlex]}>

                    <View style={[styles.containerLoading2]}>

                        <Text style={styles.TexterLoading}>ECOCARD</Text>

                        <Image style={styles.ImagerLoading} source={require('../statics/leaf.png')} />
                    </View>

                    <View>
                        <TouchableOpacity
                            style={styles.Input} onPress={() => {
                                navigation.navigate("QR", userAsync.username);
                            }}
                        >
                            <Text style={{ color: "white" }}>QR GÖRÜNTÜLE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.Input}
                            onPress={() => {
                                navigateToUpdate();
                            }}
                        >
                            <Text style={{ color: "white" }}>BİLGİLERİNİ DEGİSTİR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.Input}
                            onPress={() => {
                                navigation.navigate("ImageUpload");
                            }}
                        >
                            <Text style={{ color: "white" }}>FOTOGRAF YÜKLE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Linking.openURL("http://190.92.179.153:5000/get-user/" + username)}
                            style={styles.Input}
                        >
                            <Text style={{ color: "white" }}>KARTVİZİT GÖRÜNTÜLE</Text>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => exitAccount()}
                            style={styles.Input}
                        >
                            <Text style={{ color: "white" }}>CIKIS YAP</Text>

                        </TouchableOpacity>
                    </View>
                    <Text style={styles.TexterLoading}>{username}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10,
        backgroundColor: '#fff',

    },
    Input: {

        borderWidth: 0.3,
        width: width / 1.2,
        textAlign: "center",
        alignItems: "center",
        padding: 10,
        margin: 10,
        borderRadius: 10,
        backgroundColor: "black",


    },
    Texter: {

        fontSize: 46,
        fontWeight: '100',
    },
    Imager: {
        width: 50,
        height: 50,
    },

    TexterLoading: {
        alignItems: "center",
        fontSize: 46,
        fontWeight: '100',
        textAlign: "center"
    },
    TexterLoadingInternet: {
        alignItems: "center",
        fontSize: 12,
        fontWeight: '100',
        textAlign: "center"
    },
    ImagerLoading: {
        alignItems: "center",
        marginHorizontal: width / 2.5,
        width: 50,
        height: 50,
    },
    InnerFlex: {

        alignItems: "center",
        paddingTop: height / 10

    },




});