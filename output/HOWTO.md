# How to solve the coding challenges
You are asked to solve a few coding challenges. In ordr to do so, you can take advantage of a few functions we have for you and that you should use.

- [convertToUpperCase](#convertToUpperCase)
- [removeWhiteSpaces](#removeWhiteSpaces)
- [removeLineBreaks](#removeLineBreaks)
- [calculateTextLength](#calculateTextLength)
- [createArrayOfLetters](#createArrayOfLetters)
- [getNumberOfOccurrencesForLetter](#getNumberOfOccurrencesForLetter)
- [buildHistoFreqInfo](#buildHistoFreqInfo)

## Function `convertToUpperCase`
Used to convert a text all to uppercase letters.

```javascript
var text = "My awesome text";
var newText = convertToUpperCase(text);

console.log(newText);
```

The output is:

```
MY AWESOME TEXT
```

## Function `removeWhiteSpaces`
Used to remove all spaces inside a text.

```javascript
var text = "My awesome text";
var newText = removeWhiteSpaces(text);

console.log(newText);
```

The output is:

```
Myawesometext
```

## Function `removeLineBreaks`
Used to remove all line breaks from a text.

```javascript
var text = "My \
awesome \
text";
var newText = removeLineBreaks(text);

console.log(newText);
```

The output is:

```
My awesome text
```

## Function `calculateTextLength`
Used to calculate how many characters there are inside a string.

```javascript
var text = "My awesome text";
var length = calculateTextLength(text);

console.log(length);
```

The output is:

```
15
```

### Important
This function will count all characters including white spaces and line breaks.

## Function `createArrayOfLetters`
Generates an array with all the letters (uppercase) of the (English) alphabet in order.

```javascript
var alphabet = createArrayOfLetters();

console.log(alphabet);
```

The output is:

```
[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z]
```

## Function `getNumberOfOccurrencesForLetter`
Used to calculate how many times a character appears inside a text.

```javascript
var text = "My awesome text";
var letter = "e";
var count = getNumberOfOccurrencesForLetter(text, letter);

console.log(count);
```

The output is:

```
3
```

### Important
This function will make distinction between uppercase and lowercase. See example below:

```javascript
var count = getNumberOfOccurrencesForLetter("My Awesome Text", "A");
console.log(count);
```

Output is:

```
1
```

But in this case:

```javascript
var count = getNumberOfOccurrencesForLetter("My Awesome Text", "a");
console.log(count);
```

Output is:

```
0
```

## Function `buildHistoFreqInfo`
You must call this function to create the _frequency object_ to push into the _frequency array_.

```javascript

var frequency = 10;
var letter = "a";
// Letter a appears 10 times in text
var frequencyObj = buildHistoFreqInfo(letter, frequency);
```
