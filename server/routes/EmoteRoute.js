var synchronize = require('../src/synchronize');
var thunkify = require('../src/thunkConverter').thunkify;
var dataRetriever = require('../src/DataRetriever');


var Router = require('express').Router();

var verb = 'nothing';
var message = 'sent a response action, default is nothing'

Router.options('*', function(req, res, next){
    console.log('received request')
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})


Router.get('/', function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    var temp = verb;
    verb = 'nothing';
    res.send({verb: temp})
})

Router.post('/', function(req, res, next){
    console.log('received request')
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (typeof(req.body.message === 'string')){
        verb = req.body.message;
    }
    res.send({message: message});
})





module.exports = Router;