import { lang } from './lang.js';

export function updateTitles(language, h1, h2, h3) {
  h1.textContent = language === 'en' ? 'Virtual keyboard' : 'Виртуальная клавиатура';

  h2.textContent = language === 'en'
    ? 'The keyboard was created in the Windows operating system'
    : 'Клавиатура создана в операционной системе Windows';

  h3.textContent = language === 'en'
    ? 'To switch language press: left Shift + Alt'
    : 'Для переключения языка комбинация: левые Shift + Alt';
}

export function updateInput(curValue) {
  document.querySelector('.text').textContent += curValue;
}

// create the main container
export const container = document.createElement('main');
container.classList.add('container');
document.body.appendChild(container);

// create and append titles
const title = document.createElement('h1');
const subtitle = document.createElement('p');
subtitle.classList.add('subtitle');
const info = document.createElement('p');
info.classList.add('subtitle');
container.appendChild(title);
container.appendChild(subtitle);
container.appendChild(info);

updateTitles(lang, title, subtitle, info);

// create textarea
export const textArea = document.createElement('textarea');
textArea.classList.add('text');
textArea.rows = 10;
textArea.cols = 150;
textArea.textContent = '';
container.appendChild(textArea);
