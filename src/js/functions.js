import {ALPHABET, SHIFT, alphabetLength} from './constants.js';

function checkText(text) {
    let contain;

    for (let i = 0; i < ALPHABET.length; i++) {
        contain = [...text.toUpperCase()].some(element => element === ALPHABET[i]);
        if (contain) break;
    }

    return contain;
}

function checkCaseOfLetter(text, index) {
    if (text[index] === text[index].toUpperCase()) {
        return true;
    } else {
        return false
    }
};

function cesar13(text) {
    if (typeof text !== 'string') { throw new Error('The text you enter is not a string.') };
    if (text === '') { throw new Error('Please enter text.') };
    if (!checkText(text)) { throw new Error('Please enter text with letters.') };

    text = text.trim();

    const workingText = [...text.toUpperCase()];

    const encryptArray = workingText.map((element, index) => {
        const indexOnAlphabet = ALPHABET.indexOf(element);

        if (indexOnAlphabet === -1) {
            return element;
        } else {
            if (indexOnAlphabet + SHIFT < alphabetLength) {
                return checkCaseOfLetter(text, index) ? ALPHABET[indexOnAlphabet + SHIFT] : ALPHABET[indexOnAlphabet + SHIFT].toLowerCase();
            } else {
                const difference = alphabetLength - indexOnAlphabet;
                const result = SHIFT - difference;

                return checkCaseOfLetter(text, index) ? ALPHABET[result] : ALPHABET[result].toLowerCase();
            }
        }
    });

    return encryptArray.join('');
}

export { cesar13 }