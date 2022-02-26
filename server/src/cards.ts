
import {runQuery} from '../src/postgrePoolConnectorV2';

export function insertFlashCard(kanji: string, hiragana: string, english: string, deck: string, sampleSentence: string, tag: string) {
    var queryString = `INSERT INTO flashcard_test values ('${kanji}', '${hiragana}', '${english}', '${deck}', '${sampleSentence}', '${tag}')`;
    return executeQuery(queryString);
}

export function newDeck(deckName: string) {
    var queryString = `INSERT INTO decks values ('${deckName}')`;
    return executeQuery(queryString);
}

export function getDecks() {
    var queryString = 'SELECT * FROM decks';
    return executeQuery(queryString);
}

export function getCards(deckName: string) {
    var queryString  = `SELECT * FROM flashcard_test WHERE deck = '${deckName}'`;
    return executeQuery(queryString);
}

export function addToReview(kanji: string, hiragana: string, english: string, deck: string, sampleSentence: string, tag: string, remainingCount: number) {
    var queryString = `INSERT INTO review_cards values ('${kanji}', '${hiragana}', '${english}', '${deck}', '${sampleSentence}', '${tag}', ${remainingCount})`;
    return executeQuery(queryString);
}

export function updateReviewCardCount(kanji: string, hiragana: string, english: string, deck: string, newRemainingCount: number) {
    var queryString = `update review_cards set remaining = ${newRemainingCount} where kanji = ${kanji} AND hiragana = ${hiragana} AND english = ${english} AND deck = ${deck};`;
    return executeQuery(queryString).then(
        res => {
            return deleteReviewCardsWith0Count()
        }
    )
}

export function deleteReviewCardsWith0Count() {
    var queryString = `delete from review_cards where remaining = 0;`;
    return executeQuery(queryString);
}

export function getReviewCards() {
    var queryString  = `SELECT * FROM review_cards`;
    return executeQuery(queryString);
}

export function executeQuery(query: string): Promise<any> {
    return runQuery(query).then(
        (res) => {
            console.log('finished querying.  queryString was ' + query);
            return res;
        }
    )
}