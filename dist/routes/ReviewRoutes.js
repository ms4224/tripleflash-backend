"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cardFncs = __importStar(require("../src/cards"));
const express_1 = require("express");
const RouteTools_1 = require("./RouteTools");
exports.reviewRouter = express_1.Router();
exports.reviewRouter.options('*', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
});
exports.reviewRouter.post('review/cards', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log('updating flashcard route!');
    console.log('req----------------------------------------------', req.body);
    cardFncs.addToReview(req.body.kanji, req.body.hiragana, req.body.english, req.body.deck, req.body.sampleSentence, req.body.tag, req.body.remaining).then(result => RouteTools_1.RouteTools.genericSuccessResponse(res, result), err => RouteTools_1.RouteTools.genericErrorResponse(res, err));
});
exports.reviewRouter.put('review/cards', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log('updating flashcard route!');
    console.log('req----------------------------------------------', req.body);
    cardFncs.updateReviewCardCount(req.body.kanji, req.body.hiragana, req.body.english, req.body.deck, req.body.remaining).then(result => RouteTools_1.RouteTools.genericSuccessResponse(res, result), err => RouteTools_1.RouteTools.genericErrorResponse(res, err));
});
exports.reviewRouter.delete('review/delete-zero', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log('updating flashcard route!');
    console.log('req----------------------------------------------', req.body);
    cardFncs.deleteReviewCardsWith0Count().then(result => RouteTools_1.RouteTools.genericSuccessResponse(res, result), err => RouteTools_1.RouteTools.genericErrorResponse(res, err));
});
exports.reviewRouter.get('review/cards', function (req, res) {
    var _a, _b;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log('getting flashcards!');
    console.log('requested deck', (_b = (_a = req) === null || _a === void 0 ? void 0 : _a.params) === null || _b === void 0 ? void 0 : _b.deck);
    cardFncs.getReviewCards().then(result => RouteTools_1.RouteTools.genericSuccessResponse(res, result), err => RouteTools_1.RouteTools.genericErrorResponse(res, err));
});
//# sourceMappingURL=ReviewRoutes.js.map