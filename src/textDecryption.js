/**
 * textDecryption.js
 */

function decryptCypherText(cypherText, key) {
    // Key is supposed to be 26 characters
    // Association done with A-B-C-D-E-F-G-H-I-J-K-L-M-N-O-P-Q-R-S-T-U-V-W-X-Y-Z
    if (key.length != 26) {
        return "Error! Key is not valid";
    }

    var assocDict = {
        "a": key[0].toLowerCase(), "A": key[0].toUpperCase(), 
        "b": key[1].toLowerCase(), "B": key[1].toUpperCase(), 
        "c": key[2].toLowerCase(), "C": key[2].toUpperCase(), 
        "d": key[3].toLowerCase(), "D": key[3].toUpperCase(), 
        "e": key[4].toLowerCase(), "E": key[4].toUpperCase(), 
        "f": key[5].toLowerCase(), "F": key[5].toUpperCase(), 
        "g": key[6].toLowerCase(), "G": key[6].toUpperCase(), 
        "h": key[7].toLowerCase(), "H": key[7].toUpperCase(), 
        "i": key[8].toLowerCase(), "I": key[8].toUpperCase(), 
        "j": key[9].toLowerCase(), "J": key[9].toUpperCase(), 
        "k": key[10].toLowerCase(), "K": key[10].toUpperCase(), 
        "l": key[11].toLowerCase(), "L": key[11].toUpperCase(), 
        "m": key[12].toLowerCase(), "M": key[12].toUpperCase(), 
        "n": key[13].toLowerCase(), "N": key[13].toUpperCase(), 
        "o": key[14].toLowerCase(), "O": key[14].toUpperCase(), 
        "p": key[15].toLowerCase(), "P": key[15].toUpperCase(), 
        "q": key[16].toLowerCase(), "Q": key[16].toUpperCase(), 
        "r": key[17].toLowerCase(), "R": key[17].toUpperCase(), 
        "s": key[18].toLowerCase(), "S": key[18].toUpperCase(), 
        "t": key[19].toLowerCase(), "T": key[19].toUpperCase(), 
        "u": key[20].toLowerCase(), "U": key[20].toUpperCase(), 
        "v": key[21].toLowerCase(), "V": key[21].toUpperCase(), 
        "w": key[22].toLowerCase(), "W": key[22].toUpperCase(), 
        "x": key[23].toLowerCase(), "X": key[23].toUpperCase(), 
        "y": key[24].toLowerCase(), "Y": key[24].toUpperCase(), 
        "z": key[25].toLowerCase(), "Z": key[25].toUpperCase(), 
    };

    var plainText = "";
    for (var i = 0; i < cypherText.length; i++) {
        var replaced = assocDict[cypherText[i]];

        if (!replaced) {
            plainText += cypherText[i];
        } else {
            plainText += replaced;
        }
    }

    return plainText;
}

function decryptCypherText2(cypherText, key) {
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
