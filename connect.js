const mysql = require("mysql2")

const conn = mysql.createConnection({
    user : "root",
    database : "quiz",
    host : "localhost",
    password :"danareksa12",
    port :3306

})

module.exports = conn