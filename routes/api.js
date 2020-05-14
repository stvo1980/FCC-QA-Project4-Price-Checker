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
var db = [] 
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
    stockOne = {...stockOne, like:0}
    var stockTwo = await getStock(stock[0]);
    stockTwo = {...stockTwo}
    var stockThree = await getStock(stock[1])
    stockThree = {...stockThree}
   
    
  console.log("like", like)
 //   console.log(typeof stock)
  if(typeof stock === "string") {
//    res.json({symbol:stockData.symbol, price:stockData.latestPrice})
    if(like){
      stockOne = {...stockOne, likes:1}
    
  //  console.log("cond stock", stockOne)
       } else {
         stockOne = {...stockOne, likes:0}}
    stockDB= {stockData:stockOne};
    
    for(var i=0;i<db.length; i++){
      if(db[i].symbol != stockOne.symbol) {
        db.push(stockOne);}
    }
    
  //  db.push(stockOne);
    console.log("db", db)
    res.send(stockDB)
    
  } else { 
   
 //   console.log('stock2', stockTwo)
    
    for(var i = 0; i<db.length; i++){
  if(db[i].symbol == stockTwo.symbol){
     stockTwo = {...db[i],jello:0}
  } else if(
    db[i].symbol == stockThree.symbol
  ) { 
    
    stockThree = {...db[i], jello:0}
  }
}
    
    
    
    
    
    var combineArr = db.concat(stockTwo,stockThree)
    stockDB= {stockData:combineArr};
     
     
  //   console.log("stockDB",stockDB)
    res.send(stockDB)}
 
   
//    res.json({symbol:stockData.symbol, price:stockData.latestPrice})
   
    
  
  
  });
    
};
