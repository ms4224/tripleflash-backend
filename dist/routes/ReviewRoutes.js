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
exports.reviewRouter = void 0;
const cardFncs = __importStar(require("../src/cards"));
const express_1 = require("express");
const RouteTools_1 = require("./RouteTools");
exports.reviewRouter = (0, express_1.Router)();
exports.reviewRouter.options('*', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Access-Control-Allow-Origin, access-control-allow-origin, *');
    next();
});
exports.reviewRouter.post('/review/cards', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log('updating flashcard route!');
    console.log('req----------------------------------------------', req.body);
    cardFncs.addToReview(req.body.kanji, req.body.hiragana, req.body.english, req.body.deck, req.body.sampleSentence, req.body.tag, req.body.remaining).then(result => RouteTools_1.RouteTools.genericSuccessResponse(res, result), err => RouteTools_1.RouteTools.genericErrorResponse(res, err));
});
exports.reviewRouter.put('/review/cards', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log('updating flashcard route!');
    console.log('req----------------------------------------------', req.body);
    cardFncs.updateReviewCardCount(req.body.kanji, req.body.hiragana, req.body.english, req.body.deck, req.body.remaining).then(result => RouteTools_1.RouteTools.genericSuccessResponse(res, result), err => RouteTools_1.RouteTools.genericErrorResponse(res, err));
});
exports.reviewRouter.delete('/review/delete-zero', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log('updating flashcard route!');
    console.log('req----------------------------------------------', req.body);
    cardFncs.deleteReviewCardsWith0Count().then(result => RouteTools_1.RouteTools.genericSuccessResponse(res, result), err => RouteTools_1.RouteTools.genericErrorResponse(res, err));
});
exports.reviewRouter.get('/review/cards', function (req, res) {
    var _a, _b;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log('getting flashcards!');
    console.log('requested deck', (_b = (_a = req) === null || _a === void 0 ? void 0 : _a.params) === null || _b === void 0 ? void 0 : _b.deck);
    cardFncs.getReviewCards().then(result => RouteTools_1.RouteTools.genericSuccessResponse(res, result), err => RouteTools_1.RouteTools.genericErrorResponse(res, err));
});
//# sourceMappingURL=ReviewRoutes.js.map