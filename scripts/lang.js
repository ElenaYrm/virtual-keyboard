import { updateTitles } from './basicElements.js';

// check saved language and set default language
export let lang = localStorage.getItem('lang');
if (!lang) {
  localStorage.setItem('lang', 'en');
  lang = 'en';
}

// update language in local storage and update titles
export function updateLanguage() {
  if (lang === 'en') {
    localStorage.setItem('lang', 'ru');
  } else {
    localStorage.setItem('lang', 'en');
  }
  lang = localStorage.getItem('lang');
  updateTitles(lang);
}
