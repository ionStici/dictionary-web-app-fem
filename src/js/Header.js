import styles from './../styles/header.module.scss';
import logoImg from './../assets/images/logo.svg';
import arrowImg from './../assets/images/icon-arrow-down.svg';
import { createElement, setSrcAlt } from './utilities';
import { dispatch, switchTheme, changeFont } from './store';

const moonIcon = `<svg class="${styles.moonIcon}" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><path fill="none" stroke="#838383" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"/></svg>`;

const Header = createElement('header', [styles.header]);
const logo = createElement('img', [styles.logo]);
setSrcAlt(logo, logoImg, 'Logo');
const box = createElement('div', [styles.box]);

Header.appendChild(logo);
Header.appendChild(box);

// // // // // // // // // // // // // // //

const dropdown = createElement('div', [styles.dd]);
const title = createElement('p', [styles.dd__title], 'Sans Serif');

const arrow = createElement('img', [styles.dd__icon]);
setSrcAlt(arrow, arrowImg);

const list = createElement('ul', [styles.dd__ul]);

const items = ['Sans Serif', 'Serif', 'Mono'].map(text => {
    const item = createElement('li', [styles.dd__li], text);
    list.append(item);
    return item;
});

dropdown.append(title);
dropdown.append(list);
dropdown.append(arrow);

// // // // // // // // // // // // // // //

const toggleBox = createElement('div', [styles.themeToggler]);

const toggler = createElement('div', [styles.toggler]);
const circle = createElement('div', [styles.circle]);
toggler.append(circle);

const iconBox = createElement('div', [styles.iconBox]);
iconBox.innerHTML = moonIcon;

toggleBox.append(toggler);
toggleBox.append(iconBox);

// // // // // // // // // // // // // // //

box.append(dropdown);
box.append(toggleBox);

// // // // // // // // // // // // // // //

items.forEach(item => {
    item.addEventListener('click', function (e) {
        console.log(e);
        console.log(changeFont('mono'));
        dispatch(changeFont('Mono'));
    });
});

// // // // // // // // // // // // // // //

export default Header;
