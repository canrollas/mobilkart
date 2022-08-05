import { Platform, TouchableHighlight, TextInput, Image, Dimensions, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from "./pages/HomePage";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import ImageUpload from './pages/ImageUpload';
import QrPage from './pages/QrPage';
import ChangeInfo from './pages/ChangeInfo';
import Updater from './pages/Updater';
import base64 from 'react-native-base64'
import AsyncStorage from '@react-native-async-storage/async-storage';


const width = Math.round(Dimensions.get('window').width);


const height = Math.round(Dimensions.get('window').height);


function Splash({ navigation }) {
  var isShowingText = true;
  const [isLoading, setIsLoading] = useState(true);
  const isVisible = useIsFocused();


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem('essential');
      console.log("App consol degeri", value);

      if (value !== null) {
        navigation.navigate("MainPage");
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  };
  const saveUser = async (userResponse) => {
    try {
      await AsyncStorage.setItem(
        'essential',
        userResponse
      );
      console.log("User kayededildi");
    } catch (error) {
      console.log("This is the error:", error);
    }
  };
  useEffect(() => {
    if (isVisible) {
      readData();

    } else {
      readData();

    }

  });
  if (isLoading === true) {
    return (
      <View style={[styles.container]}>
        <View style={[styles.InnerFlex]}>
          <View style={[styles.containerLoading2]}>

            <Text style={styles.TexterLoading}>ECOCARD</Text>

            <Image style={styles.ImagerLoading} source={require('./statics/leaf.png')} />
          </View>
        </View>
      </View>
    );
  }
  else {
    return (
      <View style={[styles.container]}>

        <View style={[styles.InnerFlex]}>
          <View style={[styles.containerLoading2]}>

            <Text style={styles.TexterLoading}>ECOCARD</Text>

            <Image style={styles.ImagerLoading} source={require('./statics/leaf.png')} />
          </View>
          <TextInput style={styles.Input} placeholder="Kullanıcı adı" autoCapitalize='none'
            onChangeText={username => setUsername(username, username.trim())}
          />

          <TextInput style={styles.Input} placeholder="Şifre" secureTextEntry={isShowingText} onChangeText={password => setPassword(password, password.trim())}
          />
          <TouchableHighlight underlayColor={"white"} style={styles.TouchableHighlight} onPress={() => {
            if (username != '' && password != '') {
              fetch(
                'http://190.92.179.153:8080/api/user/login/' + username + "/" + password, {
                method: "GET",
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Basic ' + base64.encode('basic_user:ankara')

                }
              }
              ).then((response) => response.text())
                .then((responseText) => {
                  //return JSON.parse(responseText);
                  var jsonizer = JSON.parse(responseText);
                  if (jsonizer.username == username && jsonizer.password == password) {
                    if (jsonizer.status === 0) {
                      alert("Kullanıcı mailini onaylayın!");

                    } else {
                      saveUser(jsonizer.essential);
                      console.log("This is jsonizer:", jsonizer)
                      navigation.navigate("MainPage", jsonizer);
                    }

                  } else {
                    alert("Kullanıcı bilgileri hatalı!");

                  }


                })
                .catch((error) => {
                  console.log("reset client error-------", error);
                  alert("Kullanıcı bilgileri hatalı!");
                });
            } else {
              alert("Kullanıcı adı ya da şifre boş olamaz!");
            }


          }}>
            <Text style={styles.LogoTextInner}>Giris</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.TouchableHighlight}>
            <Text style={styles.LogoTextInner}>Üye Ol</Text>
          </TouchableHighlight>



        </View>



      </View>
    );



  }




}

const Stack = createNativeStackNavigator();

function App() {



  if (Platform.OS === "ios") {
    return (
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen name="Splash" component={Splash} options={{ title: "Splash", headerShown: false }}></Stack.Screen>

          <Stack.Screen name="MainPage" component={HomePage} options={{ title: "MainPage", headerShown: false }}></Stack.Screen>
          <Stack.Screen name="QR" component={QrPage} options={() => ({
            title: "QR", headerTitle: () => <Text>QR VIEW</Text>,

          })}
          ></Stack.Screen>
          <Stack.Screen name="Update" component={ChangeInfo} options={() => ({
            title: "Update", headerTitle: () => <Text>INFO UPDATE</Text>,

          })}></Stack.Screen>
          <Stack.Screen name="InfoUpdate" component={Updater} options={() => ({
            title: "Update Info", headerTitle: () => <Text>INFO UPDATE</Text>,

          })}></Stack.Screen>
          <Stack.Screen name="ImageUpload" component={ImageUpload} options={() => ({
            title: "Update Photo", headerTitle: () => <Text>Photo UPDATE</Text>,

          })}></Stack.Screen>


        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen name="Splash" component={Splash} options={{ title: "Splash", headerShown: false }}></Stack.Screen>

          <Stack.Screen name="MainPage" component={HomePage} options={{ title: "MainPage", headerShown: false }}></Stack.Screen>
          <Stack.Screen name="QR" component={QrPage} options={() => ({
            title: "QR", headerTitle: () => <Text>QR VIEW</Text>,

          })}
          ></Stack.Screen>
          <Stack.Screen name="Update" component={ChangeInfo} options={() => ({
            title: "Update", headerTitle: () => <Text>INFO UPDATE</Text>,

          })}></Stack.Screen>
          <Stack.Screen name="InfoUpdate" component={Updater} options={() => ({
            title: "Update Info", headerTitle: () => <Text>INFO UPDATE</Text>,

          })}></Stack.Screen>
          <Stack.Screen name="ImageUpload" component={ImageUpload} options={() => ({
            title: "Update Photo", headerTitle: () => <Text>Photo UPDATE</Text>,

          })}></Stack.Screen>


        </Stack.Navigator>
      </NavigationContainer>
    );
  }


}

export default App;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: '#fff',

  },

  containerLoading2: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },

  TexterLoading: {
    alignItems: "center",
    fontSize: 46,
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
    flex: 1,

    alignItems: "center",
    paddingTop: height / 3,

  },
  mailText: {
    borderBottomWidth: 0.5,
    width: width / 2,
    borderBottomColor: '#000000',

  },

  button: {
    alignItems: "center",
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 20,
  },
  LogoText: {
    textAlign: "center",
    fontSize: 46,
    fontWeight: "100",
  },
  LogoTextInner: {
    color: "white"
  },
  Input: {

    borderWidth: 0.3,
    width: width / 1.2,
    textAlign: "center",
    alignItems: "center",
    padding: 10,
    margin: 10,
    borderRadius: 10,

  },
  TouchableHighlight: {
    borderWidth: 0.3,
    textAlign: "center",
    alignItems: "center",
    paddingHorizontal: 130,
    paddingVertical: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "black",

  }, Imager: {
    width: 50,
    height: 50,
    backgroundColor: "red",

  },
  Logo: {
    flexDirection: "row",
    paddingHorizontal: width / 3,
  },
  Zindexlogo: {
    zIndex: 2,
    marginVertical: 10,

  },






});

