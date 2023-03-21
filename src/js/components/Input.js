import { createElement } from '../abstract/utilities';
import styles from './../../styles/input.module.scss';

// // // // // // // // // // // // // // //

const Form = createElement('form', [styles.form]);
Form.autocomplete = 'off';
Form.autofill = 'off';

const label = createElement('label', [styles.label], 'Search');
label.for = 'search';

const input = createElement('input', [styles.input]);
input.id = 'search';
input.type = 'text';
input.placeholder = 'Search';

const searchIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path fill="none" stroke="#A445ED" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z"/></svg>`;
const btn = createElement('button', [styles.btn]);
btn.innerHTML = searchIcon;

Form.append(label);
Form.append(input);
Form.append(btn);

// // // // // // // // // // // // // // //

Form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!input.value) return;

    console.log(input.value);
});

// // // // // // // // // // // // // // //

export default Form;
