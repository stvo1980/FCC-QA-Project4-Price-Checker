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
    stockOne = {...stockOne, likes:0}
    var stockTwo = await getStock(stock[0]);
    stockTwo = {...stockTwo,likes:0}
    var stockThree = await getStock(stock[1])
    stockThree = {...stockThree,likes:0}
   
    
 // console.log("likeTwo", like)
 //   console.log(typeof stock)
  if(typeof stock === "string") {
//    res.json({symbol:stockData.symbol, price:stockData.latestPrice})
    if(like){
      stockOne = {...stockOne, likes:1}
    
    console.log("cond stock", stockOne.likes)
   
       } else {
         stockOne = {...stockOne, likes:0}}
    
//    console.log("cond stockOne", stockOne)
res.send({stockData:stockOne})

 let dbFilter = db.map(item => item.stock);

if(dbFilter.indexOf(stockOne.stock)==-1){
  db.push(stockOne)
}
     for (var i in db) {
     if (db[i].stock == stockOne.stock) {
        db[i].likes = stockOne.likes;
        break; //Stop this loop, we found it!
     } 
   }
  
   // console.log("db", db)
//    res.send(stockDB)
    
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
 console.log("stockTwo",stockTwo)
    console.log("db", db) 
    
if(!like)
  {  stockTwo = {...stockTwo, rel_likes:stockTwo.likes}
    stockThree = {...stockThree,rel_likes:stockThree.likes }}
    else {
   stockTwo = {...stockTwo, rel_likes:1}
    stockThree = {...stockThree,rel_likes:1}   
      
    }
    
    
    console.log("stockTwoTest", stockTwo)
    let output=[]
    console.log("likeTwo", like)
    var combineArr = output.concat(stockTwo,stockThree);
    var mapCombineArr = combineArr.map(item=>{return{
  stock:item.stock,
  price:item.price,
  rel_likes:item.rel_likes
}})
    
    console.log("combineArr",combineArr)
    stockDB= {stockData:mapCombineArr};
     
     
     console.log("stockDB",stockDB)
    res.send(stockDB)
 

  }
 
   
//    res.json({symbol:stockData.symbol, price:stockData.latestPrice})
   
    
  
  
  });
    
};
