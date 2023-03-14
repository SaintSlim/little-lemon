import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage"

const AuthContext = createContext(null);
export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({
        loading: true,
        state: null,
        isLoggedIn: false,
    });

    useEffect(() => {
        (async () => {
            try {
                let values = await AsyncStorage.multiGet(["auth", "name", "email",'avatar','last_name']);
                console.log(values);
                const data = Object.fromEntries(values);
                console.log(data);
                setAuth({
                    loading: false,
                    isLoggedIn: data.auth === "true" ? true : false,
                    state: data,
                    
                })
            } catch (error) {
                setAuth((prevVal) => ({ ...prevVal, loading: false }))
            }
            
        })();
    },[])
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthState = () => useContext(AuthContext);