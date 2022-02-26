
var cardFncs = require('../src/cards');

var router = require('express').Router();

router.options('*', function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
})
router.post('/review/cards', function(req, res){
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        console.log('updating flashcard route!');
        console.log('req----------------------------------------------',req.body);
        cardFncs.addToReview(req.body.kanji, req.body.hiragana, req.body.english, req.body.deck, req.body.sampleSentence, req.body.tag, req.body.remaining, (err, queryResult) => {
            console.log('done updating. added new card to review')
            res.status(200);
            if (err) {
                console.log('there was an error!', err)
            }
            res.send({message: 'done updating. added new card to review'});
        })
})
router.put('/review/cards', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log('updating flashcard route!');
    console.log('req----------------------------------------------',req.body);
    cardFncs.updateReviewCardCount(req.body.kanji, req.body.hiragana, req.body.english, req.body.deck, req.body.remaining, (err, queryResult) => {
        console.log('done updating.')
        res.status(200);
        if (err) {
            console.log('there was an error!', err)
        }
        res.send({message: 'done updating in REVIEW table'});
    })
})
router.delete('/review/delete-zero', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log('updating flashcard route!');
    console.log('req----------------------------------------------',req.body);
    cardFncs.deleteReviewCardsWith0Count((err, queryResult) => {
        console.log('done updating. Deleted 0 remaining tries cards')
        res.status(200);
        if (err) {
            console.log('there was an error!', err)
        }
        res.send({message: 'done updating'});
    })
})

router.get('/review/cards', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log('getting flashcards!');
    console.log('requested deck',req.params.deck);
    cardFncs.getReviewCards(req.params.deck, (err, queryResult) => {
        console.log('done retrieving REVIEW cards.')
        res.status(200);
        if (err) {
            console.log('there was an error!', err)
        }
        res.send(queryResult);
    })
})

module.exports = router;