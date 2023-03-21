import './../styles/base.scss';
import Header from './components/Header';
import Form from './components/Input';

const main = document.createElement('main');
main.classList.add('main');
main.append(Header);
main.append(Form);

export default main;
