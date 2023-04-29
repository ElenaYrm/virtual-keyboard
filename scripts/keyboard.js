import {
  keysEn,
  keysEnShift,
  keysRu,
  keysRuShift,
} from './constants.js';

export default class Keyboard {
  constructor() {
    this.lang = 'en';
    this.inputValue = '';
    this.input = null;
    // object of value to keyboard buttons
    this.keys = keysEn;
    // keyboard container
    this.keysContainer = null;
    this.currentRow = null;
    // array of node of keyboard buttons
    this.keysButtons = [];
    this.isCapsLk = false;
    this.isShift = false;
  }

  initLanguage() {
    if (!localStorage.getItem('lang')) {
      localStorage.setItem('lang', 'en');
    }
    this.lang = localStorage.getItem('lang');
  }

  setLanguage() {
    if (this.lang === 'en') {
      localStorage.setItem('lang', 'ru');
    } else {
      localStorage.setItem('lang', 'en');
    }
    this.lang = localStorage.getItem('lang');
  }

  checkKeyboardType(language) {
    const regExp = /^[a-z а-я]$/i;
    if (language === 'en' && this.isShift) {
      this.keys = keysEnShift;
    } else if (language !== 'en' && this.isShift) {
      this.keys = keysRuShift;
    } else if (language !== 'en' && !this.isShift) {
      this.keys = keysRu;
    }
    if (this.isCapsLk && !this.isShift) {
      const newKeys = { ...this.keys };
      const items = Object.entries(newKeys);
      for (const [key, value] of items) {
        if (regExp.test(value)) {
          newKeys[key] = newKeys[key].toUpperCase();
        }
      }
      this.keys = newKeys;
    } else if (!this.isCapsLk && !this.isShift) {
      const newKeys = { ...this.keys };
      const items = Object.entries(newKeys);
      for (const [key, value] of items) {
        if (regExp.test(value)) {
          newKeys[key] = newKeys[key].toLowerCase();
        }
      }
      this.keys = newKeys;
    }
  }

