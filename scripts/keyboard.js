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
    // support data
    this.isCapsLk = false;
    this.isChangeCapsLk = false;
    this.isLeftShift = false;
    this.isRightShift = false;
    this.isCtrl = false;
    this.count = 0;
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
    if (this.lang === 'en' && !this.isLeftShift && !this.isRightShift) {
      this.keys = keysEn;
    } else if (this.lang === 'en' && (this.isLeftShift || this.isRightShift)) {
      this.keys = keysEnShift;
    } else if (this.lang === 'ru' && !this.isLeftShift && !this.isRightShift) {
      this.keys = keysRu;
    } else if (this.lang === 'ru' && (this.isLeftShift || this.isRightShift)) {
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
        btn.addEventListener('click', (event) => {
          event.preventDefault();
          const posStart = this.input.selectionStart;
          const posEnd = this.input.selectionEnd;
          if (posStart !== 0) {
            const newValue = this.inputValue.slice(0, posEnd - 1) + this.inputValue.slice(posEnd);
            this.updateInput(newValue, true);
          } else if (posStart === 0) {
            return;
          } else if (!document.getSelection().focusNode) {
            this.updateInput(this.inputValue.substring(0, this.inputValue.length - 1), true);
          }
          this.input.focus();
          this.input.setSelectionRange(posEnd - 1, posEnd - 1);
        });
        break;
      case 'Tab':
        this.addClickBtn(btn, '    ', 4);
        break;
      case 'Delete':
        btn.addEventListener('click', (event) => {
          event.preventDefault();
          const posStart = this.input.selectionStart;
          const posEnd = this.input.selectionEnd;
          const newValue = this.inputValue.slice(0, posStart) + this.inputValue.slice(posStart + 1);
          this.updateInput(newValue, true);
          this.input.focus();
          this.input.setSelectionRange(posEnd, posEnd);
        });
        break;
      case 'CapsLock':
        btn.addEventListener('click', (event) => {
          event.preventDefault();
          this.isCapsLk = !this.isCapsLk;
          this.checkCapsLk(btn);
        });
        break;
      case 'Enter':
        this.addClickBtn(btn, '\n', 1);
        break;
      case 'ShiftLeft':
        btn.addEventListener('mousedown', (event) => {
          event.preventDefault();
          if (this.count === 0) {
            this.isLeftShift = true;
            this.changeShift();
            this.count += 1;
          }
          if (this.isCapsLk) {
            this.isCapsLk = false;
            this.isChangeCapsLk = true;
            this.checkCapsLk(btn);
          }
        });
        btn.addEventListener('mouseup', (event) => {
          event.preventDefault();
          this.resetShift(btn);
        });
        break;
      case 'ShiftRight':
        btn.addEventListener('mousedown', (event) => {
          event.preventDefault();
          if (this.count === 0) {
            this.isRightShift = true;
            this.changeShift();
            this.count += 1;
          }
          if (this.isCapsLk) {
            this.isCapsLk = false;
            this.isChangeCapsLk = true;
            this.checkCapsLk(btn);
          }
        });
        btn.addEventListener('mouseup', (event) => {
          event.preventDefault();
          this.resetShift(btn);
        });
        break;
      case 'Space':
        this.addClickBtn(btn, ' ', 1);
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
        this.addClickBtn(btn, btn.textContent, 1);
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
        btn.classList.add('keyboard__btn--active');

        const posStart = this.input.selectionStart;
        const posEnd = this.input.selectionEnd;
        const key = btn.id;
        let newValue;

        switch (key) {
          case 'Backspace':
            this.input.focus();
            if (!document.getSelection().focusNode) {
              this.updateInput(this.inputValue.substring(0, this.inputValue.length - 1), true);
            } else if (posStart !== 0) {
              newValue = this.inputValue.slice(0, posEnd - 1) + this.inputValue.slice(posEnd);
              this.updateInput(newValue, true);
              this.input.setSelectionRange(posEnd - 1, posEnd - 1);
            }
            break;
          case 'Tab':
            this.insertLetter(posStart, 4, '    ');
            break;
          case 'Delete':
            newValue = this.inputValue.slice(0, posStart)
              + this.inputValue.slice(posStart + 1);
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
            if (this.count === 0) {
              this.isLeftShift = true;
              this.changeShift();
              this.count += 1;
            }
            if (this.isCapsLk) {
              this.isCapsLk = false;
              this.isChangeCapsLk = true;
              this.checkCapsLk(btn);
            }
            break;
          case 'ShiftRight':
            if (this.count === 0) {
              this.isRightShift = true;
              this.changeShift();
              this.count += 1;
            }
            if (this.isCapsLk) {
              this.isCapsLk = false;
              this.isChangeCapsLk = true;
              this.checkCapsLk(btn);
            }
            break;
          case 'Space':
            this.insertLetter(posStart, 1, ' ');
            break;
          case 'ControlLeft':
            this.isCtrl = true;
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
            this.resetShift(btn);
            break;
          case 'ShiftRight':
            btn.classList.remove('keyboard__btn--active');
            this.resetShift(btn);
            break;
          case 'ControlLeft':
            btn.classList.remove('keyboard__btn--active');
            this.isCtrl = false;
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
    if (rows.length > 0) {
      rows.forEach((row) => {
        row.remove();
      });
    }

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
        } else if (!this.isCapsLk && this.isChangeCapsLk) {
          element.classList.add('keyboard__btn--active-capsLk');
        }
        break;
      case 'Enter':
        element.classList.add('keyboard__btn--enter');
        break;
      case 'ShiftLeft':
        element.classList.add('keyboard__btn--shift-left');
        if (this.isLeftShift) {
          element.classList.add('keyboard__btn--active');
        }
        break;
      case 'ShiftRight':
        element.classList.add('keyboard__btn--shift-right');
        if (this.isRightShift) {
          element.classList.add('keyboard__btn--active');
        }
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

  addClickBtn(element, text, count) {
    element.addEventListener('click', (event) => {
      event.preventDefault();
      const posEnd = this.input.selectionEnd;
      const newValue = this.inputValue.slice(0, posEnd) + element.textContent
        + this.inputValue.slice(posEnd);
      this.updateInput(newValue, true);
      this.input.focus();
      this.input.setSelectionRange(posEnd + count, posEnd + count);
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
    this.checkKeyboardType();
    this.updateKeyboard();
  }

  resetShift(element) {
    this.isRightShift = false;
    this.isLeftShift = false;
    this.count = 0;
    this.changeShift();

    if (this.isChangeCapsLk) {
      this.isCapsLk = true;
      this.checkCapsLk(element);
      this.isChangeCapsLk = false;
    }
  }

  checkCapsLk(element) {
    if (this.isCapsLk) {
      this.keysButtons.forEach((btn) => {
        if (regExp.test(btn.textContent)) {
          btn.textContent = btn.textContent.toUpperCase();
        }
      });
    } else {
      this.keysButtons.forEach((btn) => {
        if (regExp.test(btn.textContent)) {
          btn.textContent = btn.textContent.toLowerCase();
        }
      });
    }

    if (this.isCapsLk) {
      element.classList.add('keyboard__btn--active-capsLk');
    } else if (!this.isCapsLk && this.isChangeCapsLk) {
      element.classList.add('keyboard__btn--active-capsLk');
    } else {
      element.classList.remove('keyboard__btn--active-capsLk');
    }
  }
}
