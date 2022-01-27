import db from '../db';
import React from 'react'
import { DevSettings } from 'react-native'

export default class Setup{
    constructor(){
        this.conn = db.instance.conn;
    }

    createDB(){
        this.conn.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS shopping_lists (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    name TEXT NOT NULL, 
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, 
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL);`,
                [],
                (tx, results) => {return true;},
                (tx, err) => {return false;}
            );

            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS shopping_items (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    list_id INTEGER NOT NULL,
                    name TEXT NOT NULL, 
                    complete INTEGER DEFAULT 0,
                    order_items INTEGER DEFAULT 0,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, 
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
                    FOREIGN KEY(list_id) REFERENCES shopping_lists(id)
                );`,
                [],
                (tx, results) => {return true;},
                (tx, err) => {return false;}
            );
        });

        DevSettings.reload();
    }

    firstTimeSetup(){
        this.conn.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM `shopping_lists`",
                [],
                (tx, results) => {return true; },
                (tx, err) => {this.createDB()}
            );
        });

        return true;
    }

    emptyDB(){
        console.log("Called");
        this.conn.transaction(tx => {
            tx.executeSql("DROP TABLE shopping_lists", [], (tx, results) => console.log("Success"), (tx, err) => console.log(err));
            tx.executeSql("DROP TABLE shopping_items", [], (tx, results) => console.log("Success"), (tx, err) => console.log(err));
        })
    }

    resetApp(){
        this.emptyDB();
        this.firstTimeSetup();
    }
}