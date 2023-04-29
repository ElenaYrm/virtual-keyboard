import { container } from './basicElements.js';
import { Keyboard } from "./keyboard.js";

const keyboard = new Keyboard();
container.appendChild(keyboard.init());
