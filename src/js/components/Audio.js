import styles from './../../styles/audio.module.scss';
import { createElement } from '../abstract/utilities';
import { selectData, subscribe } from '../store';

// // // // // // // // // // // // // // //
// CREATE AUDIO COMPONENT

const AudioComponent = createElement('div', [styles.component]);

const iconPlay = `<svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75"><g fill="#A445ED" fill-rule="evenodd"><circle cx="37.5" cy="37.5" r="37.5" opacity=".25"/><path d="M29 27v21l21-10.5z"/></g></svg>`;
const section = createElement('section', [styles.section]);
const box = createElement('div', [styles.box]);

const audioBox = createElement('div', [styles.audioBox]);
audioBox.setAttribute('role', 'button');
audioBox.setAttribute('aria-label', 'Play phonetic');

const word = createElement('h1', [styles.h1]);
const phonetic = createElement('p', [styles.p]);

box.append(word, phonetic);
audioBox.innerHTML = iconPlay;
section.append(box, audioBox);

// // // // // // // // // // // // // // //
// RENDER AUDIO COMPONENT

const render = () => {
    const data = selectData();
    const audioUrl = data.audio;

    word.textContent = data.word;
    phonetic.textContent = data.phonetic ? data.phonetic : 'no phonetic data';

    // // // // // // // // // // // // // // //

    const audio = audioUrl ? new Audio(audioUrl) : undefined;
    audioBox.querySelector('audio')?.remove();
    audioBox.append(audio ? audio : '');
    const play = () => audioBox.querySelector('audio').play();
    audioBox.addEventListener('click', play);
    audioBox.addEventListener('keydown', ({ key }) => {
        if (key === 'Enter') play();
        if (key === 'Escape') audioBox.blur();
    });

    // // // // // // // // // // // // // // //

    const g = audioBox.firstElementChild.firstElementChild;

    if (!audioUrl) {
        audioBox.removeAttribute('tabindex');
        g.style.fill = 'hsla(0, 0%, 46%, 1)';
        AudioComponent.classList.remove(styles.active);
        AudioComponent.classList.add(styles.inactive);
    }

    if (audioUrl) {
        audioBox.setAttribute('tabindex', '0');
        g.style.fill = 'hsla(274, 82%, 60%, 1)';
        AudioComponent.classList.remove(styles.inactive);
        AudioComponent.classList.add(styles.active);
    }

    // // // // // // // // // // // // // // //

    AudioComponent.append(section);
};

subscribe(render);

// // // // // // // // // // // // // // //

export default AudioComponent;
