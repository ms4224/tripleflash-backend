
import * as cardFncs from '../src/cards';
import {Router} from 'express';
import { RouteTools } from './RouteTools';


export const cardRouter = Router();

// router.all(function(req, res, next){
    
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     next();
// })

cardRouter.options('*', function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Access-Control-Allow-Origin, access-control-allow-origin, *');
    next();
})
cardRouter.post('/decks', function(req, res){
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        console.log('updating decks route!');
        console.log('req----------------------------------------------',req.body);
        cardFncs.newDeck(req.body.deck).then(
            (result) => {
                RouteTools.genericSuccessResponse(res)
            },
            err => {
                RouteTools.genericErrorResponse(res, err)
            }
        )
})
cardRouter.post('/cards', function(req, res){
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        console.log('updating flashcard route!');
        console.log('req----------------------------------------------',req.body);
        cardFncs.insertFlashCard(req.body.kanji, req.body.hiragana, req.body.english, req.body.deck, req.body.sampleSentence, req.body.tag).then(
            result => {
                RouteTools.genericSuccessResponse(res, result)
            },
            err => {
                RouteTools.genericErrorResponse(res, err)
            }
        )
})
cardRouter.get('/cards', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log('getting flashcards!');
    cardFncs.getAllCards().then(
        result => RouteTools.genericSuccessResponse(res, result),
        err => RouteTools.genericErrorResponse(res, err)
    )
})
cardRouter.get('/cards/deck/:deck', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log('requested deck',req.params.deck);
    cardFncs.getCards(req.params.deck).then(
        result => RouteTools.genericSuccessResponse(res, result),
        err => RouteTools.genericErrorResponse(res, err)
    )
})
cardRouter.get('/cards/kanji/:kanji', function(req, res) {
        console.log('requested kanji',req.params.kanji);
        cardFncs.getCardsWithMatchingKanji(req.params.kanji).then(
            result => RouteTools.genericSuccessResponse(res, result),
            err => RouteTools.genericErrorResponse(res, err)
        )
})
cardRouter.get('/decks', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log('getting decks!');
    cardFncs.getDecks().then(
        result => RouteTools.genericSuccessResponse(res, result),
        err => RouteTools.genericErrorResponse(res, err)
    )
})
