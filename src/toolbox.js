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
    while ((i = string.indexOf(substring, i + 1)) >= 0) a.push(i);

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

    // Check invalid characters
    // No need to check for spaces and newlines, they are stripped away
    matches = key.toLowerCase().match(/[^a-z]/g);
    if (matches && matches.length > 0) {
        return "Error: Key contains invalid characters! They key can only contain letters.";
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

function logErr() {
    // Log only if env variable is defined
    if (window["__cryptohisto_log_enabled"]) console.error(arguments);
}

function testCodedFunction(f) {
    var basicCheck = function (r) {
        return !!r && r.length === 26;
    }

    if (!f) {
        return false;
    }

    try {
        // Basic input
        var res1 = f("abcd");
        if (!basicCheck(res1)) {
            return false;
        }
        if (res1[0].letter !== "A" || res1[0].frequency !== 0.25) {
            return false;
        }
        if (res1[1].letter !== "B" || res1[1].frequency !== 0.25) {
            return false;
        }
        if (res1[2].letter !== "C" || res1[2].frequency !== 0.25) {
            return false;
        }
        if (res1[3].letter !== "D" || res1[3].frequency !== 0.25) {
            return false;
        }

        // Uppercase/lowercase
        var res2 = f("AAaa");
        if (!basicCheck(res2)) {
            return false;
        }
        if (res2[0].letter !== "A" || res2[0].frequency !== 1) {
            return false;
        }

        // Complete set of chars
        var res3 = f("AA,aa@.;'+=%&*$#");
        if (!basicCheck(res3)) {
            return false;
        }
        if (res3[0].letter !== "A" || res3[0].frequency !== 0.25) {
            return false;
        }

        // Spaces ignored
        var res4 = f("AA   aa");
        if (!basicCheck(res4)) {
            return false;
        }
        if (res4[0].letter !== "A" || res4[0].frequency !== 1) {
            return false;
        }
    } catch (ex) {
        return false;
    }

    return true;
}

function calculateTextLength(text) {
    return text.length;
}

function convertToUpperCase(text) {
    return text.toUpperCase();
}

function createArrayOfLetters() {
    return "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
}

function cleanKey(key) {
    // Removes spaces and newlines + to uppercase, + trim to 26 chars
    return key.textContent.replace(/\n|\r|\s/g, "").toUpperCase().substr(0, 26);
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function durstenfeldShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function hideElement(el) {
    el.classList.add("hidden");
}

function showElement(el) {
    el.classList.remove("hidden");
}

// TODO: Refactor
function generateDual(key) {
    var tpl = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (!key || key.length != tpl.length)
        return key;

    var dual = "";
    for (let i = 0; i < tpl.length; i++) {
        dual += tpl[key.toUpperCase().indexOf(tpl[i])];
    }

    return dual;
}