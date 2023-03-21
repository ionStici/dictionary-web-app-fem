import './../styles/base.scss';
import Header from './components/Header';

const main = document.createElement('main');
main.classList.add('main');
main.append(Header);

export default main;
