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

/*
async function getStock(stock){
  const fetchResponce = await fetch("https://repeated-alpaca.glitch.me/v1/stock/${stock}/quote")    
  const {symbol , latestPrice} = await fetchResponce.json(); 
  return {
    symbol,
    price:latestPrice
  }
  console.log("symbol", symbol)
} 
*/

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async function (req, res){
      const {stock, like} = req.query;
    const fetchResponce = await fetch("https://repeated-alpaca.glitch.me/v1/stock/"+stock+"/quote")    
  
    
  //  const {symbol , latestPrice, open,close} = await fetchResponce.json(); 
    const symbol = await fetchResponce.json(); 

    
//  const googStock = await getStock('goog')
//  console.log("stock", stock)
    console.log("fetchResponce",symbol)
   
  //  res.json({stock:stock, price:latestPrice, open:open, close:close})
    });
    
};
