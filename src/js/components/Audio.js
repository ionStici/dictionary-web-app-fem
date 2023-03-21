import styles from './../../styles/audio.module.scss';
import { createElement, setProperty } from '../abstract/utilities';
import { selectAudio, subscribe } from '../store/store';

const AudioComponent = createElement('div', [styles.component]);

// // // // // // // // // // // // // // //

const iconPlay = `<svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75"><g fill="#A445ED" fill-rule="evenodd"><circle cx="37.5" cy="37.5" r="37.5" opacity=".25"/><path d="M29 27v21l21-10.5z"/></g></svg>`;
const section = createElement('section', [styles.section]);
const box = createElement('div', [styles.box]);
const audioBox = createElement('div', [styles.audioBox]);
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

    if (data.word) {
        word.textContent = data.word;
        phonetic.textContent = data.phonetic ? data.phonetic : 'no data';

        const audio = data.audioUrl ? new Audio(data.audioUrl) : undefined;

        audioBox.querySelector('audio')?.remove();
        audioBox.append(audio ? audio : '');
        const play = () => audioBox.querySelector('audio').play();
        audioBox.addEventListener('click', play);
        audioBox.addEventListener('keydown', ({ key }) => {
            if (key === 'Enter') play();
            if (key === 'Escape') audioBox.blur();
        });

        const g = audioBox.firstElementChild.firstElementChild;

        if (!data.audioUrl) {
            audioBox.setAttribute('tabindex', '-1');
            g.style.fill = 'hsla(0, 0%, 46%, 1)';
            setProperty('--opacity-play', '0.25');
            setProperty('--color-play-white', 'hsla(0, 0%, 46%, 1)');
            setProperty('--color-play-purple', 'hsla(0, 0%, 46%, 1)');
        }

        if (data.audioUrl) {
            audioBox.setAttribute('tabindex', '0');
            g.style.fill = 'hsla(274, 82%, 60%, 1)';
            setProperty('--opacity-play', '1');
            setProperty('--color-play-white', 'hsla(0, 0%, 100%, 1)');
            setProperty('--color-play-purple', 'hsla(274, 82%, 60%, 1)');
        }

        AudioComponent.append(section);
    }
};

subscribe(render);

// // // // // // // // // // // // // // //

export default AudioComponent;
