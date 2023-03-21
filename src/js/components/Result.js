import styles from './../../styles/result.module.scss';
import { subscribe, selectData } from '../store/store';
import { createElement } from '../abstract/utilities';

// // // // // // // // // // // // // // //

const DataComponent = createElement('div', [styles.component]);

// // // // // // // // // // // // // // //

const render = () => {
    const data = selectData();

    if (data.word) {
        // console.log(data.source);
        console.log(data.meanings[0]);
        // console.log(data.meanings[1]);

        const noun = data.meanings[0];
        const verb = data.meanings[1];

        const markup = `
            <section class="${styles.section}">


                <div class="${styles.introBox}">
                    <p class="${styles.partOfSpeech}">${noun.partOfSpeech}</p>
                    <div class="${styles.line}"></div>
                </div>



                <div class="${styles.introBox}">
                <p class="${styles.partOfSpeech}">${verb.partOfSpeech}</p>
                <div class="${styles.line}"></div>
            </div>
            </section>
        `;

        DataComponent.innerHTML = markup;
    }
};

subscribe(render);

// // // // // // // // // // // // // // //

export default DataComponent;

// // // // // // // // // // // // // // //
