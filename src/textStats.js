/**
 * textStats.js
 */

function calculateTextStats(text) {
    if (!text) return;

    // Logging for debugging info
    console.log("calculateTextStats", "calculating stats for text length:", text.length);

    // Convert the text to upper case
    var uppercaseText = convertToUpperCase(text);
    // Remove white spaces
    var noWhiteSpaceText = removeWhiteSpaces(uppercaseText);
    // Remove newline characters
    var noLineBreaksText = removeLineBreaks(noWhiteSpaceText);

    var finalText = noLineBreaksText;
    console.log("calculateTextStats", "final text computed:", finalText);

    var total = calculateTextLength(finalText);
    var letters = createArrayOfLetters();

    // This will contain, for each letter, the histogram letter frequency info objects
    var freqs = [];
    for (let i = 0; i < letters.length; i++) {
        // Calculate the frequency
        var frequency = getNumberOfOccurrencesForLetter(finalText, letters[i]) / total;

        // Push it into the array
        freqs.push(buildHistoFreqInfo(letters[i], frequency));
    }

    console.log("calculateTextStats", "all frequencies computed", freqs);

    // We return the array with all frequency objects :)
    return freqs;
}