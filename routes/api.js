/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

// var expect = require('chai').expect;
// var MongoClient = require('mongodb');

const fetch = require('node-fetch');


// our inner DB
const stocksDB = {};

async function getStock(stock) {
  const fetchResponse = await fetch(`https://repeated-alpaca.glitch.me/v1/stock/${stock}/quote`);
  const { symbol, latestPrice } = await fetchResponse.json();
  
  return {
    symbol,
    price: `${latestPrice}`
  };
}

async function addToStocksDB(stock, like) {
  const returnedStock = await getStock(stock);
  const { symbol, price } = returnedStock;

  if(symbol) {
    if(stocksDB.hasOwnProperty(symbol)) {
      stocksDB[symbol] = {
        price,
        like: like ? stocksDB[symbol].like + 1 : stocksDB[symbol].like
      }
    } else {
      stocksDB[symbol] = {
        price,
        like: like ? 1 : 0
      }
    }
  }
}

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async function (req, res){
      const { stock, like } = req.query;
    
      const stockKeys = [];
  
      if(stock) {
        if(typeof stock === 'string') {
          await addToStocksDB(stock, like);
          
          stockKeys.push(stock.toUpperCase());
        } else {
          // is an array
          for(let i=0; i<stock.length; i++) {
            await addToStocksDB(stock[i], like);
            
            stockKeys.push(stock[i].toUpperCase());
          }
        }
      }
    
      const result = (stockKeys.length === 1) ? 
            {...stocksDB[stockKeys[0]], stock: stockKeys[0] }
      : Object.keys(stocksDB)
        .filter(key => stockKeys.includes(key))
        .map(key => ({
          stock: key,
          ...stocksDB[key]
        }));
    
    
      res.json({
        stockData: result
      });
    });
};

// {"stockData":{"stock":"GOOG","price":"786.90","likes":1}}
// {"stockData":[{"stock":"MSFT","price":"62.30","rel_likes":-1},{"stock":"GOOG","price":"786.90","rel_likes":1}]}