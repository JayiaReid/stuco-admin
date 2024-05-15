export default {
    schema: "./utils/schema.js",
    driver: 'mysql2',
    dialect: 'mysql',
    dbCredentials: {
        host: "127.0.0.1",
        user: "root",
        database: "stuco-admin",
        password:'mochalatte',
        port: '3306'
    }
  };

  // export const db2 = {
  //   schema: "./utils/schema2.js",
  //   driver: 'mysql2',
  //   dialect: 'mysql',
  //   dbCredentials: {
  //       host: "127.0.0.1",
  //       user: "root",
  //       database: "stuco",
  //       password:'mochalatte',
  //       port: '3306'
  //   }
  // };