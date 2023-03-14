import { StyleSheet, Text, View, Image, FlatList, ScrollView, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { createTable, filterByDishName, getMenuItems, saveMenuItems } from '../database';
import { MaterialIcons } from "@expo/vector-icons";
import Avatar from '../components/Avatar';
import { useAuthState } from '../AuthProvider';
import CategoryItem from '../components/CategoryItem';
import debounce from "lodash.debounce";
import MenuItem from '../components/MenuItem';

const API_URL = `https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json`;
const categories = ["Startes", "Mains", "Desserts", "Drinks", "Specials"]

const Home = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const { auth } = useAuthState();
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const searchRef = useRef(null);

  const fetchData = async () => {
    try {
      let response = await fetch(API_URL);
      const data = await response.json();
      return data.menu;
    } catch (e) {
      console.error(e);
    }
  }
  const lookup = useCallback((q) => {
    setQuery(q);
  },[]);


  const debouncedLookup = useMemo(() => debounce(lookup,400), [lookup]);

  function handleSearchChange(text) {
    setSearch(text);
    debouncedLookup(text)
  }


  useEffect(() => {
      (async () => {
        try {
          await createTable();
          let menuItems = await getMenuItems();
          console.log("taken from sql:", menuItems);
          

          if (!menuItems.length) {
            const data = await fetchData();
            saveMenuItems(data);
            setData(data);
          } else {
            setData(menuItems);
          }
        } catch (error) {
          
        }
      })();
  },[])

  useEffect(() => {
    (async () => {
      try {
        const menuItems = await filterByDishName(query);
        console.log("from filer:", menuItems)
        setData(menuItems);
      } catch (error) {
        console.error(error);
      }
    })();
  },[query]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode={'contain'} />
        <Avatar 
          uri={auth.state?.avatar}
          onPress={() => navigation.navigate('Profile')} 
          placeholder={ auth.state.last_name ? `${auth.state.name.charAt(0)}${auth.state.last_name?.charAt(0)}` : auth.state.name.charAt(0)} 
        />
      </View>
      <View style={styles.banner}>
        <Text style={styles.headerText}>Little Lemon</Text>
        <Text style={styles.subHeaderText}>Chicago</Text>
        <View style={styles.rowSection}>
          <Text style={styles.bodyText}> 
            We are a family owned
            Mediterranean restaurant,
            focused on traditional recipes served with a 
            modern twist.
          </Text>
          <Image source={require('../assets/greek.jpeg')} resizeMode={'cover'} style={{ width: 150, height: 180, borderRadius: 16 }}/>
        </View>
        <View style={styles.inputContainer}>
          <Pressable onPress={() => searchRef.current.focus()}>
            <MaterialIcons name={'search'} size={25} />
          </Pressable>
          <TextInput ref={searchRef} value={search} style={ styles.input} onChangeText={handleSearchChange} />
        </View>
      </View>
      <Text style={styles.listHeaderText}>ORDER FOR DELIVERY!</Text>
      <View>
        <ScrollView showsHorizontalScrollIndicator={false} contentInset={{ left: 5, right: 5 }} horizontal contentContainerStyle={[styles.rowSection, { }]}>
          {categories.map((item,index) => <CategoryItem key={index} name={item} />)}
        </ScrollView>
      </View>
      <View style={styles.lineSpacer} />
      <View style={styles.listContainer}>
        <FlatList 
          data={data} 
          keyExtractor={(item,index) => index}
          renderItem={({ item }) => (<MenuItem name={item.name} description={item.description} price={item.price} image={item.image} />)}
          />
      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container : {
    flex: 1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    paddingHorizontal: 25,
  },
  rowSection: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: 'flex-end',
  },
  spacer: {
    flex: 1,
  },
  logo: {
    marginLeft: '25%',
    width: 180,
    height: 70,
  },
  listHeaderText: {
    color: 'black',
    marginTop: 25,
    marginBottom: 10,
    paddingHorizontal: 25,
    fontSize: 20,
    fontWeight: 'bold',
  },
  banner: {
    backgroundColor: "#495E57",
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  inputContainer: {
    width: '100%',
    height: 45,
    borderRadius: 15,
    backgroundColor: 'white',
    marginVertical: 15,
    alignItems: 'center',
    flexDirection: "row",
    paddingLeft: 10,
  },
  input: {
    width: '90%',
    height: 40,
    fontSize: 18,
    marginLeft: 10,
  },
  headerText: {
    color: '#F4CE14',
    fontWeight: 'bold',
    fontSize: 46,
  },
  subHeaderText: {
    fontWeight: "700",
    fontSize: 30,
    color: 'white',
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 20,
    color: 'white',
    paddingRight: 20,
    fontWeight: "700",
    width: "70%",
    letterSpacing: 1.2,
    lineHeight: 25,
  },
  lineSpacer: {
    height: 2,
    width: '100%',
    backgroundColor: 'lightgray',
    marginTop: 25,
    marginBottom: 10,
  },
  iconContainer: {
    marginTop: 15,
    marginLeft: 5,
    height: 45,
    width: 45,
    borderRadius: 25,
    backgroundColor: 'white',
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 25,
  },
})