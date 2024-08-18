const Pool = require('pg').Pool;
require('dotenv').config()

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "todoapp",
    password: "Tuan04071972=",
    port: 5432
});

module.exports = pool;