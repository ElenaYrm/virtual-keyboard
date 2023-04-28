import { keysEn, keysEnShift, keysRu, keysRuShift } from './constants.js';
import { container, textArea, updateInput } from './basicElements.js';
import { lang, updateLanguage } from "./lang.js";

const regExp = new RegExp(/[a-z][а-я]/g);
let isCapsLock = false;

let keyboard = lang === 'en' ? keysEn : keysRu;

const keysContainer = document.createElement('div');
keysContainer.classList.add('keyboard');

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
        isCapsLock = !isCapsLock;
        if (isCapsLock) {
          item.classList.add('keyboard__btn--active');
        } else {
          item.classList.remove('keyboard__btn--active');
        }
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
      break;
    case 'ShiftRight':
      item.classList.add('keyboard__btn--shift');
      break;
    case 'Space':
      item.classList.add('keyboard__btn--space');
      item.addEventListener('click', () => {
        updateInput(' ');
      });
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
function updateKeyboard(keys) {
  const btns = document.querySelectorAll('.keyboard__btn');
  for (const btn of btns) {
    for (const [key, value] of Object.entries(keys)) {
      if (btn.getAttribute('data-key') === key) {
        btn.textContent = value;
      }
      if (isCapsLock && btn.textContent.match(regExp)) {
        btn.textContent.toUpperCase();
      }
    }
  }
}

let row = createRow();
keysContainer.appendChild(row);
for (const [key, value] of Object.entries(keyboard)) {
    row.appendChild(createBtn(key, value));
  if (key === 'Backspace' || key === 'Delete' || key === 'Enter' || key === 'ShiftRight') {
    row = createRow();
    keysContainer.appendChild(row);
  }
}

container.appendChild(keysContainer);

const btns = document.querySelectorAll('.keyboard__btn');

document.addEventListener('keydown', (event) => {
  event.preventDefault();
  for (const btn of btns) {
    const key = btn.getAttribute('data-key');
    if (event.code === key) {
      btn.classList.add('keyboard__btn--active');
      updateInput(event.key);
    }
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      updateKeyboard(keysEnShift);
    }
  }
  console.log(event.key);
});

document.addEventListener('keyup', (event) => {
  event.preventDefault();
  for (const btn of btns) {
    btn.classList.remove('keyboard__btn--active');
  }
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    updateKeyboard(keysEn);
  }
});
