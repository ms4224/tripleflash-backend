
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000

// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Pass to next layer of middleware
//     next();
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/dist')));

// var EnemyData = require('./server/routes/EnemyDataRoute');
// var UpdateScore = require('./server/routes/UpdateScoreRoute');
// var Emote = require('./server/routes/EmoteRoute');
var Cards = require('./server/routes/CardsRoutes')

// app.use('/updatescore', UpdateScore);
// app.use('/enemydata', EnemyData);
// app.use('/emote', Emote);
app.use('/tripleflash', Cards)


// app.get('/info', function (req, res){
//     res.send('hello tehre!!!!!!!!!!!!!!!!1');
// })

app.get('*', function (req, res) {
    // res.sendFile(path.join(__dirname, 'index.html'));
    // res.redirect('https://roy-o-gannon.herokuapp.com/')
    res.send('hello.')
});

// app.get('/*', function (req, res) {
//     // res.sendFile(path.join(__dirname, 'index.html'));
//     res.redirect('https://roy-o-gannon.herokuapp.com/')
//     // res.send('hello.')
// });


app.listen(PORT, function(){
    console.log('listening on 5000 yolo')
})
