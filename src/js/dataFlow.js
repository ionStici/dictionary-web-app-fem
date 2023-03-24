import Form from './components/Input';
import { input } from './components/Input';
import { API_URL } from './abstract/utilities';
import { dispatch } from './store';
import { retrieveAudio, retrieveData } from './store';

// // // // // // // // // // // // // // //
// API CALL

const renderData = async function (word) {
    try {
        const response = await fetch(`${API_URL}${word}`);
        if (!response.ok) throw new Error('No Definitions Found');

        const raw = await response.json();
        const data = await raw[0];

        const wordText = data.word;
        const phoneticText = data.phonetic;
        const audioUrl = data.phonetics.find(a => a.audio)?.audio;
        const sourceUrl = data.sourceUrls[0];
        const meanings = data.meanings;

        dispatch(retrieveAudio([wordText, phoneticText, audioUrl]));
        dispatch(retrieveData([sourceUrl, meanings, wordText]));
    } catch (error) {
        //
    }
};

renderData('keyboard');

// // // // // // // // // // // // // // //
// INPUT SEARCH
/*
Form.addEventListener('submit', function (event) {
    event.preventDefault();
    const word = input.value;

    //     if (selectSearchTerm() === input.value && selectSearchTerm() !== '') return;

    //     // [Audio, Data].forEach(c => {
    //     //     c.hidden = true;
    //     //     c.style.opacity = '0';
    //     // });

    if (!word) {
        //         input.classList.add(styles.input__border_red);
        //         errorText.style.opacity = '1';
        //         errorText.style.pointerEvents = 'all';
        //         dispatch(searchTerm(''));

        return;
    }

    if (word) {
        //         input.classList.remove(styles.input__border_red);
        //         errorText.style.opacity = '0';
        //         errorText.style.pointerEvents = 'none';
    }

    renderData(word);
    // dispatch(searchTerm(word));
    input.blur();
});
*/

Form.addEventListener('submit', function (event) {
    event.preventDefault();
    const word = input.value;

    const url = new URL(window.location.href);
    console.log(url);
});

// // // // // // // // // // // // // // //

const logoClick = function () {};

// // // // // // // // // // // // // // //

export { renderData, logoClick };
