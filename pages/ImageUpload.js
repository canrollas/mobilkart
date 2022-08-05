import { TouchableOpacity,ActivityIndicator, ScrollView, TextInput, Image, Dimensions, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as ImagePicker from 'expo-image-picker';
import base64 from 'react-native-base64'
import { useBackHandler } from '@react-native-community/hooks'


const height = Math.round(Dimensions.get('window').height);
const width = Math.round(Dimensions.get('window').width);

export default function ImageUpload({ route, navigation }) {
    const [imageAsset, setImageAsset] = useState(null);
    const [userAsync, setUserAsync] = useState();
    const [loadingData, setLoadingData] = useState(true);



    const readData = async () => {
        try {
            const value = await AsyncStorage.getItem('essential');
            console.log(value);

            if (value !== null) {
                setUserAsync(value);
            }
        } catch (e) {
            console.log('Failed to fetch the input from storage:', e);
        }
    };

    const permisionFunction = async () => {
        // here is how you can get the camera permission
        const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
        console.log(imagePermission.status);

        setGalleryPermission(imagePermission.status === 'granted');

        if (imagePermission.status !== 'granted') {
            alert('Permission for media access needed.');
        }
    };


    const pick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
            quality: 1,

        });

        console.log(result.uri);
        if (!result.cancelled) {
            setImageAsset(result);
        }
    };



    const updateUserInfo = async (newUpdaterJson) => {
        try {
            let formData = new FormData();
            console.log("This is image asset:", imageAsset);
            var photo = {
                uri: imageAsset.uri,
                type: imageAsset.type,
                name: "profile.jpg"
            };
            console.log("This is Photo Json:",photo);
            formData.append('file', photo);

            const response = await fetch(
                'http://190.92.179.153:8080/api/user/upload-profile-picture/' + userAsync, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data; boundary=--------------------------027636714112275518478009',


                    'Authorization': 'Basic ' + base64.encode('basic_user:ankara')
                },
                body: formData,
            }

            );
            const json = await response.json();
            console.log("Statu kodu bastırılıyor:", response.status);
            console.log("This is essential of the user:", userAsync);
            if (response.status === 422) {
                alert("User info not unique pls change it!");
            }
            else if (response.status === 404) {
                alert("User does not exists!");
                console.log("This is logger found");
                
                console.log("This is responser:",json);
            }
            else if (response.status === 200) {
                alert("Bilgi güncelleme basarılı!!");
            } else {
                alert("Bilinmeyen durum!!:");
                console.log("This coming response status!!:", response.status);
            }
        } catch (error) {
            console.log("This is basic error:", error);
        }

    };
    useEffect(() => {

        readData();
        setLoadingData(false);



    }, []);

    if (loadingData === true) {
        console.log("Loading is true !!");
        return (
            <View style={styles.container}>
                <Text style={styles.TexterLoading}>Yükleniyor</Text>
                <ActivityIndicator size="large" color="#17ab00" />

                <Text style={styles.TexterLoadingInternet}>Bu ekran yavaş ise lokal telefon hızınız cok düsüktür lütfen baska cihaz deneyin...</Text>

            </View>

        );
    } else {


        return (
            <View style={styles.container}>
                <View style={[styles.containerLoading]}>

                    <ScrollView style={styles.scrollView}>
                        <Text style={styles.TexterLoading}>Profil Fotografını güncelle</Text>

                        <TouchableOpacity
                            style={styles.input}
                            onPress={() => {
                                pick();
                            }}
                        >
                            <Text style={{ fontWeight: "200", color: "white" }}>Fotograf Yükle
                            </Text>

                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.input}
                            onPress={() => {
                                updateUserInfo();
                            }}
                        >
                            <Text style={{ fontWeight: "200", color: "white" }}>Fotografı Yükle
                            </Text>

                        </TouchableOpacity>



                    </ScrollView>





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



    TexterLoading: {
        alignItems: "center",
        fontSize: 23,
        fontWeight: '100',
        textAlign: "center"
    },
    ImagerLoading: {
        alignItems: "center",
        width: 200,
        height: 200,

    },
    ImagerLoading2: {
        margin: 10,
        width: 15,
        height: 15,

    },
    shadower: {
        alignItems: "center",
        marginVertical: 40,
    },
    input: {
        alignItems: "center",
        backgroundColor: "black",
        margin: 5,
        padding: 10,
        borderRadius: 10,
    },
    inputAbout: {
        height: 100,
        margin: 5,
        borderWidth: 0.3,
        padding: 10,
        borderRadius: 20,

    },
    scrollView: {
        marginHorizontal: 20,
    },
    TexterLoadingInternet: {
        alignItems: "center",
        fontSize: 12,
        fontWeight: '100',
        textAlign: "center"
    },




});
