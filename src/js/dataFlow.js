import inputStyles from './../styles/input.module.scss';
import messageStyles from './../styles/message.module.scss';

import Form from './components/Input';
import { input, redText } from './components/Input';

import { API_URL } from './abstract/utilities';
import { dispatch, selectData, retrieveData } from './store';

import Message from './components/Message';
import Data from './components/Data';
import Audio from './components/Audio';

import { setNoDefMessage, setWelcomeMessage } from './components/Message';

// // // // // // // // // // // // // // //
// UTILITIES

const setRed = () => {
    input.classList.add(inputStyles.input__border_red);
    redText.classList.remove(inputStyles.hide_redText);
};

const removeRed = () => {
    input.classList.remove(inputStyles.input__border_red);
    redText.classList.add(inputStyles.hide_redText);
};

const hideData = () => {
    [Audio, Data].forEach(c => {
        c.hidden = true;
        c.classList.add('opacity_0');
    });
};

const showData = () => {
    [Audio, Data].forEach(c => {
        c.hidden = false;
        setTimeout(() => c.classList.remove('opacity_0'), 1);
    });
};

const hideMessage = () => {
    Message.hidden = true;
    Message.classList.add('opacity_0');
};

const showMessage = () => {
    Message.hidden = false;
    setTimeout(() => Message.classList.remove('opacity_0'), 1);
};

// // // // // // // // // // // // // // //
// API CALL

const renderData = async function (word) {
    // if (selectData().word === word) return;

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

        hideData();
        hideMessage();
        setTimeout(() => showData(), 1);
    } catch (error) {
        hideData();
        setNoDefMessage();
        showMessage();
    }
};

renderData('keyboard');

// // // // // // // // // // // // // // //
// INPUT SEARCH

const submit = function (event) {
    event.preventDefault();
    const word = input.value;

    if (!word) {
        setRed();
        hideData();
        setNoDefMessage();
        showMessage();
        return;
    }

    if (word) {
        removeRed();
    }

    renderData(word);
    input.blur();
};

Form.addEventListener('submit', submit);

// // // // // // // // // // // // // // //

Data.addEventListener('click', function (e) {
    if (e.target.classList.contains('word')) {
        const word = e.target.textContent.replace(/[^a-zA-Z ]/g, '');
        renderData(word);
    }
});

// // // // // // // // // // // // // // //

const logoClick = function () {
    setWelcomeMessage();
    hideData();
    showMessage();
};

// // // // // // // // // // // // // // //

export { logoClick };

// // // // // // // // // // // // // // //
