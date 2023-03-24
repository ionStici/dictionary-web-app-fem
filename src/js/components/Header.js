import styles from './../../styles/header.module.scss';
import logoImg from './../../assets/images/logo.svg';
import arrowImg from './../../assets/images/icon-arrow-down.svg';
import { createElement, setSrcAlt } from '../abstract/utilities';
import { logoClick } from '../dataFlow';

// // // // // // // // // // // // // // //
// CREATE HEADER ELEMENTS

const body = document.body;
const moonIcon = `<svg class="${styles.moonIcon}" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><path fill="none" stroke="#838383" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"/></svg>`;

const Header = createElement('header', [styles.header]);
const box = createElement('div', [styles.box]);

const logo = createElement('img', [styles.logo]);
setSrcAlt(logo, logoImg, 'Logo');
logo.setAttribute('tabindex', '0');

Header.append(logo, box);

// // // // // // // // // // // // // // //
// EVENT: LOGO CLICK

logo.addEventListener('click', logoClick);
logo.addEventListener('keydown', e => (e.key === 'Enter' ? logoClick() : ''));

// // // // // // // // // // // // // // //
// CREATE FONTS DROPDOWN ELEMENTS

const dropdown = createElement('div', [styles.dd]);
dropdown.dataset.nav = 'close';
dropdown.setAttribute('role', 'button');
dropdown.setAttribute('aria-label', 'Open dropdown fonts bar');
dropdown.setAttribute('tabindex', '0');

const title = createElement('p', [styles.dd__title], 'Sans Serif');

const arrow = createElement('img', [styles.dd__icon]);
setSrcAlt(arrow, arrowImg);

const list = createElement('ul', [styles.dd__ul, styles.op_0]);
setTimeout(() => list.classList.add(styles.d_none), 100);

const items = ['Sans Serif', 'Serif', 'Mono'].map(text => {
    const item = createElement('li', [styles.dd__li], text);
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', 'Change overall font family');
    item.setAttribute('tabindex', '0');
    list.append(item);
    return item;
});

dropdown.append(title, list, arrow);

// // // // // // // // // // // // // // //
// CREATE THEME TOGGLER ELEMENTS

const toggle = createElement('div', [styles.themeToggler]);
toggle.setAttribute('role', 'button');
toggle.setAttribute('aria-label', 'Switch Theme');
toggle.setAttribute('tabindex', '0');

const toggler = createElement('div', [styles.toggler]);
const circle = createElement('div', [styles.circle]);
toggler.append(circle);

const iconBox = createElement('div', [styles.iconBox]);
iconBox.innerHTML = moonIcon;

toggle.append(toggler, iconBox);
box.append(dropdown, toggle);

// // // // // // // // // // // // // // //
// EVENT: TOGGLE THEME

const lightTheme = 'toggle_light_theme';
const darkTheme = 'toggle_dark_theme';
body.classList.add(lightTheme);

const toggleTheme = () => {
    if (body.classList.contains(lightTheme)) {
        body.classList.remove(lightTheme);
        body.classList.add(darkTheme);
        return;
    }

    if (body.classList.contains(darkTheme)) {
        body.classList.remove(darkTheme);
        body.classList.add(lightTheme);
        return;
    }
};

toggle.addEventListener('click', toggleTheme);
toggle.addEventListener('keydown', e => {
    e.key === 'Enter' ? toggleTheme() : undefined;
    e.key === 'Escape' ? toggle.blur() : undefined;
});

// // // // // // // // // // // // // // //
// EVENT: OPEN DROPDOWN (FONTS)

const dropdownEvent = function () {
    if (dropdown.dataset.nav === 'close') {
        dropdown.dataset.nav = 'open';
        list.classList.remove(styles.d_none);
        setTimeout(() => list.classList.remove(styles.op_0), 1);
        return;
    }

    if (dropdown.dataset.nav === 'open') {
        dropdown.dataset.nav = 'close';
        list.classList.add(styles.op_0);
        setTimeout(() => list.classList.add(styles.d_none), 125);
        return;
    }
};

dropdown.addEventListener('click', dropdownEvent);
dropdown.addEventListener('keydown', ({ key, target }) => {
    if (key === 'Enter' && target === dropdown) dropdownEvent();
    if (key === 'Escape' && target === dropdown) dropdownEvent();
});

// // // // // // // // // // // // // // //
// EVENT: CHANGE FONT

const sans = 'load_sans_font';
const serif = 'load_serif_font';
const mono = 'load_mono_font';
const fonts = [sans, serif, mono];
body.classList.add(sans);

const changeFont = function (target) {
    fonts.forEach(font => body.classList.remove(font));
    if (target.textContent === 'Sans Serif') body.classList.add(sans);
    if (target.textContent === 'Serif') body.classList.add(serif);
    if (target.textContent === 'Mono') body.classList.add(mono);
    title.textContent = target.textContent;
};

items.forEach(item => {
    item.addEventListener('click', ({ target }) => changeFont(target));
    item.addEventListener('keydown', ({ key, target }) => {
        if (key === 'Escape') dropdownEvent();
        if (key === 'Enter') changeFont(target);
    });
});

// // // // // // // // // // // // // // //

export default Header;

// // // // // // // // // // // // // // //
