
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
    pgConnect.executeQuery(queryString, (err, queryRes) => {
        console.log('finished querying.  queryString was ' + queryString);
        if (cb) cb(err, queryRes);
    })
}

function getCards(deckName, cb) {
    var queryString  = `SELECT * FROM flashcard_test WHERE deck = '${deckName}'`;
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