import mysql from "mysql2";

export const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

// connection.query(query, values, (err, results) => {
//   if (err) {
//     throw err;
//   }
//   console.log("results:", results);
// });
