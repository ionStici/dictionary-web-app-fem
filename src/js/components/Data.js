import styles from './../../styles/result.module.scss';
import { subscribe, selectData } from '../store/store';
import { createElement } from '../abstract/utilities';

// // // // // // // // // // // // // // //

const DataComponent = createElement('div', [styles.component]);

// // // // // // // // // // // // // // //

const render = () => {
    const data = selectData();
    let markup = ``;
    let nounMarkup = ``;
    let verbMarkup = ``;
    let footerMarkup = ``;

    // console.log(data.meanings[0]);
    // console.log(data.meanings[1]);

    if (data.word) {
        const nounCheck = Boolean(
            data.meanings.filter(info =>
                info.partOfSpeech === 'noun' ? info : undefined
            )[0]
        );

        if (nounCheck) {
            nounMarkup = `
            <div class="${styles.wrapper}">
                 <div class="${styles.introBox}">
                     <p class="${styles.partOfSpeech}">noun</p>
                     <div class="${styles.line}"></div>
                 </div>
        
                <p class="${styles.meaning}">Meaning</p>

                <ul class="${styles.ul}">
                    ${data.meanings
                        .filter(info =>
                            info.partOfSpeech === 'noun' ? info : ''
                        )[0]
                        .definitions.map(
                            def =>
                                `<li class="${styles.li}">${def.definition}</li>`
                        )
                        .join('')}
                </ul>          
            </div>
            `;
        }

        // // // // // // // // // // // // // // //

        const verbCheck = Boolean(
            data.meanings.filter(info =>
                info.partOfSpeech === 'verb' ? info : undefined
            )[0]
        );

        if (verbCheck) {
            verbMarkup = `
            <div class="${styles.wrapper}">
                <div class="${styles.introBox}">
                    <p class="${styles.partOfSpeech}">verb</p>
                    <div class="${styles.line}"></div>
                </div>

                <p class="${styles.meaning}">Meaning</p>

                <ul class="${styles.ul}">
                    ${data.meanings
                        .filter(info =>
                            info.partOfSpeech === 'verb' ? info : ''
                        )[0]
                        .definitions.map(
                            def =>
                                `<li class="${styles.li}">${def.definition}</li>`
                        )
                        .join('')}
                </ul>          
            </div>
            `;
        }

        // // // // // // // // // // // // // // //

        footerMarkup = `
            <footer class="${styles.footer}">
                <p class="${styles.sourceText}">Source</p>
                <div class="${styles.sourceLinkBox}">
                    <a class="${styles.sourceLink}" href="${data.source}" target="_blank">${data.source}</a>
                </div>
            </footer>
        `;

        markup = `
            <section class="${styles.section}">
                ${nounCheck ? nounMarkup : ''}
                ${verbCheck ? verbMarkup : ''}
                ${data.source ? footerMarkup : ''}
            </section>
        `;

        DataComponent.innerHTML = markup;
    }
};

subscribe(render);

// // // // // // // // // // // // // // //

export default DataComponent;

// // // // // // // // // // // // // // //
