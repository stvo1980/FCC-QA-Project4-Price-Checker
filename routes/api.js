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

const stockDB = {};

async function getStock(stock){
  var fetchResponceFunc = await fetch("https://repeated-alpaca.glitch.me/v1/stock/"+stock+"/quote")    
  var {symbol, latestPrice} = await fetchResponceFunc.json(); 
//  stockDataFunc = stockDataFunc.map(item=>{return{
 //   symbol:item.symbol,
 //   price:item.latestPrice
//  }})
  return {symbol, price:latestPrice };
  
}


module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async function (req, res){
      const {stock, like} = req.query;
//    const fetchResponce = await fetch("https://repeated-alpaca.glitch.me/v1/stock/"+stock+"/quote")    
  var stockFirst = await getStock(stock);
    
    
    
    console.log("stockFirst getStock",stockFirst);
    
  //  const {symbol , latestPrice, open,close} = await fetchResponce.json(); 
//    var stockData = await fetchResponce.json(); 

 //  stockDB= {...stockData};
 //   console.log("DB", stockDB);
    
//  const googStock = await getStock('goog')
 //   console.log(typeof stock)
//  if(typeof stock === "string") {
//    res.json({symbol:stockData.symbol, price:stockData.latestPrice})
//    console.log("cond stock", stock)
//  } else 
 //   console.log("stock cond 2", stock[0])
 //   console.log("stock cond 2", stock[0])
//    console.log("fetchResponce",stockData)
   
//    res.json({symbol:stockData.symbol, price:stockData.latestPrice})
   
  
  
  
  
  
  });
    
};
