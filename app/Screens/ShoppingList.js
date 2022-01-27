import React, { useState, useLayoutEffect, useEffect } from 'react'
import { StyleSheet, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import DraggableFlatList from 'react-native-draggable-flatlist';

import ShoppingItem from '../DB/Models/ShoppingItem'

const shoppingItem = new ShoppingItem();

const ShoppingList = ({ route, navigation }) => {
    const [ shoppingItems, setShoppingItems ] = useState([]);
    
    const { id } = route.params;

    const updateShoppingList = (id) => {
        let newList = shoppingItems.map(item => {
            if(item.id == id){
                shoppingItem.setComplete(item.id, !item.complete);

                return {...item, complete: !item.complete ? 1 : 0}
            }
            return item;
        });

        //Sort list based on complete status
        newList.sort((a, b) => a.complete < b.complete);

        //Update order numbers
        let ordered = newList.map((item, index) => {
            return {...item, order_items: index}
        });

        ordered.sort((a, b) => a.order_by > b.order_by);

        setShoppingItems(ordered);

        //Update DB here
        ordered.forEach(item => {
            shoppingItem.updateItemOrder(item);
        });
    }

    const getShoppingItems = async () => {
        let result = await shoppingItem.getItems(id);
        
        if(result){
            setShoppingItems(result);
        }
    }

    const updateShoppingItems = (items) => {
        let ordered = items.map((item, index) => {
            return {...item, order_items: index}
        });

        ordered.forEach(item => {
            shoppingItem.updateItemOrder(item);
        });

        setShoppingItems(items);
    }

    const deleteItem = (id) => {
        let remaining = shoppingItems.filter(item => {
            return item.id !== id
        });
        
        setShoppingItems(remaining);
        
        shoppingItem.delete(id);
    }

    useLayoutEffect(() => {
        getShoppingItems();
    }, []);

    useEffect(() => {
        navigation.addListener('focus', () => {
            getShoppingItems();
        })
    }, [navigation]);

    const renderItem = ({ item, index, drag, isActive }) => (
        <Swipeable 
            key={item.id} 
            onPress={() => navigation.navigate('ShoppingList', {id: item.id})} 
            renderRightActions={() => (
                <TouchableOpacity style={{backgroundColor: 'red', width: 70, alignItems: 'center', justifyContent: 'center'}} onPress={() => deleteItem(item.id)}>
                    <Text style={{color: 'white'}}>Delete</Text>
                </TouchableOpacity>
            )}
        >
            <ListItem
                key={item.id}
                bottomDivider={true}
                onPress={() => updateShoppingList(item.id)}
            >
                <ListItem.Content style={styles.listItemContainer}>
                    <TouchableOpacity onLongPress={drag} delayLongPress={10}>
                        <Icon name="sort" style={styles.sortIcon} />
                    </TouchableOpacity>
                    <ListItem.Title style={item.complete ? styles.strikeThrough : styles.normal}>{item.name}</ListItem.Title> 
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        </Swipeable>  
    );

    return (
        <View style={styles.flatListContainer}>
            <DraggableFlatList
                data={shoppingItems}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                onDragEnd={({ data }) => updateShoppingItems(data)}
            />
        </View>
    )
}

export default ShoppingList

const styles = StyleSheet.create({
    deleteButton: { 
        minHeight: '100%', 
        backgroundColor: 'red'
    },
    normal: {},
    strikeThrough: {
        textDecorationLine: 'line-through', 
        textDecorationStyle: 'solid'
    },
    listItemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    sortIcon: {
        marginRight: 20
    },
    flatListContainer: {
        flex: 1,
        flexDirection: 'row'
    }
})
