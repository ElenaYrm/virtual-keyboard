import Keyboard from './keyboard.js';

// create the main container
export const container = document.createElement('main');
container.classList.add('container');
document.body.appendChild(container);

// create and append titles
const title = document.createElement('h1');
title.classList.add('title');
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
