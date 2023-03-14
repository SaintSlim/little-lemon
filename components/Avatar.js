import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'

const Avatar = ({ containerStyle, uri, placeholder, avatarStyle,onPress }) => {
  return (
    <Pressable onPress={onPress}>
        <View style={[styles.container,containerStyle]}>
            {uri == null ? 
                <Text style={styles.text}>{placeholder}</Text> : 
                <Image source={{uri: uri}} style={[styles.avatar, avatarStyle]} resizeMode={'contain'} /> 
            }
        </View>
    </Pressable>
  )
}

export default Avatar;

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: 'teal',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25
    },
})