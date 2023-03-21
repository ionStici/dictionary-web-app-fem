const root = document.documentElement;

const circle = document.querySelector('.toggle_circle');

const switchDark = () => {
    root.style.setProperty('--left-circle', '23px');

    root.style.setProperty('--color-bg', 'hsla(0, 0%, 2%, 1)');
    root.style.setProperty('--color-text', 'hsla(0, 0%, 100%, 1)');
    root.style.setProperty('--color-toggler', 'hsla(274, 82%, 60%, 1)');
    root.style.setProperty('--color-popup-bg', 'hsla(0, 0%, 12%, 1)');
    root.style.setProperty('--color-popup-shadow', '0px 5px 30px #A445ED');
};

const switchLight = () => {
    root.style.setProperty('--left-circle', '3px');

    root.style.setProperty('--color-bg', 'hsla(0, 0%, 100%, 1)');
    root.style.setProperty('--color-text', 'hsla(0, 0%, 18%, 1)');
    root.style.setProperty('--color-toggler', 'hsla(0, 0%, 46%, 1)');
    root.style.setProperty('--color-popup-bg', 'hsla(0, 0%, 100%, 1)');
    root.style.setProperty(
        '--color-popup-shadow',
        '0px 5px 30px rgba(0, 0, 0, 0.1)'
    );
};

export { switchDark, switchLight };
