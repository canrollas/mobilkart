import { TouchableOpacity,TextInput,Switch, ScrollView, Dimensions, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'react-native-base64'

import { useState, useEffect } from "react";



const height = Math.round(Dimensions.get('window').height);
const width = Math.round(Dimensions.get('window').width);

export default function Updater({ route, navigation }) {


    const [updateInfos, setUpdateInfos] = useState();
    const [userAsync, setUserAsync] = useState();
    const [text, onChangeText] = useState("");
    const [text2, onChangeText2] = useState("");

    const [loadingData, setLoadingData] = useState(true);
    const [naming, setNaming] = useState("");
    const [showPassword, setShowPassword] = useState(true);

    var emptyJson;

    const toggleSwitch = () => {
        if (showPassword === true) {
            setShowPassword(false);
        } else {
            setShowPassword(true);
        }
    }

    const reOrganizeJson = async (newJsonObject, name, value) => {
        if (value == "") {
            alert("Boş field gönderilemez!");

        }

        else {
            emptyJson = newJsonObject;
            emptyJson[name] = value;
            console.log("This is empty Json:", emptyJson);
            updateUserInfo(emptyJson);
        }

    };
    const reOrganizeJsonPassword = async (newJsonObject, name, value) => {
        if (value == "") {
            alert("Boş field gönderilemez!");
        }
        if (value != text2) {
            alert("Şifreler birbiri ile aynı degil!");
        }

        else {
            emptyJson = newJsonObject;
            emptyJson[name] = value;
            console.log("This is empty Json:", emptyJson);
            updateUserInfo(emptyJson);
        }

    };

    const updateUserInfo = async (newUpdaterJson) => {
        try {
            console.log("This is found in updateUserInfo!:", newUpdaterJson);
            const response = await fetch(
                'http://190.92.179.153:8080/api/user/update-existing-user/', {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + base64.encode('basic_user:ankara')

                },
                body: JSON.stringify(newUpdaterJson)
            }

            );
            const json = await response.json();
            if (response.status == 422) {
                alert("User info not unique pls change it!");
            }
            else if (response.status == 404) {
                alert("User does not exists!");
            }
            else if (response.status == 200) {
                alert("Bilgi güncelleme basarılı!!");
                readData();
            } else {
                alert("Bilinmeyen durum!!:");
                console.log("This coming response status!!:", response.status);
            }
        } catch (error) {
            console.log("This is basic error:", error);
        }

    };
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
            setLoadingData(false);
            console.log("This is json in updaterr ++++++++++++:", json);
        } catch (error) {
            console.error(error);
        }
    };
    const readData = async () => {
        try {
            const value = await AsyncStorage.getItem('essential');

            console.log(value);

            if (value !== null) {
                getUserInfosAsync(value);
            }
        } catch (e) {
            console.log('Failed to fetch the input from storage:', e);
        }
    };




    useEffect(() => {
        readData();
        setUpdateInfos(route.params);

        console.log("Updater userasync:", userAsync);
        console.log("This is onchangeText:", text);


    }, []);



    if (loadingData === true) {
        console.log("Loading is true !!");
        return (
            <View style={styles.container}>
                <Text style={styles.TexterLoading}>Loading...</Text>
            </View>

        );

    }

    else {
        if (updateInfos[1] === "about") {
            return (
                <View style={styles.container}>
                    <View style={[styles.containerLoading]}>

                        <ScrollView style={styles.scrollView}>
                            <Text style={styles.TexterLoading}>Bilgilerini güncelle {updateInfos[0]}</Text>
                            <TextInput
                                placeholder='Hakkımda...'
                                style={styles.inputAbout}
                                onChangeText={onChangeText}
                                multiline={true}
                                numberOfLines={10}
                                maxLength={200}
                            />


                            <TouchableOpacity
                                style={styles.input}
                                onPress={() => { reOrganizeJson(userAsync, "about", text) }}
                            >
                                <Text style={{ fontWeight: "200", color: "white" }}>Hakkımda degistir.
                                </Text>
                            </TouchableOpacity>
                            <Text style={styles.TexterLoading}>şuanki hakkımda bilgisi:{userAsync.about.slice(0, 40) + "..."}</Text>



                        </ScrollView>





                    </View>
                </View>

            );

        } else if (updateInfos[1] === "username") {
            return (
                <View style={styles.container}>
                    <View style={[styles.containerLoading]}>

                        <ScrollView style={styles.scrollView}>
                            <Text style={styles.TexterLoading}>Bilgilerini güncelle {updateInfos[0]}</Text>

                            <TextInput style={styles.input2} placeholder="kullanıcı adı giriniz"
                                onChangeText={onChangeText}
                            ></TextInput>

                            <TouchableOpacity
                                style={styles.input}
                                onPress={() => { reOrganizeJson(userAsync, "username", text) }}
                            >
                                <Text style={{ fontWeight: "200", color: "white" }}>Kullanıcı adı degistir.
                                </Text>
                            </TouchableOpacity>
                            <Text style={styles.TexterLoading}>şuanki kullanıcı adı:{userAsync.username}</Text>



                        </ScrollView>





                    </View>
                </View>

            );

        }
        else if (updateInfos[1] === "occupation") {
            return (
                <View style={styles.container}>
                    <View style={[styles.containerLoading]}>

                        <ScrollView style={styles.scrollView}>
                            <Text style={styles.TexterLoading}>Bilgilerini güncelle {updateInfos[0]}</Text>

                            <TextInput style={styles.input2} placeholder="Meslek giriniz"
                                onChangeText={onChangeText}
                            ></TextInput>

                            <TouchableOpacity
                                style={styles.input}
                                onPress={() => { reOrganizeJson(userAsync, "occupation", text) }}
                            >
                                <Text style={{ fontWeight: "200", color: "white" }}>Meslek degistir.
                                </Text>
                            </TouchableOpacity>
                            <Text style={styles.TexterLoading}>şuanki meslek:{userAsync.occupation}</Text>



                        </ScrollView>





                    </View>
                </View>

            );

        }
        else if (updateInfos[1] === "facebook" || updateInfos[1] === "linkedin" || updateInfos[1] === "instagram" || updateInfos[1] === "twitter" || updateInfos[1] === "web_page") {
            return (
                <View style={styles.container}>
                    <View style={[styles.containerLoading]}>

                        <ScrollView style={styles.scrollView}>
                            <Text style={styles.TexterLoading}>Bilgilerini güncelle {updateInfos[0]}</Text>

                            <TextInput style={styles.input2} placeholder="Url giriniz"
                                onChangeText={onChangeText}
                            ></TextInput>

                            <TouchableOpacity
                                style={styles.input}
                                onPress={() => { reOrganizeJson(userAsync, updateInfos[1], text) }}
                            >
                                <Text style={{ fontWeight: "200", color: "white" }}>url degistir.
                                </Text>
                            </TouchableOpacity>
                            <Text style={styles.TexterLoading}>şuanki {updateInfos[1]} url:{userAsync[updateInfos[1]]}</Text>



                        </ScrollView>


                    </View>
                </View>

            );

        } else if (updateInfos[1] === "name") {

            return (
                <View style={styles.container}>
                    <View style={[styles.containerLoading]}>

                        <ScrollView style={styles.scrollView}>
                            <Text style={styles.TexterLoading}>Bilgilerini güncelle {updateInfos[0]}</Text>

                            <TextInput style={styles.input2} placeholder="isim giriniz."
                                onChangeText={onChangeText}
                            ></TextInput>

                            <TouchableOpacity
                                style={styles.input}
                                onPress={() => { reOrganizeJson(userAsync, updateInfos[1], text) }}
                            >
                                <Text style={{ fontWeight: "200", color: "white" }}>İsim degisitir.
                                </Text>
                            </TouchableOpacity>
                            <Text style={styles.TexterLoading}>şuanki isim :{userAsync[updateInfos[1]]}</Text>



                        </ScrollView>


                    </View>
                </View>

            );


        } else if (updateInfos[1] === "surname") {

            return (
                <View style={styles.container}>
                    <View style={[styles.containerLoading]}>

                        <ScrollView style={styles.scrollView}>
                            <Text style={styles.TexterLoading}>Bilgilerini güncelle {updateInfos[0]}</Text>

                            <TextInput style={styles.input2} placeholder="Soyad giriniz."
                                onChangeText={onChangeText}
                            ></TextInput>

                            <TouchableOpacity
                                style={styles.input}
                                onPress={() => { reOrganizeJson(userAsync, updateInfos[1], text) }}
                            >
                                <Text style={{ fontWeight: "200", color: "white" }}>Soyad degisitir.
                                </Text>
                            </TouchableOpacity>
                            <Text style={styles.TexterLoading}>şuanki soyad :{userAsync[updateInfos[1]]}</Text>



                        </ScrollView>


                    </View>
                </View>

            );

        } else if (updateInfos[1] === "password") {

            return (
                <View style={styles.container}>
                    <View style={[styles.containerLoading]}>

                        <ScrollView style={styles.scrollView}>
                            <Text style={styles.TexterLoading}>Bilgilerini güncelle {updateInfos[0]}</Text>

                            <TextInput style={styles.input2} placeholder="Şifrenizi giriniz."
                                onChangeText={onChangeText}
                                secureTextEntry={showPassword}
                            >

                            </TextInput>

                            <TextInput style={styles.input2} placeholder="Şifreyi tekrar giriniz."
                                onChangeText={onChangeText2}
                                secureTextEntry={showPassword}
                            ></TextInput>
                            <Switch
                                onValueChange={toggleSwitch}
                                value={!showPassword}

                            />
                            <Text>Şifreleri göster</Text>

                            <TouchableOpacity
                                style={styles.input}
                                onPress={() => { reOrganizeJsonPassword(userAsync, updateInfos[1], text) }}
                            >
                                <Text style={{ fontWeight: "200", color: "white" }}>Şifre degisitir.
                                </Text>
                            </TouchableOpacity>



                        </ScrollView>


                    </View>
                </View>

            );

        }



        else {
            <View style={styles.container}>
                <Text style={styles.TexterLoading}>Error debugger loading...</Text>
            </View>
        }

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
    input2: {
        alignItems: "center",
        margin: 5,
        padding: 10,
        borderWidth: 0.3,
        borderRadius: 10,
    },
    inputAbout: {
        height: 200,
        margin: 5,
        borderWidth: 0.3,
        padding: 10,
        borderRadius: 20,

    },
    scrollView: {
        marginHorizontal: 20,
    },




});
