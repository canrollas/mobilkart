import { TouchableOpacity, ScrollView, TextInput, Image, Dimensions, StyleSheet, Text, View } from 'react-native';





const height = Math.round(Dimensions.get('window').height);
const width = Math.round(Dimensions.get('window').width);

export default function ChangeInfo({ navigation }) {







    return (
        <View style={styles.container}>
            <View style={[styles.containerLoading]}>

                <ScrollView style={styles.scrollView}>
                    <Text style={styles.TexterLoading}>Bilgilerini güncelle</Text>

                    <TouchableOpacity
                        style={styles.input}
                        onPress={() => {
                            var namePage = "kullanıcı adı degistir";
                            var varNaming = "username";
                            var general = [namePage, varNaming]
                            navigation.navigate("InfoUpdate", general);
                        }}
                    >
                        <Text style={{ fontWeight: "200", color: "white" }}>KULLANICI ADI DEGISTIR.
                        </Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            var namePage = "hakkımda degistir";
                            var varNaming = "about";
                            var general = [namePage, varNaming]
                            navigation.navigate("InfoUpdate", general);
                        }}
                        style={styles.input}
                    >
                        <Text style={{ fontWeight: "200", color: "white" }}>HAKKIMDA DEGISTIR.
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            var namePage = "meslek degistir";
                            var varNaming = "occupation";
                            var general = [namePage, varNaming]
                            navigation.navigate("InfoUpdate", general);
                        }}
                        style={styles.input}
                    >
                        <Text style={{ fontWeight: "200", color: "white" }}>MESLEK DEGISTIR.
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            var namePage = "Facebook url degistir";
                            var varNaming = "facebook";
                            var general = [namePage, varNaming]
                            navigation.navigate("InfoUpdate", general);
                        }}
                        style={styles.input}
                    >
                        <Text style={{ fontWeight: "200", color: "white" }}>FACEBOOK URL DEGISTIR.
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            var namePage = "Instagram url degistir";
                            var varNaming = "instagram";
                            var general = [namePage, varNaming]
                            navigation.navigate("InfoUpdate", general);
                        }}
                        style={styles.input}
                    >
                        <Text style={{ fontWeight: "200", color: "white" }}>INSTAGRAM URL DEGISTIR.
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            var namePage = "Linkedin url degistir";
                            var varNaming = "linkedin";
                            var general = [namePage, varNaming]
                            navigation.navigate("InfoUpdate", general);
                        }}
                        style={styles.input}
                    >
                        <Text style={{ fontWeight: "200", color: "white" }}>LINKEDIN URL URL DEGISTIR.
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            var namePage = "Twitter url degistir";
                            var varNaming = "twitter";
                            var general = [namePage, varNaming]
                            navigation.navigate("InfoUpdate", general);
                        }}
                        style={styles.input}
                    >
                        <Text style={{ fontWeight: "200", color: "white" }}>TWITTER URL DEGISTIR.
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            var namePage = "Web sayfası url degistir";
                            var varNaming = "web_page";
                            var general = [namePage, varNaming]
                            navigation.navigate("InfoUpdate", general);
                        }}
                        style={styles.input}

                    >
                        <Text style={{ fontWeight: "200", color: "white" }}>WEB SAYFASI DEGISTIR.
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            var namePage = "İsim degistir";
                            var varNaming = "name";
                            var general = [namePage, varNaming]
                            navigation.navigate("InfoUpdate", general);
                        }}

                        style={styles.input}
                    >
                        <Text style={{ fontWeight: "200", color: "white" }}>İSİM DEGISTIR.
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            var namePage = "Soyisim degistir";
                            var varNaming = "surname";
                            var general = [namePage, varNaming]
                            navigation.navigate("InfoUpdate", general);
                        }}
                        style={styles.input}
                    >
                        <Text style={{ fontWeight: "200", color: "white" }}>SOYİSİM DEGISTIR.
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.input}
                    >
                        <Text style={{ fontWeight: "200", color: "white" }}>TELEFON DEGISTIR.
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            var namePage = "Şifre degistir";
                            var varNaming = "password";
                            var general = [namePage, varNaming]
                            navigation.navigate("InfoUpdate", general);
                        }}
                        style={styles.input}
                    >
                        <Text style={{ fontWeight: "200", color: "white" }}>ŞİFRE DEGISTIR.
                        </Text>
                    </TouchableOpacity>

                </ScrollView>





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




});
