import { createElement, API_URL } from '../abstract/utilities';
import {
    dispatch,
    searchTerm,
    retrieveAudio,
    retrieveData,
    selectSearchTerm,
} from '../store/store';
import styles from './../../styles/input.module.scss';
import Audio from './Audio';
import Data from './Data';

// // // // // // // // // // // // // // //

export const Nodata = createElement('section', [styles.nodata]);
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

Nodata.append(emoji, title, text);

// // // // // // // // // // // // // // //

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

Form.append(label);
Form.append(input);
Form.append(btn);
Form.append(errorText);

// // // // // // // // // // // // // // //

const getData = async function (word) {
    try {
        const res = await fetch(`${API_URL}${word}`);
        if (!res.ok) throw new Error('Non-existent word');

        const raw = await res.json();
        const data = await raw[0];

        const wordText = data.word;
        const phoneticText = data.phonetic;
        const audioUrl = data.phonetics.find(a => a.audio)?.audio;
        const audio = [wordText, phoneticText, audioUrl];

        const source = data.sourceUrls[0];
        const meanings = data.meanings;
        const dataArray = [source, meanings, wordText];

        dispatch(retrieveAudio(audio));
        dispatch(retrieveData(dataArray));

        Audio.hidden = false;
        Data.hidden = false;
        Nodata.hidden = true;
    } catch (error) {
        // console.log(error.message);
        Nodata.hidden = false;
        Audio.hidden = true;
        Data.hidden = true;
    }
};

getData('keyboard');
// getData('dsagfdgfds');

// // // // // // // // // // // // // // //

Form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!input.value) {
        input.style.border = '1px solid var(--color-red)';
        errorText.style.opacity = '1';
        errorText.style.pointerEvents = 'all';

        Audio.hidden = true;
        Data.hidden = true;
        return;
    } else {
        input.style.border = '1px solid transparent';
        errorText.style.opacity = '0';
        errorText.style.pointerEvents = 'none';
        // if (selectSearchTerm() === input.value) return;
    }

    dispatch(searchTerm(input.value));
    getData(input.value);
});

// // // // // // // // // // // // // // //

export default Form;
