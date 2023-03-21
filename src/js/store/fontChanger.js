import { setProperty } from '../abstract/utilities';

const setSansSerif = () =>
    setProperty('--font-family-current', 'inter, sans-serif');

const setSerif = () => setProperty('--font-family-current', 'lora, serif');

const setMono = () =>
    setProperty('--font-family-current', 'inconsolata, monospace');

export { setSansSerif, setSerif, setMono };
