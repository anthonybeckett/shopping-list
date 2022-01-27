import db from '../db';

export default class ShoppingList{
    constructor(){
        this.conn = db.instance.conn;
    }

    create(name){
        this.conn.transaction(tx => {
            tx.executeSql(
                `   INSERT INTO shopping_lists (name)
                    VALUES(?)
                `,
                [name],
                (tx, result) => {return true;},
                (tx, err) => {console.log(err); return false;}
            );
        });
    }

    all(){
        return new Promise((resolve, reject) => {
            this.conn.transaction((tx) => {
                tx.executeSql(
                    `SELECT * FROM shopping_lists;`,
                    [],
                    (tx, { rows: {_array} }) => {
                        if(_array){
                            resolve(_array);
                        }else{
                            reject("Error in SQL")
                        }
                    }
                );
            });
        })
    }

    delete(id){
        this.conn.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM shopping_lists WHERE id = ?;`,
                [id]
            );
        });
    }
}