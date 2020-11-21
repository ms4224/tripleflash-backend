var synchronize = require('./synchronize');
var thunkify = require('./thunkConverter').thunkify;
var pgConnect = require('./postgrePoolConnector');
var DataRetriever = require("./DataRetriever");

//thunked functions
var executeQuery = thunkify(pgConnect.executeQuery);
var getEnemy = thunkify(DataRetriever.getEnemy);
var enemyExists = thunkify(DataRetriever.enemyExists);
var updateCurrent = thunkify(UpdateCurrent);
var newEntry = thunkify(NewEntry);

function UpdateStats(enemy, wins, losses, sd, plus5, cb){
    console.log('made it inside update stats')
     synchronize.run(function*(){
        var exists = yield enemyExists(enemy);
        console.log('made it past exists')
        if (!exists){
            yield newEntry(enemy);
        }
        var queryString = "update stats set wins = wins + "+wins+", losses = losses + "+losses+", suddendeath = suddendeath + "+sd+", plusfive = plusfive + "+plus5+" where enemy = '"+enemy+"';";
        yield executeQuery(queryString);
        //get updated data
        var enemyData = yield getEnemy(enemy);
        console.log('enemyData-----', enemyData);
        //update currently pwning
        yield updateCurrent(enemyData.enemy, enemyData.wins, enemyData.losses, enemyData.suddendeath, enemyData.plusfive);
        if ((cb!=undefined)&&(typeof(cb)==='function'))cb(null, null);
    })
}

function UpdateCurrentEnemy(enemy, cb){//logic to update the current enmey data (without changing any stats)
    synchronize.run(function*(){
        var exists = yield enemyExists(enemy);
        console.log('made it past exists')
        if (!exists){
            yield newEntry(enemy);
        }
        //get enemy data
        var enemyData = yield getEnemy(enemy);
        console.log('enemyData-----', enemyData);
        //update currently pwning
        yield updateCurrent(enemyData.enemy, enemyData.wins, enemyData.losses, enemyData.suddendeath, enemyData.plusfive);
        if ((cb!=undefined)&&(typeof(cb)==='function'))cb(null, null);
    })
}

function UpdateCurrent(enemy, wins, losses, sd, plus5, cb){
    synchronize.run(function*(){
        var queryString = "update current_enemy set enemy = '"+enemy+"', wins = "+wins+", losses = "+losses+", suddendeath = "+sd+", plusfive = "+plus5+" where current = 'yes';"
        yield executeQuery(queryString);
        console.log('done updating current....')
        if ((cb!=undefined)&&(typeof(cb)==='function'))cb(null, null);
    })
}

function NewEntry(enemy, cb){
    synchronize.run(function*(){
        var queryString = "insert into stats values ('"+enemy+"', 0, 0, 0, 0)";
        yield executeQuery(queryString);
        if ((cb!=undefined)&&(typeof(cb)==='function'))cb(null, null);
    })
}

module.exports = {
    UpdateStats: UpdateStats,
    UpdateCurrentEnemy: UpdateCurrentEnemy
}