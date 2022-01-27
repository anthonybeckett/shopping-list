import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native-elements';

import HomeScreen from './app/Screens/HomeScreen';
import ShoppingList from './app/Screens/ShoppingList';
import AddShoppingList from './app/Screens/AddShoppingList';
import ImportTextList from './app/Screens/ImportTextList';
import Settings from './app/Screens/Settings';

import Setup from './app/DB/Models/Setup';

//Check if this is the first time setup and create DB
const setup = new Setup();
setup.firstTimeSetup();

//Init stack navigation
const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen name="Home" component={HomeScreen} options={options.home} />
				<Stack.Screen name="ShoppingList" component={ShoppingList} options={options.shoppingList} listeners={{focus: (e) => {}}}/>
				<Stack.Screen name="AddShoppingList" component={AddShoppingList} options={{ title: 'New List' }} />
				<Stack.Screen name="ImportTextList" component={ImportTextList} options={{ title: 'Import List' }} />
				<Stack.Screen name="Settings" component={Settings} options={{ title: 'Settings' }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		
	},
	addBtn: {
		backgroundColor: "#ffffff"
	},
	settingsBtn: {
		backgroundColor: "#ffffff"
	},
	btnContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	}
});

const options = {
	home: ({ navigation, route }) => ({
		title: 'Shopping List',
		headerRight: () => (
			<View style={styles.btnContainer}>
				<Button 
					onPress={() => navigation.navigate('AddShoppingList')}
					icon={{ name: 'add', color: 'grey', size: 28 }}
					buttonStyle={styles.addBtn}
				/>
				<Button 
					onPress={() => navigation.navigate('Settings')}
					icon={{ name: 'settings', color: 'grey', size: 28 }}
					buttonStyle={styles.settingsBtn}
				/>
			</View>
		) 
	}),
	shoppingList: ({ navigation, route }) => ({
		title: 'Shopping List',
		headerRight: () => (
			<View style={styles.btnContainer}>
				<Button 
					onPress={() => navigation.navigate('ImportTextList', {id: route.params.id})}
					icon={{ name: 'article', color: 'grey', size: 28 }}
					buttonStyle={styles.addBtn}
				/>
			</View>	
		) 
	})
}
