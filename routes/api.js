/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});
const fetch = require("node-fetch");
module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async function (req, res){
      const {stock, like} = req.query;
 const fetchResponce = await fetch("https://repeated-alpaca.glitch.me/v1/stock/GOOG/quote")    
  const respData = await fetchResponce.json();  
    //  console.log(req.params);
    res.json(respData)
    });
    
};
