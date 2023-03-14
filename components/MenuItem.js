import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const MenuItem = ({ name, description, price, image}) => {
    console.log(image);
    const bodyText = description.length > 75 ? description.slice(0,75) + '...' : description;
  return (
    <View style={styles.container}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.rowContainer}>
            <View style={styles.body}>
                <Text style={styles.description}>{bodyText}</Text>
                <Text style={styles.price}>${price}</Text>
            </View>
            <Image 
                source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`}}
                style={styles.image} 
                resizeMode={'cover'}
            />
        </View>
    </View>
  )
}

export default MenuItem

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        paddingBottom: 10,
        marginBottom: 15,
    },
    rowContainer: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
    },
    name: {
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 10,

    },
    body: {
        width: '75%'
    },
    description:{
        marginBottom: 10,
        fontSize: 17,
        color: "#495E57",
    },
    price:{
        marginBottom: 10,
        fontWeight: '600',
        fontSize: 18,
        color: "#495E57",
    },
    image: {
        width: 100,
        height: 100
    },
})