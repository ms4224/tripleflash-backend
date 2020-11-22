
var cardFncs = require('../src/cards');

var router = require('express').Router();

// router.all(function(req, res, next){
    
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     next();
// })

router.options('*', function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
})
router.post('/decks', function(req, res){
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        console.log('updating decks route!');
        console.log('req----------------------------------------------',req.body);
        cardFncs.newDeck(req.body.deck, (err, queryResult) => {
            console.log('done updating.')
            res.status(200);
            if (err) {
                console.log('there was an error!', err)
            }
            res.send({message: 'done updating'});
        })
})
router.post('/cards', function(req, res){
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        console.log('updating flashcard route!');
        console.log('req----------------------------------------------',req.body);
        cardFncs.insertFlashCard(req.body.kanji, req.body.hiragana, req.body.english, req.body.deck, req.body.sampleSentence, req.body.tag, (err, queryResult) => {
            console.log('done updating.')
            res.status(200);
            if (err) {
                console.log('there was an error!', err)
            }
            res.send({message: 'done updating'});
        })
})
router.get('/cards/:deck', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log('getting flashcards!');
    console.log('requested deck',req.params.deck);
    cardFncs.getCards(req.params.deck, (err, queryResult) => {
        console.log('done retrieving cards.')
        res.status(200);
        if (err) {
            console.log('there was an error!', err)
        }
        res.send(queryResult);
    })
})
router.get('/decks', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log('getting decks!');
    cardFncs.getDecks((err, queryResult) => {
        console.log('done retrieving decks.')
        res.status(200);
        if (err) {
            console.log('there was an error!', err)
        }
        res.send(queryResult);
    })
})

module.exports = router;