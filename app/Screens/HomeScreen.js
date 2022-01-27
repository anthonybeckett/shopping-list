import React, { useState, useLayoutEffect } from 'react'
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, ScrollView, View } from 'react-native'
import { ListItem, Button, Icon } from 'react-native-elements'
import 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import ShoppingList from '../DB/Models/ShoppingList'

const shoppinglist = new ShoppingList();

const HomeScreen = ({navigation}) => {
    const [items, setItems] = useState([]);

    const getShoppingLists = async () => {
        let result = await shoppinglist.all();
        
        if(result){
            setItems(result);
        }
    }

    const deleteList = (id) => {
        shoppinglist.delete(id);
        getShoppingLists();
    }
    
    useLayoutEffect(() => {
        getShoppingLists();
    }, [items]);
    
    return (
        <ScrollView>
            {items.map((item, i) => (
                <Swipeable 
                    key={item.id} 
                    onPress={() => navigation.navigate('ShoppingList', {id: item.id})} 
                    renderRightActions={() => (
                        <TouchableOpacity style={{backgroundColor: 'red', width: 70, alignItems: 'center', justifyContent: 'center'}} onPress={() => deleteList(item.id)}>
                            <Text style={{color: 'white'}}>Delete</Text>
                        </TouchableOpacity>
                    )}
                >
                    <ListItem
                        key={item.id}
                        onPress={() => navigation.navigate('ShoppingList', {id: item.id})}
                    >
                        <Icon name="list" />
                        <ListItem.Content>
                            <ListItem.Title>{item.name}</ListItem.Title> 
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </Swipeable>
            ))}
        </ScrollView>
        
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    infoButton: { 
        minHeight: '100%' 
    },
    deleteButton: { 
        minHeight: '100%', 
        backgroundColor: 'red'
    }
})
