import Keyboard from './keyboard.js';

// export function updateTitles(language, h1, h2, h3) {
//   h1.textContent = language === 'en' ? 'Virtual keyboard' : 'Виртуальная клавиатура';
//
//   h2.textContent = language === 'en'
//     ? 'The keyboard was created in the Windows operating system'
//     : 'Клавиатура создана в операционной системе Windows';
//
//   h3.textContent = language === 'en'
//     ? 'To switch language press: left Shift + Alt'
//     : 'Для переключения языка комбинация: левые Shift + Alt';
// }

// create the main container
export const container = document.createElement('main');
container.classList.add('container');
document.body.appendChild(container);

// create and append titles
const title = document.createElement('h1');
title.textContent = 'Виртуальная клавиатура';
const subtitle = document.createElement('p');
subtitle.classList.add('subtitle');
subtitle.textContent = 'Клавиатура создана в операционной системе Windows';
const info = document.createElement('p');
info.classList.add('subtitle');
info.textContent = 'Для переключения языка комбинация: левые Shift + Alt';

container.appendChild(title);
container.appendChild(subtitle);
container.appendChild(info);

// create and append textarea and keyboard
const keyboard = new Keyboard();
keyboard.initLanguage();
container.appendChild(keyboard.createTextarea());
container.appendChild(keyboard.init());
