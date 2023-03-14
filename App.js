import React, { useState, useEffect, createContext, useContext } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Onboarding from './screens/Onboarding';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Splash from "./screens/Splash";
import { useAuthState, AuthProvider } from "./AuthProvider";

const Stack = createNativeStackNavigator();

function AppRender() {
  const { auth } = useAuthState();
  console.log(auth.loading);

  if (auth?.loading) {
     return <Splash />;
  } else {
    return (
      <Stack.Navigator>
              { auth?.isLoggedIn === false ?  
                <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false, }} /> : (
                <>
                  <Stack.Screen name="Home" component={Home} options={{ headerShown: false, }} />
                  <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false, }}  />
                </>
              )}
      </Stack.Navigator>
    )
  }
  
}


export default function App() {

  
  return (
    <AuthProvider>
      <NavigationContainer>
          <AppRender />
        </NavigationContainer>
    </AuthProvider>
        
  );
}

const styles = StyleSheet.create({
 
});
