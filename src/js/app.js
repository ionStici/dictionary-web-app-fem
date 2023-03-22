import './../styles/base.scss';
import Header from './components/Header';
import Form from './components/Input';
import Audio from './components/Audio';
import Data from './components/Data';
import { Nodata } from './components/Input';

const main = document.createElement('main');
main.classList.add('main');
main.append(Header);
main.append(Form);
main.append(Nodata);
main.append(Audio);
main.append(Data);

export default main;
