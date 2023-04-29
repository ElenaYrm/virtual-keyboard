import {
  keysEn,
  keysEnShift,
  keysRu,
  keysRuShift,
} from './constants.js';

const regExp = /^[a-z а-я]$/i;

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
    if (language === 'en' && this.isShift) {
      this.keys = keysEnShift;
    } else if (language !== 'en' && this.isShift) {
      this.keys = keysRuShift;
    } else if (language !== 'en' && !this.isShift) {
      this.keys = keysRu;
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
              this.changeCapsLk(btn);
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
              this.updateInput(btn.textContent);
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
    const buttons = document.querySelectorAll('.keyboard__btn');
    const key = Object.keys(this.keys);
    const value = Object.values(this.keys);
    for (let i = 0; i < buttons.length; i + 1) {
      buttons[i].dataset.key = key[i];
      buttons[i].textContent = value[i];
    }
  }

  changeCapsLk(element) {
    this.isCapsLk = !this.isCapsLk;
    if (this.isCapsLk) {
      element.classList.add('keyboard__btn--active');
      for (const btn of this.keysButtons) {
        if (regExp.test(btn.textContent)) {
          btn.textContent = btn.textContent.toUpperCase();
        }
      }
    } else {
      element.classList.remove('keyboard__btn--active');
      for (const btn of this.keysButtons) {
        if (regExp.test(btn.textContent)) {
          btn.textContent = btn.textContent.toLowerCase();
        }
      }
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
        btn.addEventListener('click', () => {
          this.changeCapsLk(btn);
        });
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
