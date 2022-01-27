import * as SQLite from 'expo-sqlite'
import { Alert } from 'react-native';

export default class db{
    //Singleton class define
    static instance = db.instance || new db();
    
    constructor(){
        //init DB
        try{
            this.conn = SQLite.openDatabase("shoppingList.db");
        }catch(err){
            Alert.alert(err);
        }
    }
}