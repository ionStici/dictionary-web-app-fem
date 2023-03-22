import './../styles/base.scss';
import { createElement } from './abstract/utilities';
import Header from './components/Header';
import Form from './components/Input';
import Audio from './components/Audio';
import Data from './components/Data';
import { NoData } from './components/Input';

const main = createElement('main', ['main']);
main.append(Header, Form, NoData, Audio, Data);

export default main;
