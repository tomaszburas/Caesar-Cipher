import {cesar13} from './js/functions.js';

const textToEncrypt = document.querySelector(".main_input");
const btnEncrypt = document.querySelector(".main_btn");
const encryptedText = document.querySelector(".main_encrypted-text");
const containerForEncrypted = document.querySelector(".main_container-encrypted");
const containerForLibrary = document.querySelector(".main_library");
const elementsInLibrary = [];

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

function addItem(elements) {
    elements.push({
        num: elements.length + 1,
        decrypted: textToEncrypt.value,
        encrypted: encryptedText.textContent,
    });

    return elements;
}


function addTextToLibrary() {
    containerForLibrary.style.display = 'flex';
    addItem(elementsInLibrary);
    addLi('main_container-box-numbers', elementsInLibrary.length);
    addLi('main_container-decrypted-box', textToEncrypt.value);
    addLi('main_container-encrypted-box', encryptedText.textContent);
    addLi('main_container-box-actions', 'x');

}

function refreshLibrary() {
    removeAllLi('main_container-box-numbers',
        'main_container-decrypted-box',
        'main_container-encrypted-box',
        'main_container-box-actions');
    addAllli(elementsInLibrary);
}

function addAllli(elements) {

    elements.forEach((e, i) => {
        e.num = i+1;
        addLi('main_container-box-numbers', e.num);
        addLi('main_container-decrypted-box', e.decrypted);
        addLi('main_container-encrypted-box', e.encrypted);
        addLi('main_container-box-actions', 'x');
    })

}

function removeItems(id, elements) {
    elements.splice(id-1,1);
    return elements;
}

function addLi(className, txt) {
    const container = containerForLibrary.querySelector(`.${className}`);

    if (!container.lastElementChild.hasAttribute('data-olLib')) {
        const ol = document.createElement('ol');
        ol.setAttribute('data-olLib', 'true')
        container.appendChild(ol)
    }

    const li = document.createElement('li');
    li.innerText = txt;
    li.setAttribute('id', elementsInLibrary.length);

    if (li.textContent === 'x') {
        li.addEventListener('click', (el) => {
            removeItems(el.target.getAttribute('id'), elementsInLibrary);
            refreshLibrary();
        })
    };

    container.lastElementChild.appendChild(li);
}

function removeAllLi(...classList) {
    [...classList].forEach(e  => {
        const item = containerForLibrary.querySelector(`.${e}`);
        if (item.lastElementChild.hasAttribute('data-olLib')) {
            item.lastElementChild.innerHTML = '';
        }
    })
}
