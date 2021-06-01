const { createConnection } = require("mysql");
require("dotenv").config();
const db = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
  multipleStatements: true,
});
db.connect((error) => {
  if (!error) console.log("DB connection succeded.");
  else
    console.log(
      "DB connection failed \n Error : " + JSON.stringify(error, undefined, 2)
    );
});
module.exports = db;
