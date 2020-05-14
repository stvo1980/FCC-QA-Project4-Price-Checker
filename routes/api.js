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



var stockDB = {};
var arr = [] 
async function getStock(stock){
  var fetchResponceFunc = await fetch("https://repeated-alpaca.glitch.me/v1/stock/"+stock+"/quote")    
  var {symbol, latestPrice} = await fetchResponceFunc.json(); 

  return {stock:symbol, price:latestPrice };
  
}


module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async function (req, res){
      const {stock, like} = req.query;
//    const fetchResponce = await fetch("https://repeated-alpaca.glitch.me/v1/stock/"+stock+"/quote")    
  
  var stockOne = await getStock(stock);
    
    var stockTwo = await getStock(stock[0]);
    stockTwo = {...stockTwo, like:0}
    var stockThree = await getStock(stock[1])
    stockThree = {...stockThree, like:0}
    var combineArr = arr.concat(stockTwo,stockThree)
    
  console.log("like", like)
 //   console.log(typeof stock)
  if(typeof stock === "string") {
//    res.json({symbol:stockData.symbol, price:stockData.latestPrice})
    if(like){
      stockOne = {...stockOne, like:1}
    
    console.log("cond stock", stockOne)
  } else
    {stockOne = {...stockOne, like:1}}
    stockDB= {stockData:stockOne};
    res.send(stockDB)
    
  } else { 
    stockDB= {stockData:combineArr};
     
     
     console.log("stockDB",stockDB)
    res.send(stockDB)}
 
   
//    res.json({symbol:stockData.symbol, price:stockData.latestPrice})
   
    
  
  
  });
    
};
