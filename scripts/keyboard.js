import {
  keysEn,
  keysEnShift,
  keysRu,
  keysRuShift,
} from './constants.js';

const regExp = /^[a-z а-яё]$/i;

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
    this.isCtrl = false;
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

  checkKeyboardType() {
    if (this.lang === 'en' && !this.isShift) {
      this.keys = keysEn;
    } else if (this.lang === 'en' && this.isShift) {
      this.keys = keysEnShift;
    } else if (this.lang === 'ru' && !this.isShift) {
      this.keys = keysRu;
    } else if (this.lang === 'ru' && this.isShift) {
      this.keys = keysRuShift;
    }
  }

  createTextarea() {
    const textArea = document.createElement('textarea');
    textArea.classList.add('text');
    textArea.rows = 15;
    textArea.cols = 135;
    textArea.textContent = this.inputValue;
    this.input = textArea;

    return this.input;
  }

  createRow() {
    const row = document.createElement('div');
    row.classList.add('keyboard__row');
    this.keysContainer.appendChild(row);
    this.currentRow = row;
  }

  createBtn(key, value) {
    const btn = document.createElement('button');
    btn.textContent = value;
    btn.id = key;
    btn.classList.add('keyboard__btn');
    this.addBtnClass(btn, key);

    // add event listener on click to buttons
    switch (key) {
      case 'Backspace':
        btn.addEventListener('click', () => {
          this.updateInput(this.inputValue.substring(0, this.inputValue.length - 1), true);
        });
        break;
      case 'Tab':
        this.addClickBtn(btn, '    ');
        break;
      case 'Delete':
        break;
      case 'CapsLock':
        btn.addEventListener('click', () => {
          this.isCapsLk = !this.isCapsLk;
          this.checkCapsLk(btn);
        });
        break;
      case 'Enter':
        this.addClickBtn(btn, '\n');
        break;
      case 'ShiftLeft':
        btn.addEventListener('mousedown', () => {
          // this.changeShift();
        });
        btn.addEventListener('mouseup', () => {
          // this.changeShift();
        });
        break;
      case 'ShiftRight':
        btn.addEventListener('mousedown', () => {
          // this.changeShift();
        });
        btn.addEventListener('mouseup', () => {
          // this.changeShift();
        });
        break;
      case 'Space':
        this.addClickBtn(btn, ' ');
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
        this.addClickBtn(btn, btn.textContent);
    }

    return btn;
  }

  init() {
    const keysContainer = document.createElement('div');
    keysContainer.classList.add('keyboard');
    this.keysContainer = keysContainer;

    this.checkKeyboardType();
    this.updateKeyboard();

    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      const btn = document.getElementById(`${event.code}`);
      if (btn) {
        const key = btn.id;
        btn.classList.add('keyboard__btn--active');
        const posStart = this.input.selectionStart;
        const posEnd = this.input.selectionEnd;
        switch (key) {
          case 'Backspace':
            if (!document.getSelection().focusNode) {
              this.updateInput(this.inputValue.substring(0, this.inputValue.length - 1), true);
            } else if (posStart !== 0) {
              const newValue = this.inputValue.slice(0, posEnd - 1) + this.inputValue.slice(posEnd);
              this.updateInput(newValue, true);
              this.input.setSelectionRange(posEnd - 1, posEnd - 1);
            }
            break;
          case 'Tab':
            this.insertLetter(posStart, 4, '    ');
            break;
          case 'Delete':
            const newValue = this.inputValue.slice(0, posStart) + this.inputValue.slice(posStart + 1);
            this.updateInput(newValue, true);
            this.input.setSelectionRange(posStart, posStart);
            break;
          case 'CapsLock':
            this.isCapsLk = !this.isCapsLk;
            this.checkCapsLk(btn);
            break;
          case 'Enter':
            this.insertLetter(posStart, 1, '\n');
            break;
          case 'ShiftLeft':
            // this.changeShift();
            break;
          case 'ShiftRight':
            // this.changeShift();
            break;
          case 'Space':
            this.insertLetter(posStart, 1, ' ');
            break;
          case 'ControlLeft':
            this.isCtrl = !this.isCtrl;
            break;
          case 'ControlRight':
            break;
          case 'AltLeft':
            if (this.isCtrl) {
              this.setLanguage();
              this.checkKeyboardType();
            }
            break;
          case 'AltRight':
            break;
          case 'MetaLeft':
            break;
          default:
            this.insertLetter(posStart, 1, btn.textContent);
        }
      }
    });

    document.addEventListener('keyup', (event) => {
      event.preventDefault();
      const btn = document.getElementById(`${event.code}`);
      if (btn) {
        const key = btn.id;
        switch (key) {
          case 'ShiftLeft':
            btn.classList.remove('keyboard__btn--active');
            // this.changeShift();
            break;
          case 'ShiftRight':
            btn.classList.remove('keyboard__btn--active');
            // this.changeShift();
            break;
          case 'ControlLeft':
            btn.classList.remove('keyboard__btn--active');
            this.isCtrl = !this.isCtrl;
            this.updateKeyboard();
            this.checkCapsLk(btn);
            break;
          default:
            btn.classList.remove('keyboard__btn--active');
        }
      }
    });

    return this.keysContainer;
  }

  updateKeyboard() {
    const rows = document.querySelectorAll('.keyboard__row');
    // if (rows.length > 0) {
      rows.forEach((row) => {
        row.remove();
      });
    // }

    this.createRow();

    const items = Object.entries(this.keys);
    items.forEach(([key, value]) => {
      const btn = this.createBtn(key, value);
      this.currentRow.appendChild(btn);
      this.keysButtons.push(btn);
      if (key === 'Backspace' || key === 'Delete' || key === 'Enter' || key === 'ShiftRight') {
        this.createRow();
      }
    });
  }

  // support functions
  addBtnClass(element, key) {
    switch (key) {
      case 'Backspace':
        element.classList.add('keyboard__btn--backspace');
        break;
      case 'Tab':
        element.classList.add('keyboard__btn--tab');
        break;
      case 'Delete':
        element.classList.add('keyboard__btn--delete');
        break;
      case 'CapsLock':
        element.classList.add('keyboard__btn--capsLk');
        if (this.isCapsLk) {
          element.classList.add('keyboard__btn--active-capsLk');
        }
        break;
      case 'Enter':
        element.classList.add('keyboard__btn--enter');
        break;
      case 'ShiftLeft':
        element.classList.add('keyboard__btn--shift-left');
        break;
      case 'ShiftRight':
        element.classList.add('keyboard__btn--shift-right');
        break;
      case 'Space':
        element.classList.add('keyboard__btn--space');
        break;
      case 'ControlLeft':
        element.classList.add('keyboard__btn--control');
        break;
      case 'ControlRight':
        element.classList.add('keyboard__btn--control');
        break;
      case 'AltLeft':
        element.classList.add('keyboard__btn--control');
        break;
      case 'AltRight':
        element.classList.add('keyboard__btn--control');
        break;
      case 'MetaLeft':
        element.classList.add('keyboard__btn--control');
        break;
      case 'ArrowUp':
        element.classList.add('keyboard__btn--arrow');
        break;
      case 'ArrowDown':
        element.classList.add('keyboard__btn--arrow');
        break;
      case 'ArrowLeft':
        element.classList.add('keyboard__btn--arrow');
        break;
      case 'ArrowRight':
        element.classList.add('keyboard__btn--arrow');
        break;
      default:
        break;
    }
  }

  addClickBtn(element, text) {
    element.addEventListener('click', () => {
      this.updateInput(text, false);
    });
  }

  updateInput(value, isDelete) {
    if (isDelete) {
      this.inputValue = value;
    } else {
      this.inputValue += value;
    }
    this.input.textContent = this.inputValue;
  }

  insertLetter(start, count, text) {
    const newValue = this.inputValue.slice(0, start) + text + this.inputValue.slice(start);
    this.updateInput(newValue, true);
    this.input.setSelectionRange(start + count, start + count);
  }

  changeShift() {
    this.isShift = !this.isShift;
    this.checkKeyboardType();
    this.updateKeyboard();
  }

  changeCtrl() {
    this.isCtrl = !this.isCtrl;
  }

  checkCapsLk(element) {
    if (this.isCapsLk) {
      element.classList.add('keyboard__btn--active-capsLk');
      this.keysButtons.forEach((btn) => {
        if (regExp.test(btn.textContent)) {
          btn.textContent = btn.textContent.toUpperCase();
        }
      });
    } else {
      element.classList.remove('keyboard__btn--active-capsLk');
      this.keysButtons.forEach((btn) => {
        if (regExp.test(btn.textContent)) {
          btn.textContent = btn.textContent.toLowerCase();
        }
      });
    }
  }
}
