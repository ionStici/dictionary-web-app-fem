import App from './src/js/app';
import { subscribe } from './src/js/store/store';

const render = () => document.querySelector('#app').append(App);
render();
subscribe(render);
