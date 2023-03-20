const root = document.documentElement;

const setSansSerif = () =>
    root.style.setProperty('--font-family-current', 'inter, sans-serif');

const setSerif = () =>
    root.style.setProperty('--font-family-current', 'lora, serif');

const setMono = () =>
    root.style.setProperty('--font-family-current', 'inconsolata, monospace');

export { setSansSerif, setSerif, setMono };
