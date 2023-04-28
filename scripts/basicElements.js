import { lang } from "./lang.js";

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

updateTitles(lang);

export function updateTitles(lang) {
  title.textContent = lang === 'en' ? 'Virtual keyboard' : 'Виртуальная клавиатура';

  subtitle.textContent = lang === 'en'
    ? 'The keyboard was created in the Windows operating system'
    : 'Клавиатура создана в операционной системе Windows';

  info.textContent = lang === 'en'
    ? 'To switch language press: left Shift + Alt'
    :'Для переключения языка комбинация: левые Shift + Alt';
}

// create textarea
export const textArea = document.createElement('textarea');
textArea.classList.add('text');
textArea.rows = 10;
textArea.cols = 150;
textArea.textContent = '';
container.appendChild(textArea);

export function updateInput(curValue) {
  document.querySelector('.text').textContent += curValue;
}
