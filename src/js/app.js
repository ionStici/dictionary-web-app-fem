import './../styles/base.scss';
import { createElement } from './abstract/utilities';
import Header from './components/Header';
import Form from './components/Input';
import Message from './components/Message';
import Audio from './components/Audio';
// import Data from './components/Data';
import './dataFlow';

const main = createElement('main', ['main']);
main.append(Header, Form, Message, Audio);

export default main;
