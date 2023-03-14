import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const Home = ({ navigation, route }) => {
    useEffect(() => {
        navigation.navigate("Profile");
    },[])
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})