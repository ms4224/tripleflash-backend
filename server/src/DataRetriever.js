var synchronize = require('./synchronize');
var thunkify = require('./thunkConverter').thunkify;
var pgConnect = require('./postgrePoolConnector');

//thunked functions
var executeQuery = thunkify(pgConnect.executeQuery);

function getAllEnemies(cb){
    var queryString = "select * from stats";
    synchronize.run(function*(){
        var res = yield executeQuery(queryString);
        res = res.rows;
        for (let i=0; i<res.length; i++){
            res[i].win_ratio = winRatio(res[i].wins, res[i].losses);
        }
        if ((cb!=undefined)&&(typeof(cb)==='function'))cb(null, res);
    })
}

function getCurrentEnemy(cb){
    var queryString = "select * from current_enemy where current='yes'";
    synchronize.run(function*(){
        var res = yield executeQuery(queryString);
        res = res.rows[0];
        res.win_ratio = winRatio(res.wins, res.losses);
        if ((cb!=undefined)&&(typeof(cb)==='function'))cb(null, res);
    })
}

function getEnemy(enemy, cb){
    var queryString = "select * from stats where enemy='"+enemy+"'";
    synchronize.run(function*(){
        console.log('made it inside getEnemy')
        var res = yield executeQuery(queryString);
        console.log('made it outside get enemy')
        res = res.rows[0];
        if (res != undefined){res.win_ratio = winRatio(res.wins, res.losses);}
        if ((cb!=undefined)&&(typeof(cb)==='function'))cb(null, res);
    })
}

function enemyExists(enemy, cb){
    synchronize.run(function*(){
        var enemyData = yield thunkify(getEnemy)(enemy);
        var exists = false;
        if (typeof(enemyData) == 'undefined'){
            exists = false;
        }
        else if (typeof(enemyData.enemy ==='string')){
            exists = true;
        }
        if ((cb!=undefined)&&(typeof(cb)==='function'))cb(null, exists);
    })
}

function winRatio(wins, losses){
    if (wins === 0){
        return 0;
    }
    if (losses === 0){
        return 1;
    }
    return (wins/(wins+losses));
}

module.exports = {
    getAllEnemies: getAllEnemies,
    getCurrentEnemy: getCurrentEnemy,
    getEnemy: getEnemy,
    enemyExists: enemyExists
}