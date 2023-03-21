import './../styles/base.scss';
import Header from './components/Header';
import Form from './components/Input';
import Audio from './components/Audio';

const main = document.createElement('main');
main.classList.add('main');
main.append(Header);
main.append(Form);
main.append(Audio);

export default main;
