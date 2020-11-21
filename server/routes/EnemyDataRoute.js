var synchronize = require('../src/synchronize');
var thunkify = require('../src/thunkConverter').thunkify;
var dataRetriever = require('../src/DataRetriever');

//thunked functions
var getAllEnemies = thunkify(dataRetriever.getAllEnemies);
var getCurrentEnemy = thunkify(dataRetriever.getCurrentEnemy);

var router = require('express').Router();

// router.all(function(req, res, next){
    
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     next();
// })

router.get('/all', function(req, res){
    synchronize.run(function*(){
        
        res.setHeader('Access-Control-Allow-Origin', 'http://roy-o-gannon.herokuapp.com');
        console.log('in the route /all!');
        var result = yield getAllEnemies();
        res.send(result);
    })
})

router.get('/current', function(req, res){
    synchronize.run(function*(){
        
        res.setHeader('Access-Control-Allow-Origin', 'http://roy-o-gannon.herokuapp.com');
        console.log('in the route! /current');
        var result = yield getCurrentEnemy();
        res.send(result);
    })
})

module.exports = router;