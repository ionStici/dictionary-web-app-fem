import { setProperty } from '../abstract/utilities';

const switchDark = () => {
    setProperty('--left-circle', '23px');
    setProperty('--color-bg', 'hsla(0, 0%, 2%, 1)');
    setProperty('--color-text', 'hsla(0, 0%, 100%, 1)');
    setProperty('--color-toggler', 'hsla(274, 82%, 60%, 1)');
    setProperty('--color-popup-bg', 'hsla(0, 0%, 12%, 1)');
    setProperty('--color-popup-shadow', '0px 5px 30px #A445ED');
    setProperty('--color-input-bg', 'hsla(0, 0%, 12%, 1)');
    setProperty('--color-border', 'hsla(0, 0%, 23%, 1)');
};

const switchLight = () => {
    setProperty('--left-circle', '3px');
    setProperty('--color-bg', 'hsla(0, 0%, 100%, 1)');
    setProperty('--color-text', 'hsla(0, 0%, 18%, 1)');
    setProperty('--color-toggler', 'hsla(0, 0%, 46%, 1)');
    setProperty('--color-popup-bg', 'hsla(0, 0%, 100%, 1)');
    setProperty('--color-popup-shadow', '0px 5px 30px rgba(0, 0, 0, 0.1)');
    setProperty('--color-input-bg', 'hsla(0, 0%, 96%, 1)');
    setProperty('--color-border', 'hsla(0, 0%, 91%, 1)');
};

export { switchDark, switchLight };
