import {cesar13} from './js/functions.js';

const textToEncrypt = document.querySelector(".input-textToEncrypt");
const btnEncrypt = document.querySelector(".submit-textToEncrypt");
const encryptedText = document.querySelector(".encryptedText");
const containerForEncrypted = document.querySelector(".containerForEncrypted");
const containerForLibrary = document.querySelector(".library");

btnEncrypt.addEventListener('click', encryption);

function encryption() {
    // checking if there is a save btn
    const saveElement = containerForEncrypted.lastElementChild.getAttribute("title");
    if (saveElement !== "Save") {
        // add save icon
        const i = document.createElement('i');
        i.classList.add('bx', 'bx-save', 'iconStyles');
        i.setAttribute("title", "Save");
        containerForEncrypted.appendChild(i);
    }

    // encryption function
    encryptedText.textContent = cesar13(textToEncrypt.value);

    // save to LocalStorage and show in library
    const btnSave = document.querySelector('.bx-save');
    btnSave.addEventListener("click", addTextToLibrary);
}

function addTextToLibrary() {
    containerForLibrary.style.display = 'flex';

    const decrypt = containerForLibrary.querySelector('.decrypted');
    createLiForLibrary(decrypt, textToEncrypt.value);

    const encrypt = containerForLibrary.querySelector('.encrypted');
    createLiForLibrary(encrypt, encryptedText.textContent);

}

function createLiForLibrary(element, txt) {
    const olCreate = document.createElement('ol');
    if (!element.lastElementChild.classList.contains('olList')) {
        olCreate.classList.add('olList');
        element.appendChild(olCreate);
    }

    const li = document.createElement('li');
    const ol = element.querySelector('ol')
    li.innerText = txt;
    ol.appendChild(li);
}