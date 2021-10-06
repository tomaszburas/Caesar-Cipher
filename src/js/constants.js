const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const SHIFT = 13;
const alphabetLength = ALPHABET.length;

const textToEncrypt = document.querySelector('.main_input');
const btnEncrypt = document.querySelector('.main_btn');
const encryptedText = document.querySelector('.main_encrypted-text');
const containerForEncrypted = document.querySelector('.main_container-encrypted');
const containerForLibrary = document.querySelector('.main_library');
const mainContainer = document.querySelector('.main_container');

export {
  ALPHABET,
  SHIFT,
  alphabetLength,
  textToEncrypt,
  btnEncrypt,
  encryptedText,
  containerForEncrypted,
  containerForLibrary,
  mainContainer,
};
