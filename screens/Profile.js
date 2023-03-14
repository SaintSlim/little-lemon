import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ScrollView, Alert } from 'react-native'
import React, { useState, useContext } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { useAuthState } from '../AuthProvider';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';

const Profile = ({ navigation, route }) => {
    const { setAuth, auth } = useAuthState();
    const [userInfo, setUserInfo] = useState({
        name: auth.state?.name,
        lastName: "",
        email: auth.state?.email,
        number:"(217) 555-0113",
        image: null,
    });
    const handleChangeImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setUserInfo((preVal) => ({ ...preVal, image: result.assets[0].uri}));
        }
    }
    const handleLogOut = async () => {
        try {
            await AsyncStorage.clear();
            setAuth((preVal) => ({ ...preVal, isLoggedIn: false }))
        } catch (error) {
            console.error(error);
        }
    }

    const handleSaveChanges = async () => {
        const nameVal = ['name', userInfo.name];
        const lastNameVal = ['last_name', userInfo.lastName];
        const emailVal = ['email', userInfo.email];
        const phoneVal = ['phone', userInfo.number];
        const avatarVal = ['avatar', userInfo.image];
        try {
            await AsyncStorage.multiSet([nameVal,lastNameVal,emailVal, phoneVal, avatarVal]);
            alert('Settings Saved');
        } catch (error) {
            console.error(error);
        }
    }
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <MaterialIcons name={"arrow-back"} color="white" size={25}/>
            </TouchableOpacity>
            <View>
                <Image source={require("../assets/logo.png")} resizeMode={"contain"} style={styles.logo} />
            </View>
            <View>
                {userInfo.image === null ?
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{userInfo.name.charAt(0) + userInfo.lastName.charAt(0)}</Text> 
                    </View> 
                    : 
                    <Image source={{ uri: userInfo.image }} resizeMode={"contain"} style={styles.avatar}/>
                }  
            </View>
        </View>
        <ScrollView style={styles.main} contentInset={{ top: 0, bottom: 30, left: 0, right: 0}}>
            <Text style={[styles.headerText, { marginVertical: 0}]}>Personal information</Text>
            <View style={styles.sectionContainer}>
                {userInfo.image === null ?
                    <View style={[styles.textContainer, { height: 70, borderRadius: 35, width: 70 }]}>
                        <Text style={[styles.text, { fontSize: 32}]}>{userInfo.name.charAt(0) + userInfo.lastName.charAt(0)}</Text> 
                    </View> 
                    : 
                    <Image source={{ uri: userInfo.image }} resizeMode={"contain"} style={[styles.avatar, { height: 70, borderRadius: 35, width: 70}]}/>
                }
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Change</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: "white"}]}>
                    <Text style={[styles.buttonText, { color: "black"}]}>Remove</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.label}>First name</Text>
            <TextInput style={styles.inputContainer} value={userInfo.name}/>
            <Text style={styles.label}>Last name</Text>
            <TextInput style={styles.inputContainer} value={userInfo.lastName}/>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.inputContainer} value={userInfo.email}/>
            <Text style={styles.label}>Phone number</Text>
            <TextInput style={styles.inputContainer} value={userInfo.number} />
            <Text style={styles.headerText}> Email notifications</Text>
            <View style={styles.notificationContainer}>
                <MaterialIcons name={'check'} style={styles.checkContainer} color="white" size={15}/>
                <Text>Order statuses</Text>
            </View>
            <View style={styles.notificationContainer}>
                <MaterialIcons name={'check'} style={styles.checkContainer} color="white" size={15}/>
                <Text>Password changes</Text>
            </View>
            <View style={styles.notificationContainer}>
                <MaterialIcons name={'check'} style={styles.checkContainer} color="white" size={15}/>
                <Text>Special offers</Text>
            </View>
            <View style={styles.notificationContainer}>
                <MaterialIcons name={'check'} style={styles.checkContainer} color="white" size={15}/>
                <Text>Newsletter</Text>
            </View>
            <View style={styles.footer}>
                <View style={styles.changeSection}>
                    <TouchableOpacity style={[styles.altButton, { backgroundColor: 'white'}]}>
                        <Text style={[styles.label, { fontWeight: '700' }]}>Discard Changes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.altButton]}>
                        <Text style={[styles.label, { color: "white", fontWeight: '700' }]}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.logoutContainer} onPress={handleLogOut}>
                    <Text style={[styles.label, { color: 'black', fontWeight: 'bold' }]}>LogOut</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        backgroundColor: "white",
    },
    textContainer: {
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: 'teal'
    },
    text: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
    },
    checkContainer: {
        backgroundColor: "#495E57",
        width: 20,
        height: 20,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        marginRight: 15,
        borderRadius: 5,
    },
    notificationContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        marginBottom: 20,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 5
    },
    headerText: {
        fontWeight: "700",
        marginVertical: 10,
        marginBottom: 20,
        fontSize: 20
    },
    sectionContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "flex-end",
        marginBottom: 20,
    },
    buttonText: {
        color: "white",
        fontWeight: "500",
    },
    buttonContainer: {
        height: 40,
        width: 80,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#495E57",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#495E57"
    },
    altButton: {
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "#495E57",
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        width: 150,
    },
    label: {
        color: "#495E57",
        marginBottom: 2,
        fontWeight: "600",
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#495E57"
    },
    inputContainer: {
        borderWidth:1,
        borderRadius: 8,
        paddingHorizontal: 8,
        borderColor: "gray",
        width: "100%",
        height: 40,
        marginBottom: 30,
    },
    logo: {
        width: 140,
        height: 50,
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 30,
    },
    main: {
        flex: 1,
        marginVertical: 10,
        borderRadius: 15,
        borderColor: "lightgray",
        padding: 10,
        borderWidth: 1,
    },
    footer: {
        display: "flex",
        marginTop: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    changeSection: {
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: 'space-evenly'
    }, 
    logoutContainer: {
        marginTop: 30,
        width: "95%",
        borderRadius: 12,
        height: 45,
        backgroundColor: '#F4CE14',
        borderColor: 'orange',
        borderWidth: 1.5,
        justifyContent: "center",
        alignItems: "center",
    }
})