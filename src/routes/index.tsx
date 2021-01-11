import React, { useContext } from 'react';

import AuthContext from '../contexts/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import { ActivityIndicator, View } from 'react-native';

const Routes: React.FC = () => {
    
    const { signed, loading } = useContext(AuthContext);

    // await new Promise(resolve => setTimeout(resolve, 2000))

    if(loading){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#666"/>
            </View>
        );
    }
    
    return signed ? <AppRoutes/> : <AuthRoutes/>;
};

export default Routes;