import { 
  StyleSheet, 
  Text, 
  SafeAreaView, 
  TextInput,
  View, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native'
import React, { useState } from 'react'
import { validateEmail } from '../utils';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthState } from '../AuthProvider';

const Onboarding = ({ navigation, route }) => {
  const { auth, setAuth } = useAuthState();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    firstName: false,
    email: false
  });

  const handleChangeEmail = (text) => {
      setEmail(text);
  }

  const handlePressNext =  async () => {
    setLoading(true);
    const value = validateEmail(email);
    if (value === false) {
      setError((val) => ({ ...val, email: true}))
      setLoading(false);
    } else if (firstName.length < 1) {
      setError((val) => ({ ...val, firstName: true}))
      setLoading(false);
    } else {
      const nameVal = ['name', firstName]
      const emailVal = ['email', email]
      const authVal = ['auth', 'true']
      try {
        await AsyncStorage.multiSet([authVal,nameVal,emailVal]);
        setAuth((prevVal) => ({ ...prevVal, isLoggedIn: true, state: {
          name: firstName,
          email: email,
        } }))

      } catch (error) {
        console.error(error);
      }
      finally {
        setLoading(false);
      }
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} resizeMode={'contain'} style={styles.logo}/>
      </View>
      <Text style={styles.header}>Let us get to know you</Text>
      <View style={styles.inputSection}>
        <Text style={styles.formLabel}>First Name</Text>
        <TextInput 
          style={styles.inputContainer} 
          value={firstName}
          onChangeText={(text) => setFirstName(text)}  
        />
        {error.firstName && <Text style={styles.errorText}>First Name can't be empty</Text>}
        <Text style={styles.formLabel}>Email</Text>
        <TextInput 
          style={styles.inputContainer}
          value={email}
          onChangeText={handleChangeEmail}
          />
      </View>
      {error.email && <Text style={styles.errorText}>Enter Valid Email</Text>}
      <TouchableOpacity style={styles.buttonContainer} onPress={handlePressNext}>
        {loading ? <ActivityIndicator color={'darkgreen'} size={'small'}/> : <Text style={[styles.formLabel,{ fontWeight: "500"}]}>Next</Text> }
        
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Onboarding;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 25,
    },
    logoContainer: {
      alignSelf: "center",
    },
    logo: {
      height: 60,
      width: 300,
    },
    header: {
      fontSize: 30,
      marginVertical: 40,
      alignSelf: "center",
      textAlign: "center",
      color: "darkgreen",
    },
    inputSection: {
      marginTop: 50,
      justifyContent: "center",
      alignItems: "center",
    },
    errorText: {
      fontSize: 20,
      color: "red",
      marginVertical: 5,
      textAlign: "center",
    },
    formLabel: {
      fontSize: 22,
      color: "darkgreen",
      marginVertical: 10,
    },
    inputContainer: {
      width: "90%",
      height: 50,
      borderRadius: 10,
      borderWidth: 2,
      fontSize: 22,
      borderColor: "darkgreen"
    },
    buttonContainer: {
      alignSelf: "flex-end",
      marginTop: 50,
      backgroundColor: "lightgray",
      justifyContent: "center",
      alignItems: "center",
      width: 120,
      height: 50,
      borderRadius: 10,
    }
})