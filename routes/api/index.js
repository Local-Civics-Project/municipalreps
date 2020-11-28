const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const { Pool, Client } = require('pg')

const pool = new Pool();

router.post("/zipcode",function(req,res){
  const zip = req.body.zip;
  pool.query(`SELECT * FROM zipcodes WHERE zip = ${zip};`, (err, response) => {
    if(err){
      console.log(err)
    } else {
      if(response.rows[0]){
        const {id,...data} = response.rows[0];
        res.render("municipal",{data});
      }
      res.render("municipal",{data : {}});
     }
  })
});

router.post("/getlatLang",async function(req,res){
  const {lat,lang} = req.body;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lang}&sensor=true&key=AIzaSyC_dyULX4jDIg8BBEmCT0hqtqjrXrTJilg`;
  const response = await fetch(url).then((res)=>res.json());
  const zipCode = response.results[0].address_components[6]["long_name"];

  pool.query(`SELECT * FROM zipcodes WHERE zip = ${zipCode};`, (err, response) => {
    if(err){
      console.log(err);
    } else {
      if(response.rows[0]){
        const {id,...data} = response.rows[0];
        res.render("municipal",{data});
      }
      res.render("municipal",{data : {}});
    }
  })

});

// not needed right now, but maybe in future...

// router.get("/zipcode", (req, res, next) => {

//   const { query } = req
//   // console.log(zip);
//   pool.query(`SELECT * FROM zipcodes WHERE zip = ${query.zip};`, (err, data) => {
//     if(err){
//       console.log(err)
//     } else {
//       res.json(data.rows[0]);
//     }
//   })
// })

module.exports = router;
