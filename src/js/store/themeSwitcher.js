const root = document.documentElement;

const circle = document.querySelector('.toggle_circle');

const switchDark = () => {
    root.style.setProperty('--ml-circle', '23px');

    root.style.setProperty('--color-bg', 'hsla(0, 0%, 2%, 1)');
    root.style.setProperty('--color-text', 'hsla(0, 0%, 100%, 1)');
};

const switchLight = () => {
    root.style.setProperty('--ml-circle', '3px');

    root.style.setProperty('--color-bg', 'hsla(0, 0%, 100%, 1)');
    root.style.setProperty('--color-text', 'hsla(0, 0%, 18%, 1)');
};

export { switchDark, switchLight };
