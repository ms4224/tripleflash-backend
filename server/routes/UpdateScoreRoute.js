var synchronize = require('../src/synchronize');
var thunkify = require('../src/thunkConverter').thunkify;
var updater = require('../src/Updater');

//thunked functions
var UpdateStats = thunkify(updater.UpdateStats);
var UpdateCurrentEnemy = thunkify(updater.UpdateCurrentEnemy);

var router = require('express').Router();

const secret1 = 'Rageball19';
const secret2 = 'Sageball24';

// router.all(function(req, res, next){
    
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     next();
// })

router.options('*', function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', 'http://roy-o-gannon.herokuapp.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})
router.post('/update', function(req, res){
    synchronize.run(function*(){
        
        res.setHeader('Access-Control-Allow-Origin', 'http://roy-o-gannon.herokuapp.com');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        console.log('updating stats route!');
        console.log('req----------------------------------------------',req.body);
        yield UpdateStats(req.body.enemy, req.body.wins, req.body.losses, req.body.sd, req.body.plusfive);
        console.log('done updating.')
        res.status(200);
        res.send({message: 'done updating'});
    })
})

router.post('/updatecurrent', function(req,res){
    synchronize.run(function*(){
        
        res.setHeader('Access-Control-Allow-Origin', 'http://roy-o-gannon.herokuapp.com');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        console.log('updating current route!');
        console.log('req----------------------------------------------',req.body);
        yield UpdateCurrentEnemy(req.body.enemy);
        console.log('done updating current enemy route.')
        res.status(200);
        res.send({message: 'done updating'});
    })
})

router.post('/secret', function(req,res){
    res.setHeader('Access-Control-Allow-Origin', 'http://roy-o-gannon.herokuapp.com');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        console.log('validating secret');
        console.log('req----------------------------------------------',req.body);
        res.status(200);
        if (req.body.secret1 == secret1 && req.body.secret2 == secret2){
            res.send({message: 'access granted'});
            console.log('validation accepted')
        }
        else{
            res.send({message: 'denied'});
            console.log('validation denied')
        }
})



module.exports = router;