import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase('little_lemon');

export async function createTable() {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `create table if not exists menuitems(id integer primary key not null, name text, price text, description text, image text);`
            );
        },
        reject,
        resolve
        );
    });
}

export async function getMenuItems(){
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql(
                `select * from menuitems`, [],(_, { rows }) => {
                    resolve(rows._array);
                });
        });
    });
}

export function saveMenuItems(menuItems) {
    db.transaction((tx) => {
      for (const item of menuItems) {
        tx.executeSql(`insert into menuitems (name,price,description,image) values(?,?,?,?)`,[item.name,item.price,item.description, item.image])
      }
    });
  }

  export async function filterByDishName(query) {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql(
                `select * from menuitems where name like '%${query}%'`,[], (_, { rows }) => {
                    resolve(rows._array);
                }
            )
        })
    })
  }