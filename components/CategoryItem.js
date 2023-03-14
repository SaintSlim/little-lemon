import { StyleSheet, Text, Pressable } from 'react-native'
import React, { useState } from 'react'

const CategoryItem = ({ name = 'category'}) => {
    const [active, setActive] = useState(false);
  return (
    <Pressable style={[styles.container, { backgroundColor: active ? "#495E57" : "lightgray" }]} onPress={() => setActive(val => !val)}>
      <Text style={[styles.name, { color: active ? 'white' : "#495E57"}]}>{name}</Text>
    </Pressable>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
    name: {
        fontSize: 18,
        fontWeight: '700',
    },
    container: {
        padding: 10,
        borderRadius: 16,
        height: 40,
        marginHorizontal: 5,
    }
})