  init() {
    const keysContainer = document.createElement('div');
    keysContainer.classList.add('keyboard');
    this.keysContainer = keysContainer;

    this.checkKeyboardType(this.lang);
    this.createRow();

    const items = Object.entries(this.keys);
    for (const [key, value] of items) {
      const btn = this.createBtn(key, value);
      this.currentRow.appendChild(btn);
      this.keysButtons.push(btn);
      if (key === 'Backspace' || key === 'Delete' || key === 'Enter' || key === 'ShiftRight') {
        this.createRow();
      }
    }

    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      for (const btn of this.keysButtons) {
        const key = btn.getAttribute('data-key');
        if (event.code === key) {
          btn.classList.add('keyboard__btn--active');
          switch (key) {
            case 'Backspace':
              btn.classList.add('keyboard__btn--backspace');
              this.updateInput(this.inputValue.substring(0, this.inputValue.length - 1), true);
              break;
            case 'Tab':
              btn.classList.add('keyboard__btn--tab');
              this.updateInput('\t');
              break;
            case 'Delete':
              console.log('delete');
              break;
            case 'CapsLock':
              btn.classList.add('keyboard__btn--capsLk');
              // item.addEventListener('click', () => {
              //   changeCapsLk(item);
              //   updateKeyboard(btns, checkKeyboardType(lang, isShift, isCapsLock));
              // });
              break;
            case 'Enter':
              btn.classList.add('keyboard__btn--enter');
              this.updateInput('\n');
              break;
            case 'ShiftLeft':
              btn.classList.add('keyboard__btn--shift');
              // item.addEventListener('click', () => {
              //   changeShift(item);
              //   updateKeyboard(btns, checkKeyboardType(lang, isShift, isCapsLock));
              // });
              break;
            case 'ShiftRight':
              btn.classList.add('keyboard__btn--shift');
              // item.addEventListener('click', () => {
              //   changeShift(item);
              //   updateKeyboard(btns, checkKeyboardType(lang, isShift, isCapsLock));
              // });
              break;
            case 'Space':
              btn.classList.add('keyboard__btn--space');
              this.updateInput(' ');
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
              this.updateInput(event.key);
          }
        }
      }
    });

    document.addEventListener('keyup', (event) => {
      event.preventDefault();
      for (const btn of this.keysButtons) {
        btn.classList.remove('keyboard__btn--active');
      }
    });

    return this.keysContainer;
  }

  updateKeyboard() {

  }

  changeCapsLk(element) {
    this.isCapsLk = !this.isCapsLk;
    if (this.isCapsLk) {
      element.classList.add('keyboard__btn--active');
    } else {
      element.classList.remove('keyboard__btn--active');
    }
  }

  changeShift(element) {
    this.isShift = !this.isShift;
    if (this.isShift) {
      element.classList.add('keyboard__btn--active');
    } else {
      element.classList.remove('keyboard__btn--active');
    }
  }

  createTextarea() {
    const textArea = document.createElement('textarea');
    textArea.classList.add('text');
    textArea.rows = 10;
    textArea.cols = 150;
    textArea.textContent = this.inputValue;
    this.input = textArea;

    return this.input;
  }

  updateInput(value, isDelete = false) {
    if (isDelete) {
      this.inputValue = value;
    } else {
      this.inputValue += value;
    }
    this.input.textContent = this.inputValue;
  }

  createBtn(key, value) {
    const btn = document.createElement('button');
    btn.textContent = value;
    btn.dataset.key = key;
    btn.classList.add('keyboard__btn');

    switch (key) {
      case 'Backspace':
        btn.classList.add('keyboard__btn--backspace');
        btn.addEventListener('click', () => {
          this.updateInput(this.inputValue.substring(0, this.inputValue.length - 1), true);
        });
        break;
      case 'Tab':
        btn.classList.add('keyboard__btn--tab');
        btn.addEventListener('click', () => {
          this.updateInput('\t');
        });
        break;
      case 'Delete':
        console.log('delete');
        break;
      case 'CapsLock':
        btn.classList.add('keyboard__btn--capsLk');
        // item.addEventListener('click', () => {
        //   changeCapsLk(item);
        //   updateKeyboard(btns, checkKeyboardType(lang, isShift, isCapsLock));
        // });
        break;
      case 'Enter':
        btn.classList.add('keyboard__btn--enter');
        btn.addEventListener('click', () => {
          this.updateInput('\n');
        });
        break;
      case 'ShiftLeft':
        btn.classList.add('keyboard__btn--shift');
        // item.addEventListener('click', () => {
        //   changeShift(item);
        //   updateKeyboard(btns, checkKeyboardType(lang, isShift, isCapsLock));
        // });
        break;
      case 'ShiftRight':
        btn.classList.add('keyboard__btn--shift');
        // item.addEventListener('click', () => {
        //   changeShift(item);
        //   updateKeyboard(btns, checkKeyboardType(lang, isShift, isCapsLock));
        // });
        break;
      case 'Space':
        btn.classList.add('keyboard__btn--space');
        btn.addEventListener('click', () => {
          this.updateInput(' ');
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
        btn.addEventListener('click', () => {
          this.updateInput(btn.textContent);
        });
    }

    return btn;
  }

  createRow() {
    const row = document.createElement('div');
    row.classList.add('keyboard__row');
    this.keysContainer.appendChild(row);
    this.currentRow = row;
  }
}

// const regExp = /^[a-z а-я]$/i;
// let isCapsLock = false;
// let isShift = false;
// export const btns = [];
//
// export function changeCapsLk(element) {
//   isCapsLock = !isCapsLock;
//   if (isCapsLock) {
//     element.classList.add('keyboard__btn--active');
//   } else {
//     element.classList.remove('keyboard__btn--active');
//   }
// }
// export function changeShift(element) {
//   isShift = !isShift;
//   if (isShift) {
//     element.classList.add('keyboard__btn--active');
//   } else {
//     element.classList.remove('keyboard__btn--active');
//   }
// }
// export function checkKeyboardType(language, shift, capsLk) {
//   let keyboard = keysEn;
//   if (language === 'en' && shift) {
//     keyboard = keysEnShift;
//   } else if (language !== 'en' && shift) {
//     keyboard = keysRuShift;
//   } else if (language !== 'en' && !shift) {
//     keyboard = keysRu;
//   }
//   if (capsLk && !shift) {
//     const items = Object.entries(keyboard);
//     for (const [key, value] of items) {
//       if (regExp.test(value)) {
//         keyboard[key] = keyboard[key].toUpperCase();
//       }
//     }
//   } else if (!capsLk && !shift) {
//     const items = Object.entries(keyboard);
//     for (const [key, value] of items) {
//       if (regExp.test(value)) {
//         keyboard[key] = keyboard[key].toLowerCase();
//       }
//     }
//   }
//
//   return keyboard;
// }
// export function updateKeyboard(btnArray, keys) {
//   const keyItems = Object.keys(keys);
//   const valueItems = Object.values(keys);
//   for (let i = 0; i < btnArray.length; i + 1) {
//     btnArray[i].dataset.key = keyItems[i];
//     btnArray[i].textContent = valueItems[i];
//   }
// }
// function createBtn(key, value) {
//   const item = document.createElement('button');
//   item.textContent = value;
//   item.dataset.key = key;
//   item.classList.add('keyboard__btn');
//
//   switch (key) {
//     case 'Backspace':
//       item.classList.add('keyboard__btn--backspace');
//       item.addEventListener('click', () => {
//         textArea.textContent = textArea.textContent.substring(0, textArea.textContent.length - 1);
//       });
//       break;
//     case 'Tab':
//       item.classList.add('keyboard__btn--tab');
//       item.addEventListener('click', () => {
//         updateInput('\t');
//       });
//       break;
//     case 'Delete':
//       console.log('delete');
//       break;
//     case 'CapsLock':
//       item.classList.add('keyboard__btn--capsLk');
//       item.addEventListener('click', () => {
//         changeCapsLk(item);
//         updateKeyboard(btns, checkKeyboardType(lang, isShift, isCapsLock));
//       });
//       break;
//     case 'Enter':
//       item.classList.add('keyboard__btn--enter');
//       item.addEventListener('click', () => {
//         updateInput('\n');
//       });
//       break;
//     case 'ShiftLeft':
//       item.classList.add('keyboard__btn--shift');
//       item.addEventListener('click', () => {
//         changeShift(item);
//         updateKeyboard(btns, checkKeyboardType(lang, isShift, isCapsLock));
//       });
//       break;
//     case 'ShiftRight':
//       item.classList.add('keyboard__btn--shift');
//       item.addEventListener('click', () => {
//         changeShift(item);
//         updateKeyboard(btns, checkKeyboardType(lang, isShift, isCapsLock));
//       });
//       break;
//     case 'Space':
//       item.classList.add('keyboard__btn--space');
//       item.addEventListener('click', () => {
//         updateInput(' ');
//       });
//       break;
//     case 'ControlLeft':
//       break;
//     case 'ControlRight':
//       break;
//     case 'AltLeft':
//       break;
//     case 'AltRight':
//       break;
//     case 'MetaLeft':
//       break;
//     default:
//       item.addEventListener('click', () => {
//         updateInput(item.textContent);
//       });
//   }
//
//   return item;
// }
// function createRow() {
//   const row = document.createElement('div');
//   row.classList.add('keyboard__row');
//   return row;
// }
//
// export function initKeyboard() {
//   const keysContainer = document.createElement('div');
//   keysContainer.classList.add('keyboard');
//
//   const keyboard = checkKeyboardType(lang, isShift, isCapsLock);
//   let row = createRow();
//   keysContainer.appendChild(row);
//   for (const [key, value] of Object.entries(keyboard)) {
//     const btn = createBtn(key, value);
//     row.appendChild(btn);
//     btns.push(btn);
//     if (key === 'Backspace' || key === 'Delete' || key === 'Enter' || key === 'ShiftRight') {
//       row = createRow();
//       keysContainer.appendChild(row);
//     }
//   }
//
//   return keysContainer;
// }
