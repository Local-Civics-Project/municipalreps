require("dotenv").config()
const { Pool, Client } = require('pg')

const pool = new Pool()
pool.query("SELECT * FROM zipcodes;", (err, res) => {
  console.log(res.rows)
  pool.end()
})

