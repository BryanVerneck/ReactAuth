import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import * as auth from '../services/auth';
import api from '../services/api';

interface User {
    name: string;
    email:  string;  
}

interface authContextData {
    signed: boolean;
    user: User | null;
    loading: boolean;
    signIn(): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<authContextData>({} as authContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData(){
            const storageUser = await AsyncStorage.getItem('@RNAuth:user');
            const storageToken = await AsyncStorage.getItem('@RNAuth:token');
            
            if(storageToken && storageUser){
                api.defaults.headers.Authorization = `Bearer ${storageToken}`;

                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
        }
       loadStorageData()
    }, [])

    async function signIn() {
        const response = await auth.signIn();

        setUser(response.user);
        
        api.defaults.headers.Authorization = `Bearer ${response.token}`;
        
        //localStorage - reactJS
        await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user))
        await AsyncStorage.setItem('@RNAuth:token', response.token)
    }

    function signOut(){
        AsyncStorage.clear().then(() => {
            setUser(null);
        });
    }

    return (
        <AuthContext.Provider value={{signed: !!user, user, signIn, signOut, loading}}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;