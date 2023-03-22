import styles from './../../styles/result.module.scss';
import { subscribe, selectData } from '../store/store';
import { createElement } from '../abstract/utilities';
import iconLink from './../../assets/images/icon-new-window.svg';

// // // // // // // // // // // // // // //

const DataComponent = createElement('div', [styles.component]);

// // // // // // // // // // // // // // //

const render = () => {
    const data = selectData();
    let markup = ``;
    let nounMarkup = ``;
    let verbMarkup = ``;
    let footerMarkup = ``;

    // adjective

    // console.log(data.meanings[0]);
    // console.log(data.meanings[1]);
    // console.log(data.meanings);

    if (data.word) {
        // // // // // // // // // // // // // // //

        const nounCheck = Boolean(
            data.meanings.filter(info =>
                info.partOfSpeech === 'noun' ? info : undefined
            )[0]
        );

        if (nounCheck) {
            const noun = {
                definitions: [],
                synonyms: [],
                antonyms: [],
            };

            const nounAll = data.meanings
                .filter(info => {
                    if (info.partOfSpeech === 'noun') return info;
                })
                .forEach(data => {
                    noun.definitions = [
                        ...noun.definitions,
                        ...data.definitions,
                    ];
                    noun.synonyms = [...noun.synonyms, ...data.synonyms];
                    noun.antonyms = [...noun.antonyms, ...data.antonyms];
                });

            const nounSyn = noun.synonyms;
            const nounAnt = noun.antonyms;

            nounMarkup = `
            <div class="${styles.wrapper}">
                 <div class="${styles.introBox}">
                     <p class="${styles.partOfSpeech}">noun</p>
                     <div class="${styles.line}"></div>
                 </div>
        
                <p class="${styles.meaning}">Meaning</p>

                <ul class="${styles.ul}">
                    ${noun.definitions
                        .map(def => {
                            return `<li class="${styles.li}">
                                ${
                                    def.definition
                                        ? `<span class="${styles.li__def}">${def.definition}</span>`
                                        : ''
                                }
                                ${
                                    def.example
                                        ? `<span class="${styles.li__ex}">${def.example}</span>`
                                        : ''
                                }
                            </li>`;
                        })
                        .join('')}
                </ul>
                           
                ${
                    nounSyn[0]
                        ? `${`<div class="${styles.alts}">
                                <p><span class="${
                                    styles.kw
                                }">Synonyms</span> ${nounSyn
                              .map(s => {
                                  return `<span class="${styles.term}">${s}</span>`;
                              })
                              .join('')}</p>
                            </div>`}`
                        : ''
                }

                ${
                    nounAnt[0]
                        ? `${`<div class="${styles.alts}">
                                <p><span class="${
                                    styles.kw
                                }">Antonyms</span> ${nounAnt
                              .map(a => {
                                  return `<span class="${styles.term}">${a}</span>`;
                              })
                              .join('')}</p>
                            </div>`}`
                        : ''
                }
                
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
            const verb = {
                definitions: [],
                synonyms: [],
                antonyms: [],
            };

            const verbAll = data.meanings
                .filter(info => {
                    if (info.partOfSpeech === 'verb') return info;
                })
                .forEach(data => {
                    verb.definitions = [
                        ...verb.definitions,
                        ...data.definitions,
                    ];
                    verb.synonyms = [...verb.synonyms, ...data.synonyms];
                    verb.antonyms = [...verb.antonyms, ...data.antonyms];
                });

            const verbSyn = verb.synonyms;
            const verbAnt = verb.antonyms;

            verbMarkup = `
            <div class="${styles.wrapper}">
                <div class="${styles.introBox}">
                    <p class="${styles.partOfSpeech}">verb</p>
                    <div class="${styles.line}"></div>
                </div>

                <p class="${styles.meaning}">Meaning</p>

                <ul class="${styles.ul}">
                    ${verb.definitions
                        .map(def => {
                            return `<li class="${styles.li}">
                                    ${
                                        def.definition
                                            ? `<span class="${styles.li__def}">${def.definition}</span>`
                                            : ''
                                    }
                                    ${
                                        def.example
                                            ? `<span class="${styles.li__ex}">${def.example}</span>`
                                            : ''
                                    }
                                </li>`;
                        })
                        .join('')}
                </ul>        
                
                ${
                    verbSyn[0]
                        ? `${`<div class="${styles.alts}">
                                <p><span class="${
                                    styles.kw
                                }">Synonyms</span> ${verbSyn
                              .map(s => {
                                  return `<span class="${styles.term}">${s}</span>`;
                              })
                              .join('')}</p>
                            </div>`}`
                        : ''
                }

                ${
                    verbAnt[0]
                        ? `${`<div class="${styles.alts}">
                                <p><span class="${
                                    styles.kw
                                }">Antonyms</span> ${verbAnt
                              .map(a => {
                                  return `<span class="${styles.term}">${a}</span>`;
                              })
                              .join('')}</p>
                            </div>`}`
                        : ''
                }

            </div>
            `;
        }

        // // // // // // // // // // // // // // //

        footerMarkup = `
            <footer class="${styles.footer}">
                <p class="${styles.sourceText}">Source</p>
                <div class="${styles.sourceLinkBox}">
                    <a class="${styles.sourceLink}" href="${data.source}" target="_blank">
                        <span class="${styles.bb}">${data.source}</span>
                        <img src="${iconLink}" alt="" />
                    </a>
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
