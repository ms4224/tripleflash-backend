"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardRouter = void 0;
const cardFncs = __importStar(require("../src/cards"));
const express_1 = require("express");
const RouteTools_1 = require("./RouteTools");
exports.cardRouter = (0, express_1.Router)();
// router.all(function(req, res, next){
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     next();
// })
exports.cardRouter.options('*', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Access-Control-Allow-Origin, access-control-allow-origin, *');
    next();
});
exports.cardRouter.post('/decks', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log('updating decks route!');
    console.log('req----------------------------------------------', req.body);
    cardFncs.newDeck(req.body.dec).then((result) => {
        RouteTools_1.RouteTools.genericSuccessResponse(res);
    }, err => {
        RouteTools_1.RouteTools.genericErrorResponse(res, err);
    });
});
exports.cardRouter.post('/cards', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log('updating flashcard route!');
    console.log('req----------------------------------------------', req.body);
    cardFncs.insertFlashCard(req.body.kanji, req.body.hiragana, req.body.english, req.body.deck, req.body.sampleSentence, req.body.tag).then(result => {
        RouteTools_1.RouteTools.genericSuccessResponse(res, result);
    }, err => {
        RouteTools_1.RouteTools.genericErrorResponse(res, err);
    });
});
exports.cardRouter.get('/cards', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log('getting flashcards!');
    cardFncs.getAllCards().then(result => RouteTools_1.RouteTools.genericSuccessResponse(res, result), err => RouteTools_1.RouteTools.genericErrorResponse(res, err));
});
exports.cardRouter.get('/cards/deck/:deck', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log('requested deck', req.params.deck);
    cardFncs.getCards(req.params.deck).then(result => RouteTools_1.RouteTools.genericSuccessResponse(res, result), err => RouteTools_1.RouteTools.genericErrorResponse(res, err));
});
exports.cardRouter.get('/cards/kanji/:kanji', function (req, res) {
    console.log('requested kanji', req.params.kanji);
    cardFncs.getCardsWithMatchingKanji(req.params.kanji).then(result => RouteTools_1.RouteTools.genericSuccessResponse(res, result), err => RouteTools_1.RouteTools.genericErrorResponse(res, err));
});
exports.cardRouter.get('/decks', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log('getting decks!');
    cardFncs.getDecks().then(result => RouteTools_1.RouteTools.genericSuccessResponse(res, result), err => RouteTools_1.RouteTools.genericErrorResponse(res, err));
});
//# sourceMappingURL=CardsRoutes.js.map