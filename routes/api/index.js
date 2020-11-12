const express = require("express");
const router = express.Router();
const { Pool, Client } = require('pg')

const pool = new Pool()

router.get("/zipcode", (req, res, next) => {
  const { query } = req

  pool.query(`SELECT * FROM zipcodes WHERE zip = ${query.zip};`, (err, data) => {
    if(err){
      console.log(err)
    } else {
      res.json(data.rows)
    }
  })
})

module.exports = router;
