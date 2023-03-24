import inputStyles from './../styles/input.module.scss';

import Form from './components/Input';
import { input, redText } from './components/Input';

import { API_URL } from './abstract/utilities';
import { dispatch } from './store';
import { retrieveData } from './store';

import Message from './components/Message';
import { setNoDefMessage, setWelcomeMessage } from './components/Message';

// // // // // // // // // // // // // // //
// API CALL

const renderData = async function (word) {
    try {
        const response = await fetch(`${API_URL}${word}`);
        if (!response.ok) throw new Error('No Definitions Found');

        const raw = await response.json();
        const data = await raw[0];

        dispatch(
            retrieveData({
                word: data.word,
                phonetic: data.phonetic,
                audio: data.phonetics.find(a => a.audio)?.audio,
                source: data.sourceUrls[0],
                meanings: data.meanings,
            })
        );
    } catch (error) {
        //
    }
};

renderData('keyboard');
// renderData('das');

// // // // // // // // // // // // // // //

const setRed = () => {
    input.classList.add(inputStyles.input__border_red);
    redText.classList.remove(inputStyles.hide_redText);
};

const removeRed = () => {
    input.classList.remove(inputStyles.input__border_red);
    redText.classList.add(inputStyles.hide_redText);
};

// // // // // // // // // // // // // // //
// INPUT SEARCH

const submit = function (event) {
    event.preventDefault();
    const word = input.value;

    renderData(word);

    input.blur();
};

Form.addEventListener('submit', submit);

// // // // // // // // // // // // // // //

const logoClick = function () {};

// // // // // // // // // // // // // // //

export { renderData, logoClick };

// const wordText = data.word;
// const phoneticText = data.phonetic;
// const audioUrl = data.phonetics.find(a => a.audio)?.audio;
// const sourceUrl = data.sourceUrls[0];
// const meanings = data.meanings;

// dispatch(retrieveAudio([wordText, phoneticText, audioUrl]));
// dispatch(retrieveData([sourceUrl, meanings, wordText]));
