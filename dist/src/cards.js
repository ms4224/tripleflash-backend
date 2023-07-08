"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postgrePoolConnectorV2_1 = require("../src/postgrePoolConnectorV2");
function insertFlashCard(kanji, hiragana, english, deck, sampleSentence, tag) {
    var queryString = `INSERT INTO flashcard_test values ('${kanji}', '${hiragana}', '${english}', '${deck}', '${sampleSentence}', '${tag}')`;
    return executeQuery(queryString);
}
exports.insertFlashCard = insertFlashCard;
function newDeck(deckName) {
    var queryString = `INSERT INTO decks values ('${deckName}')`;
    return executeQuery(queryString);
}
exports.newDeck = newDeck;
function getDecks() {
    var queryString = 'SELECT * FROM decks';
    return executeQuery(queryString);
}
exports.getDecks = getDecks;
function getCards(deckName) {
    var queryString = `SELECT * FROM flashcard_test WHERE deck = '${deckName}'`;
    return executeQuery(queryString);
}
exports.getCards = getCards;
function getAllCards() {
    var queryString = `SELECT * FROM flashcard_test`;
    return executeQuery(queryString);
}
exports.getAllCards = getAllCards;
function getCardsWithMatchingKanji(kanji) {
    var queryString = `SELECT * FROM flashcard_test WHERE kanji = '${kanji}'`;
    return executeQuery(queryString);
}
exports.getCardsWithMatchingKanji = getCardsWithMatchingKanji;
function addToReview(kanji, hiragana, english, deck, sampleSentence, tag, remainingCount) {
    var queryString = `INSERT INTO review_cards values ('${kanji}', '${hiragana}', '${english}', '${deck}', '${sampleSentence}', '${tag}', ${remainingCount})`;
    return executeQuery(queryString);
}
exports.addToReview = addToReview;
function updateReviewCardCount(kanji, hiragana, english, deck, newRemainingCount) {
    var queryString = `update review_cards set remaining = ${newRemainingCount} where kanji = '${kanji}' AND hiragana = '${hiragana}' AND english = '${english}' AND deck = '${deck}';`;
    return executeQuery(queryString).then(res => {
        return deleteReviewCardsWith0Count();
    });
}
exports.updateReviewCardCount = updateReviewCardCount;
function deleteReviewCardsWith0Count() {
    var queryString = `delete from review_cards where remaining = 0;`;
    return executeQuery(queryString);
}
exports.deleteReviewCardsWith0Count = deleteReviewCardsWith0Count;
function getReviewCards() {
    var queryString = `SELECT * FROM review_cards`;
    return executeQuery(queryString);
}
exports.getReviewCards = getReviewCards;
function executeQuery(query) {
    return postgrePoolConnectorV2_1.runQuery(query).then((res) => {
        console.log('finished querying.  queryString was ' + query);
        return res;
    });
}
exports.executeQuery = executeQuery;
//# sourceMappingURL=cards.js.map