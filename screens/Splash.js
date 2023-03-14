import { StyleSheet, Image, View } from 'react-native'
import React from 'react'

const Splash = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} resizeMode={'contain'} style={styles.logo}/>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
    },
    logo: {
        width: 500,
        height:100,
    }
})