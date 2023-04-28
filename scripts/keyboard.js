import {
  textArea,
  updateInput,
} from './basicElements.js';
import { lang } from './lang.js';
import {
  keysEn,
  keysEnShift,
  keysRu,
  keysRuShift,
} from './constants.js';

const regExp = /^[a-z а-я]$/i;
let isCapsLock = false;
let isShift = false;
export const btns = [];

export function changeCapsLk(element) {
  isCapsLock = !isCapsLock;
  if (isCapsLock) {
    element.classList.add('keyboard__btn--active');
  } else {
    element.classList.remove('keyboard__btn--active');
  }
}
export function changeShift(element) {
  isShift = !isShift;
  if (isShift) {
    element.classList.add('keyboard__btn--active');
  } else {
    element.classList.remove('keyboard__btn--active');
  }
}
export function checkKeyboardType(language, shift, capsLk) {
  let keyboard = keysEn;
  if (language === 'en' && shift) {
    keyboard = keysEnShift;
  } else if (language !== 'en' && shift) {
    keyboard = keysRuShift;
  } else if (language !== 'en' && !shift) {
    keyboard = keysRu;
  }
  if (capsLk && !shift) {
    const items = Object.entries(keyboard);
    for (const [key, value] of items) {
      if (regExp.test(value)) {
        keyboard[key] = keyboard[key].toUpperCase();
      }
    }
  } else if (!capsLk && !shift) {
    const items = Object.entries(keyboard);
    for (const [key, value] of items) {
      if (regExp.test(value)) {
        keyboard[key] = keyboard[key].toLowerCase();
      }
    }
  }

  return keyboard;
}
export function updateKeyboard(btnArray, keys) {
  const keyItems = Object.keys(keys);
  const valueItems = Object.values(keys);
  for (let i = 0; i < btnArray.length; i + 1) {
    btnArray[i].dataset.key = keyItems[i];
    btnArray[i].textContent = valueItems[i];
  }
}
function createBtn(key, value) {
  const item = document.createElement('button');
  item.textContent = value;
  item.dataset.key = key;
  item.classList.add('keyboard__btn');

  switch (key) {
    case 'Backspace':
      item.classList.add('keyboard__btn--backspace');
      item.addEventListener('click', () => {
        textArea.textContent = textArea.textContent.substring(0, textArea.textContent.length - 1);
      });
      break;
    case 'Tab':
      item.classList.add('keyboard__btn--tab');
      item.addEventListener('click', () => {
        updateInput('\t');
      });
      break;
    case 'Delete':
      console.log('delete');
      break;
    case 'CapsLock':
      item.classList.add('keyboard__btn--capsLk');
      item.addEventListener('click', () => {
        changeCapsLk(item);
        updateKeyboard(btns, checkKeyboardType(lang, isShift, isCapsLock));
      });
      break;
    case 'Enter':
      item.classList.add('keyboard__btn--enter');
      item.addEventListener('click', () => {
        updateInput('\n');
      });
      break;
    case 'ShiftLeft':
      item.classList.add('keyboard__btn--shift');
      item.addEventListener('click', () => {
        changeShift(item);
        updateKeyboard(btns, checkKeyboardType(lang, isShift, isCapsLock));
      });
      break;
    case 'ShiftRight':
      item.classList.add('keyboard__btn--shift');
      item.addEventListener('click', () => {
        changeShift(item);
        updateKeyboard(btns, checkKeyboardType(lang, isShift, isCapsLock));
      });
      break;
    case 'Space':
      item.classList.add('keyboard__btn--space');
      item.addEventListener('click', () => {
        updateInput(' ');
      });
      break;
    case 'ControlLeft':
      break;
    case 'ControlRight':
      break;
    case 'AltLeft':
      break;
    case 'AltRight':
      break;
    case 'MetaLeft':
      break;
    default:
      item.addEventListener('click', () => {
        updateInput(item.textContent);
      });
  }

  return item;
}
function createRow() {
  const row = document.createElement('div');
  row.classList.add('keyboard__row');
  return row;
}

export function initKeyboard() {
  const keysContainer = document.createElement('div');
  keysContainer.classList.add('keyboard');

  const keyboard = checkKeyboardType(lang, isShift, isCapsLock);
  let row = createRow();
  keysContainer.appendChild(row);
  for (const [key, value] of Object.entries(keyboard)) {
    const btn = createBtn(key, value);
    row.appendChild(btn);
    btns.push(btn);
    if (key === 'Backspace' || key === 'Delete' || key === 'Enter' || key === 'ShiftRight') {
      row = createRow();
      keysContainer.appendChild(row);
    }
  }

  return keysContainer;
}
