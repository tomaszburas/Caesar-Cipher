import { cesar13 } from './js/functions.js';
import {
  textToEncrypt,
  btnEncrypt,
  encryptedText,
  containerForEncrypted,
  containerForLibrary,
  mainContainer,
} from './js/constants.js';

const elementsInLibrary = loadFromLocalStorage() || [];

function saveToLocalStorage(elements) {
  localStorage.setItem('library', JSON.stringify(elements));
}

function loadFromLocalStorage() {
  return JSON.parse(localStorage.getItem('library'));
}

function sortElements() {
  const arrDecrypted = [];
  const arrEncrypted = [];
  const sortEncrypted = [];
  const sortedArray = [];

  elementsInLibrary.forEach((e) => {
    const { decrypted, encrypted } = e;
    arrDecrypted.push(decrypted);
    arrEncrypted.push(encrypted);
  });

  const sortDecrypted = [...arrDecrypted].sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  for (let i = 0; i < sortDecrypted.length; i++) {
    arrDecrypted.forEach((e, x) => {
      if (e === sortDecrypted[i]) {
        sortEncrypted.push(arrEncrypted[x]);
      }
    });
  }

  arrDecrypted.forEach((e, i) => {
    sortedArray.push({
      num: i,
      decrypted: sortDecrypted[i],
      encrypted: sortEncrypted[i],
    });
  });

  return sortedArray;
}

function addItem(elements) {
  elements.push({
    num: elements.length + 1,
    decrypted: textToEncrypt.value,
    encrypted: encryptedText.textContent,
  });
  saveToLocalStorage(elements);
  return elements;
}

function removeItem(id, elements) {
  if (elements === elementsInLibrary) {
    elements.splice(id - 1, 1);
  } else {
    for (const arr of elementsInLibrary) {
      if (arr.decrypted === elements[id - 1].decrypted) {
        elementsInLibrary.splice(arr.num - 1, 1);
      }
    }
    elements.splice(id - 1, 1);
  }
  saveToLocalStorage(elementsInLibrary);

  if (!elements.length) {
    containerForLibrary.style.display = 'none';
  }

  return elements;
}

function addAllli(elements) {
  elements.forEach((e, i) => {
    e.num = i + 1;
    addLi('main_container-box-numbers', e.num, e.num, elements);
    addLi('main_container-decrypted-box', e.decrypted, e.num, elements);
    addLi('main_container-encrypted-box', e.encrypted, e.num, elements);
    addLi('main_container-box-actions', 'REMOVE', e.num, elements, 'bxs-x-circle');
  });
}

function refreshLibrary(elements) {
  removeAllLi('main_container-box-numbers',
    'main_container-decrypted-box',
    'main_container-encrypted-box',
    'main_container-box-actions');
  addAllli(elements);
}

function addLi(className, txt, id, elements, boxIcon = 'none') {
  const container = containerForLibrary.querySelector(`.${className}`);

  if (!container.lastElementChild.hasAttribute('data-olLib')) {
    const ol = document.createElement('ol');
    ol.setAttribute('data-olLib', 'true');
    container.appendChild(ol);
  }

  const li = document.createElement('li');
  li.setAttribute('id', id);

  if (boxIcon === 'none') {
    li.innerText = txt;
    li.classList.add('main_li');
  } else {
    const icon = document.createElement('i');
    icon.classList.add('bx', boxIcon);
    icon.setAttribute('title', 'Remove');
    icon.addEventListener('click', (el) => {
      removeItem(el.target.parentNode.getAttribute('id'), elements);
      refreshLibrary(elements);
    });
    li.classList.add('liStyles');
    li.appendChild(icon);
  }

  container.lastElementChild.appendChild(li);
}

function addSortedLi() {
  const sortDecrypted = containerForLibrary.querySelector('#sortDecrypted');
  let switcher = true;

  sortDecrypted.addEventListener('click', () => {
    const el = sortElements();

    if (switcher) {
      refreshLibrary(el);
      switcher = false;
    } else {
      refreshLibrary(elementsInLibrary);
      switcher = true;
    }
  });
}

function showError(mess) {
  const div = document.createElement('div');
  div.classList.add('error_container');

  const mainText = document.createElement('p');
  mainText.classList.add('main_header-text');
  mainText.innerText = 'ERROR';

  const errorText = document.createElement('p');
  errorText.innerText = mess;

  div.appendChild(mainText);
  div.appendChild(errorText);

  mainContainer.insertBefore(div, mainContainer.firstChild);
}

function encryption() {
  try {
    // remove Error Container
    if (mainContainer.children[0].className === 'error_container') {
      mainContainer.removeChild(mainContainer.children[0]);
    }

    // encryption function
    encryptedText.textContent = cesar13(textToEncrypt.value);

    // checking if there is a save btn
    const saveElement = containerForEncrypted.lastElementChild.getAttribute('title');
    if (saveElement !== 'Save') {
      // add save icon
      const i = document.createElement('i');
      i.classList.add('bx', 'bx-save', 'iconStyles');
      i.setAttribute('title', 'Save');
      containerForEncrypted.appendChild(i);

      // save to LocalStorage and show in library
      const btnSave = document.querySelector('.bx-save');
      btnSave.addEventListener('click', addTextToLibrary);
    }
  } catch (e) {
    showError(e.message);
  }
}

function addTextToLibrary() {
  // remove Error Container
  if (mainContainer.children[0].className === 'error_container') {
    mainContainer.removeChild(mainContainer.children[0]);
  }

  try {
    elementsInLibrary.forEach((e) => {
      if (e.encrypted === encryptedText.textContent) {
        throw new Error('The passed string exists in our database.');
      }
    });

    containerForLibrary.style.display = 'flex';
    addItem(elementsInLibrary);
    addLi('main_container-box-numbers', elementsInLibrary.length, elementsInLibrary.length, elementsInLibrary);
    addLi('main_container-decrypted-box', textToEncrypt.value, elementsInLibrary.length, elementsInLibrary);
    addLi('main_container-encrypted-box', encryptedText.textContent, elementsInLibrary.length, elementsInLibrary);
    addLi('main_container-box-actions', 'REMOVE', elementsInLibrary.length, elementsInLibrary, 'bxs-x-circle');
  } catch (e) {
    showError(e.message);
  }
}

function removeAllLi(...classList) {
  [...classList].forEach((e) => {
    const item = containerForLibrary.querySelector(`.${e}`);
    if (item.lastElementChild.hasAttribute('data-olLib')) {
      item.lastElementChild.innerHTML = '';
    }
  });
}

// checking if library exists
if (elementsInLibrary.length) {
  containerForLibrary.style.display = 'flex';
  addAllli(elementsInLibrary);
}

// encrypt text
btnEncrypt.addEventListener('click', encryption);

// sorted library
addSortedLi();
