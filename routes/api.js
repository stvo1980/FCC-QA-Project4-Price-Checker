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
var db = [{stock:"test",price:0}] 
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
    stockOne = {...stockOne, likes:0}
    var stockTwo = await getStock(stock[0]);
    stockTwo = {...stockTwo}
    var stockThree = await getStock(stock[1])
    stockThree = {...stockThree}
   
    
 // console.log("like", like)
 //   console.log(typeof stock)
  if(typeof stock === "string") {
//    res.json({symbol:stockData.symbol, price:stockData.latestPrice})
    if(like){
      stockOne = {...stockOne, likes:1}
    
    console.log("cond stock", stockOne.stock)
      console.log("db stock", db[0].stock)
       } else {
         stockOne = {...stockOne, likes:0}}
    
    console.log("cond stock", stockOne.stock)
      console.log("db stock", db[0].stock)
    if(stockOne.stock!=db[0].stock){console.log("not equal")}
    else console.log('equal')
    stockDB= {stockData:stockOne.stock};
  
    
    
//      if(stockOne.stock=db[i].stock) {i++
 //      } else  db.push(stockOne);
    
    db.forEach(function (arrayItem) {
    
    var x = arrayItem.stock;
    
    if (x!=stockOne.stock){
      console.log("som");
      db.push(stockOne);
    } 
    
});
    
    
    
    
    
  //  db.push(stockOne);
    console.log("db", db)
    res.send(stockDB)
    
  } else { 
   
 //   console.log('stock2', stockTwo)
    
    for(var i = 0; i<db.length; i++){
  if(db[i].stock == stockTwo.stock){
     stockTwo = {...db[i]}
  } else if(
    db[i].stock == stockThree.stock
  ) { 
    
    stockThree = {...db[i]}
  }
}
 console.log("stockTwo.like",stockTwo)
    console.log("db", db) 
    
    var countLike = stockTwo.like - stockThree.like;
    var countLikeTwo = stockThree.like - stockTwo.like;
    console.log("countLike",countLike)
    stockTwo = {...stockTwo, rel_likes:countLike}
    stockThree = {...stockThree,rel_likes:countLikeTwo }
    
    
    
    
    var combineArr = db.concat(stockTwo,stockThree)
    stockDB= {stockData:combineArr};
     
     
  //   console.log("stockDB",stockDB)
    res.send(stockDB)}
 
   
//    res.json({symbol:stockData.symbol, price:stockData.latestPrice})
   
    
  
  
  });
    
};
