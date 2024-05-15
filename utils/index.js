import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "stuco-admin",
    password:'mochalatte',
    port: '3306'
});

// const connection2 = await mysql.createConnection({
//     host: "127.0.0.1",
//     user: "root",
//     database: "stuco",
//     password:'mochalatte',
//     port: '3306'
// });

export const db = drizzle(connection);
// export const db2 = drizzle(connection2)