/**
 * textDecryption.js
 */

function decryptCypherText(cypherText, key) {
    // Key is supposed to be 26 characters
    // Association done with A-B-C-D-E-F-G-H-I-J-K-L-M-N-O-P-Q-R-S-T-U-V-W-X-Y-Z
    var assocArray = ["a", "b", "c", "d", 
                      "e", "f", "g", "h", 
                      "i", "j", "k", "l", 
                      "m", "n", "o", "p", 
                      "q", "r", "s", "t", 
                      "u", "v", "w", "x", 
                      "y", "z"];

    if (key.length != 26) {
        return "Error! Key is not valid";
    }

    var plainText = "";
    for (var i = 0; i < cypherText.length; i++) {
        for (var j = 0; j < assocArray.length; j++) {
            if (cypherText[i] == assocArray[j].toLowerCase()) {
                plainText += key[j].toLowerCase();
                break;
            }
            if (cypherText[i] == assocArray[j].toUpperCase()) {
                plainText += key[j].toUpperCase();
                break;
            } 
            if (j == assocArray.length - 1) {
                plainText += cypherText[i];
            }
        }
    }

    return plainText;
}
