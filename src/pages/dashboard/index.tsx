import React, { useContext } from 'react'
import {View, Button, StyleSheet, Text} from 'react-native'
import AuthContext from '../../contexts/auth'

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
})

const Dashboard: React.FC = () => {
    const { user, signOut } = useContext(AuthContext);

    function handleSignOut(){
        signOut();
    }

    return(
        <View style={styles.container}>
            <Text>{user?.name}</Text>
            <Button title="Log out" onPress={handleSignOut}></Button>
        </View>
    )
    
}


export default Dashboard;