import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

import Setup from '../DB/Models/Setup';

const setup = new Setup();

const Settings = () => {
    return (
        <View style={styles.container}>
            <Button 
                title="Reset App" 
                onPress={() => setup.resetApp()}
            />
        </View>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 5
    }
})
