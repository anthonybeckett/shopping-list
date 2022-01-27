import db from '../db';

export default class ShoppingList{
    constructor(){
        this.conn = db.instance.conn;
    }

    create(listid, name, order){
        this.conn.transaction(tx => {
            tx.executeSql(
                `   INSERT INTO shopping_items (list_id, name, order_items)
                    VALUES(?,?,?)
                `,
                [listid, name, order],
                (tx, result) => {return true;},
                (tx, err) => {console.log(err); return false;}
            );
        });
    }

    getItems(id){
        return new Promise((resolve, reject) => {
            this.conn.transaction((tx) => {
                tx.executeSql(
                    `SELECT * FROM shopping_items WHERE list_id = ? ORDER BY complete, order_items;`,
                    [id],
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
                `DELETE FROM shopping_items WHERE id = ?;`,
                [id]
            );
        });
    }

    setComplete(id, completeStatus){
        return new Promise((resolve, reject) => {
            this.conn.transaction(tx => {
                tx.executeSql("UPDATE shopping_items SET complete = ? WHERE id = ?",
                    [completeStatus ? 1 : 0, id],
                    (tx, data) => resolve(data),
                    (tx, err) => reject(err)
                );
            });
        })
    }

    updateItemOrder(item){
        this.conn.transaction(tx => {
            tx.executeSql("UPDATE shopping_items SET order_items = ? WHERE id = ?",
                [item.order_items, item.id],
                (tx, data) => true,
                (tx, err) => console.log(err)
            );
        });
    }
}