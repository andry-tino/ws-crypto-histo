/**
 * toolbox.js
 */

function removeWhiteSpaces(text) {
    if (!text) return text;
    return text.replace(/\n|\r/g, "");
}

function removeLineBreaks(text) {
    if (!text) return text;
    return text.replace(/\s/g, "");
}

function getNumberOfOccurrencesForLetter(text, letter) {
    if (!text) return 0;
    return (text.match(new RegExp(letter, "g")) || []).length;
}

function buildHistoFreqInfo(letter, frequency) {
    return { "letter": letter, "frequency": frequency };
}
