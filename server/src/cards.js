
var pgConnect = require('./postgrePoolConnector');

function insertFlashCard(kanji, hiragana, english, deck, sampleSentence, tag, cb) {
    var queryString = `INSERT INTO flashcard_test values ('${kanji}', '${hiragana}', '${english}', '${deck}', '${sampleSentence}', '${tag}')`;
    pgConnect.executeQuery(queryString, (err, queryRes) => {
        console.log('finished querying.  queryString was ' + queryString);
        if (cb) cb(err, queryRes);
    })
}

function newDeck(deckName, cb) {
    var queryString = `INSERT INTO decks values ('${deckName}')`;
    pgConnect.executeQuery(queryString, (err, queryRes) => {
        console.log('finished querying.  queryString was ' + queryString);
        if (cb) cb(err, queryRes);
    })
}

function getDecks(cb) {
    var queryString = 'SELECT * FROM decks';
    cb(err, ['test'])
    // pgConnect.executeQuery(queryString, (err, queryRes) => {
    //     console.log('finished querying.  queryString was ' + queryString);
    //     if (cb) cb(err, queryRes);
    // })
}

function getCards(deckName, cb) {
    var queryString  = `SELECT * FROM flashcard_test WHERE deck = '${deckName}'`;
    pgConnect.executeQuery(queryString, (err, queryRes) => {
        console.log('finished querying.  queryString was ' + queryString);
        if (cb) cb(err, queryRes);
    })
}

function addToReview(kanji, hiragana, english, deck, sampleSentence, tag, remainingCount, cb) {
    var queryString = `INSERT INTO review_cards values ('${kanji}', '${hiragana}', '${english}', '${deck}', '${sampleSentence}', '${tag}', ${remainingCount})`;
    pgConnect.executeQuery(queryString, (err, queryRes) => {
        console.log('finished querying.  queryString was ' + queryString);
        if (cb) cb(err, queryRes);
    })
}

function updateReviewCardCount(kanji, hiragana, english, deck, newRemainingCount, cb) {
    var queryString = `update review_cards set remaining = ${newRemainingCount} where kanji = ${kanji} AND hiragana = ${hiragana} AND english = ${english} AND deck = ${deck};`;
    pgConnect.executeQuery(queryString, (err, queryRes) => {
        console.log('finished querying.  queryString was ' + queryString);
        if (cb) cb(err, queryRes);
        deleteReviewCardsWith0Count();
    })
}

function deleteReviewCardsWith0Count(cb) {
    var queryString = `delete from review_cards where remaining = 0;`;
    pgConnect.executeQuery(queryString, (err, queryRes) => {
        console.log('finished querying.  queryString was ' + queryString);
        if (cb) cb(err, queryRes);
    })
}

function getReviewCards(cb) {
    var queryString  = `SELECT * FROM review_cards`;
    pgConnect.executeQuery(queryString, (err, queryRes) => {
        console.log('finished querying.  queryString was ' + queryString);
        if (cb) cb(err, queryRes);
    })
}



module.exports = {
    insertFlashCard: insertFlashCard,
    newDeck: newDeck,
    getDecks: getDecks,
    getCards: getCards
}