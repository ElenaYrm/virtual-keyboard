import {
  container,
  textArea,
  updateInput,
} from './basicElements.js';
import {
  initKeyboard,
  btns,
  updateKeyboard,
  changeCapsLk,
  checkKeyboardType,
  changeShift,
  isShift,
  isCapsLock,
} from './keyboard.js';
import { lang } from "./lang.js";

container.appendChild(initKeyboard());
document.addEventListener('keydown', (event) => {
  event.preventDefault();
  for (const btn of btns) {
    const key = btn.getAttribute('data-key');
    if (event.code === key) {
      btn.classList.add('keyboard__btn--active');
      switch (key) {
        case 'Backspace':
          textArea.textContent = textArea.textContent.substring(0, textArea.textContent.length - 1);
          break;
        case 'Tab':
          updateInput('\t');
          break;
        case 'Delete':
          console.log('delete');
          break;
        case 'CapsLock':
          // changeCapsLk(btn);
          // updateKeyboard(btns, checkKeyboardType(lang, isShift, isCapsLock));
          break;
        case 'Enter':
          updateInput('\n');
          break;
        case 'ShiftLeft':
          // changeShift(btn);
          // updateKeyboard(btns, checkKeyboardType(lang, isShift, isCapsLock));
          break;
        case 'ShiftRight':
          // changeShift(btn);
          // updateKeyboard(btns, checkKeyboardType(lang, isShift, isCapsLock));
          break;
        case 'Space':
          updateInput(' ');
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
          updateInput(btn.textContent);
      }
    }
  }
});

document.addEventListener('keyup', (event) => {
  event.preventDefault();
  for (const btn of btns) {
    btn.classList.remove('keyboard__btn--active');
  }
});
