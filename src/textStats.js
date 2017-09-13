/**
 * textStats.js
 */

function calculateTextStats(text) {
    if (!text) return;
    console.log("Calculating stats for text length:", text.length);

    // To upper + remove spaces and line breaks
    var processedText = text.toUpperCase().replace(/\n|\r|\s/g, "");
    var total = processedText.length;
    var letters = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

    var freqs = [];
    for (let i = 0; i < letters.length; i++) {
        var frequency = (processedText.match(new RegExp(letters[i], "g")) || []).length/total;
        freqs.push({ "letter": letters[i], "frequency": frequency });
    }

    return freqs;
}