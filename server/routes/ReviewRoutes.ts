
import * as cardFncs from '../src/cards';
import {Router} from 'express';
import { RouteTools } from './RouteTools';
export const reviewRouter = Router();

reviewRouter.options('*', function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
})
reviewRouter.post('/review/cards', function(req, res){
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        console.log('updating flashcard route!');
        console.log('req----------------------------------------------',req.body);
        cardFncs.addToReview(req.body.kanji, req.body.hiragana, req.body.english, req.body.deck, req.body.sampleSentence, req.body.tag, req.body.remaining).then(
            result => RouteTools.genericSuccessResponse(res, result),
            err => RouteTools.genericErrorResponse(res, err)
        )
})
reviewRouter.put('/review/cards', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log('updating flashcard route!');
    console.log('req----------------------------------------------',req.body);
    cardFncs.updateReviewCardCount(req.body.kanji, req.body.hiragana, req.body.english, req.body.deck, req.body.remaining).then(
        result => RouteTools.genericSuccessResponse(res, result),
        err => RouteTools.genericErrorResponse(res, err)
    )
})
reviewRouter.delete('/review/delete-zero', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log('updating flashcard route!');
    console.log('req----------------------------------------------',req.body);
    cardFncs.deleteReviewCardsWith0Count().then(
        result => RouteTools.genericSuccessResponse(res, result),
        err => RouteTools.genericErrorResponse(res, err)
    )
})

reviewRouter.get('/review/cards', function(req: Express.Request, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log('getting flashcards!');
    console.log('requested deck', (req as any)?.params?.deck);
    cardFncs.getReviewCards().then(
        result => RouteTools.genericSuccessResponse(res, result),
        err => RouteTools.genericErrorResponse(res, err)
    )
})