import styles from './../../styles/header.module.scss';
import logoImg from './../../assets/images/logo.svg';
import arrowImg from './../../assets/images/icon-arrow-down.svg';
import { createElement, setSrcAlt } from '../abstract/utilities';
import { dispatch, subscribe } from '../store/store';
import { switchTheme, changeFont, selectFont } from '../store/store';

// // // // // // // // // // // // // // //
// CREATE HEADER ELEMENTS

const moonIcon = `<svg class="${styles.moonIcon}" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><path fill="none" stroke="#838383" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"/></svg>`;
const Header = createElement('header', [styles.header]);
const box = createElement('div', [styles.box]);

const logo = createElement('img', [styles.logo]);
setSrcAlt(logo, logoImg, 'Logo');
logo.setAttribute('tabindex', '0');
const goHome = () => (window.location.href = '/');
logo.addEventListener('click', goHome);
logo.addEventListener('keydown', e => (e.key === 'Enter' ? goHome() : ''));

Header.append(logo, box);

// // // // // // // // // // // // // // //
// LOAD FONTS

const sans = createElement('p', ['load-sans-font'], 'text');
const serif = createElement('p', ['load-serif-font'], 'text');
const mono = createElement('p', ['load-mono-font'], 'text');
Header.append(sans, serif, mono);
setTimeout(() => [sans, serif, mono].forEach(el => el.remove()), 1);

// // // // // // // // // // // // // // //
// CREATE FONTS DROPDOWN ELEMENTS

const dropdown = createElement('div', [styles.dd]);
dropdown.dataset.nav = 'close';
dropdown.setAttribute('role', 'button');
dropdown.setAttribute('tabindex', '0');

const title = createElement('p', [styles.dd__title], 'Sans Serif');
subscribe(() => (title.textContent = selectFont()));

const arrow = createElement('img', [styles.dd__icon]);
setSrcAlt(arrow, arrowImg);

const list = createElement('ul', [styles.dd__ul, styles.d_none, styles.op_0]);

const items = ['Sans Serif', 'Serif', 'Mono'].map(text => {
    const item = createElement('li', [styles.dd__li], text);
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    list.append(item);
    return item;
});

dropdown.append(title, list, arrow);

// // // // // // // // // // // // // // //
// CREATE THEME TOGGLER ELEMENTS

const toggle = createElement('div', [styles.themeToggler]);
toggle.setAttribute('role', 'button');
toggle.setAttribute('tabindex', '0');

const toggler = createElement('div', [styles.toggler]);
const circle = createElement('div', [styles.circle]);
toggler.append(circle);

const iconBox = createElement('div', [styles.iconBox]);
iconBox.innerHTML = moonIcon;

toggle.append(toggler, iconBox);
box.append(dropdown, toggle);

// // // // // // // // // // // // // // //
// THEME TOGGLE EVENTS

const toggleTheme = () => dispatch(switchTheme());
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
// CHANGE FONT EVENT

items.forEach(item => {
    item.addEventListener('click', ({ target }) =>
        dispatch(changeFont(target.textContent))
    );

    item.addEventListener('keydown', ({ key, target }) => {
        if (key === 'Escape') dropdownEvent();
        if (key === 'Enter') dispatch(changeFont(target.textContent));
    });
});

// // // // // // // // // // // // // // //

export default Header;
