import { container } from './basicElements.js';
import { initKeyboard } from './keyboard.js';

container.appendChild(initKeyboard());

// const btns = document.querySelectorAll('.keyboard__btn');
//
// document.addEventListener('keydown', (event) => {
//   event.preventDefault();
//   for (const btn of btns) {
//     const key = btn.getAttribute('data-key');
//     if (event.code === key) {
//       btn.classList.add('keyboard__btn--active');
//       updateInput(event.key);
//     }
//     if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
//       updateKeyboard(keysEnShift);
//     }
//   }
//   console.log(event.key);
// });
//
// document.addEventListener('keyup', (event) => {
//   event.preventDefault();
//   for (const btn of btns) {
//     btn.classList.remove('keyboard__btn--active');
//   }
//   if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
//     updateKeyboard(keysEn);
//   }
// });
