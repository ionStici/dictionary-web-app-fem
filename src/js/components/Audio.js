import styles from './../../styles/audio.module.scss';
import { createElement } from '../abstract/utilities';

import { selectAudio, subscribe } from '../store/store';

const AudioComponent = createElement('div', [styles.component]);

// // // // // // // // // // // // // // //

const iconPlay = `<svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75"><g fill="#A445ED" fill-rule="evenodd"><circle cx="37.5" cy="37.5" r="37.5" opacity=".25"/><path d="M29 27v21l21-10.5z"/></g></svg>`;
const section = createElement('section', [styles.section]);
const box = createElement('div', [styles.box]);
const audioBox = createElement('p', [styles.audioBox]);
const word = createElement('h1', [styles.h1]);
const phonetic = createElement('p', [styles.p]);

box.append(word);
box.append(phonetic);
audioBox.innerHTML = iconPlay;
section.append(box);
section.append(audioBox);

// // // // // // // // // // // // // // //

const render = () => {
    const data = selectAudio();
    word.textContent = data.word;
    phonetic.textContent = data.phonetic ? data.phonetic : 'empty';

    const playAudio = () => {
        if (data.audioUrl) {
            new Audio(data.audioUrl).play();
        }
    };

    audioBox.addEventListener('click', playAudio);

    const g = audioBox.firstElementChild.firstElementChild;
    if (!data.audioUrl) g.style.fill = 'hsla(0, 0%, 46%, 1)';
    if (data.audioUrl) g.style.fill = '#A445ED';

    AudioComponent.append(section);
};

subscribe(render);

// // // // // // // // // // // // // // //

export default AudioComponent;
