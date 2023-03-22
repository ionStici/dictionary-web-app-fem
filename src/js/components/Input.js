import styles from './../../styles/input.module.scss';
import { createElement, API_URL } from '../abstract/utilities';
import { dispatch, retrieveAudio, retrieveData } from '../store/store';
import { searchTerm, selectSearchTerm } from '../store/store';
import Audio from './Audio';
import Data from './Data';

// // // // // // // // // // // // // // //
// CREATE UI ERROR MESSAGE COMPONENT

const NoData = createElement('section', [styles.nodata]);
const emoji = createElement('p', [styles.nodata__emoji], '😕');
const title = createElement(
    'h2',
    [styles.nodata__title],
    'No Definitions Found'
);
const text = createElement(
    'p',
    [styles.nodata__text],
    "Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead."
);

NoData.append(emoji, title, text);
NoData.hidden = true;
export { NoData };

// // // // // // // // // // // // // // //
// CREATE FORM COMPONENT

const Form = createElement('form', [styles.form]);
Form.autocomplete = 'off';
Form.autofill = 'off';

const label = createElement('label', [styles.label], 'Search');
label.for = 'search';

const errorText = createElement(
    'p',
    [styles.emptyMessage],
    "Whoops, can't be empty..."
);

const input = createElement('input', [styles.input]);
input.id = 'search';
input.type = 'text';
input.placeholder = 'Search for any word...';

const searchIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path fill="none" stroke="#A445ED" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z"/></svg>`;
const btn = createElement('button', [styles.btn]);
btn.innerHTML = searchIcon;

Form.append(label, input, btn, errorText);

// // // // // // // // // // // // // // //
// API CALL

const getData = async function (word) {
    try {
        const res = await fetch(`${API_URL}${word}`);
        if (!res.ok) throw new Error('Non-existent word');

        const raw = await res.json();
        const data = await raw[0];

        const wordText = data.word;
        const phoneticText = data.phonetic;
        const audioUrl = data.phonetics.find(a => a.audio)?.audio;
        const sourceUrl = data.sourceUrls[0];
        const meanings = data.meanings;

        dispatch(retrieveAudio([wordText, phoneticText, audioUrl]));
        dispatch(retrieveData([sourceUrl, meanings, wordText]));

        NoData.hidden = true;
        NoData.style.opacity = '0';

        [Audio, Data].forEach(c => {
            c.hidden = false;
            setTimeout(() => (c.style.opacity = '1'), 1);
        });
    } catch (error) {
        NoData.hidden = false;
        setTimeout(() => (NoData.style.opacity = '1'), 1);

        [Audio, Data].forEach(c => {
            c.hidden = true;
            c.style.opacity = '0';
        });
    }
};

getData('keyboard');

// // // // // // // // // // // // // // //
// INPUT SEARCH

Form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (selectSearchTerm() === input.value && selectSearchTerm() !== '') return;

    [Audio, Data].forEach(c => {
        c.hidden = true;
        c.style.opacity = '0';
    });

    if (!input.value) {
        input.style.border = '1px solid var(--color-red)';
        errorText.style.opacity = '1';
        errorText.style.pointerEvents = 'all';
        dispatch(searchTerm());
        return;
    } else {
        input.style.border = '1px solid transparent';
        errorText.style.opacity = '0';
        errorText.style.pointerEvents = 'none';
    }

    dispatch(searchTerm(input.value));
    getData(input.value);
});

// // // // // // // // // // // // // // //

export default Form;
