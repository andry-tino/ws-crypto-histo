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

function findAllOccurrances(substring, string) {
    var a = []; var i = -1;
    while((i = string.indexOf(substring, i+1)) >= 0) a.push(i);

    return a;
}

function checkKeyAndDecrypt(key, callbackSuccess) {
    if (!key) {
        return "Error: Invalid key";
    }

    // Check duplicate characters
    var matches = key.toLowerCase().split("").sort().join("").match(/(.)\1+/g);
    if (matches && matches.length > 0) {
        return "Error: Duplicate characters in key!";
    }

    return callbackSuccess();
}

function stripFormatting(html) {
    var tempDiv = document.createElement("DIV");
    tempDiv.innerHTML = html;
    return tempDiv.innerText;
}

function logInfo() {
    // Log only if env variable is defined
    if (window["__cryptohisto_log_enabled"]) console.log(arguments);
}
