import styles from './../../styles/data.module.scss';
import { dispatch, searchTerm, subscribe, selectData } from '../store/store';
import { createElement } from '../abstract/utilities';
import iconLink from './../../assets/images/icon-new-window.svg';
import { renderData } from '../dataFlow';

// // // // // // // // // // // // // // //

const DataComponent = createElement('div', [styles.component]);

// // // // // // // // // // // // // // //

const render = () => {
    const data = selectData();
    let footerMarkup = ``;

    if (data.word) {
        // // // // // // // // // // // // // // //

        const partOfSpeech = [];

        data.meanings.forEach(data => {
            if (!partOfSpeech.includes(data.partOfSpeech)) {
                partOfSpeech.push(data.partOfSpeech);
            }
        });

        const comprise = partOfSpeech.map(p => {
            return data.meanings.filter(d => {
                if (p === d.partOfSpeech) {
                    return p;
                }
            });
        });

        const newData = comprise.map((d, i) => {
            if (d.length > 1) {
                const newData = {
                    partOfSpeech: partOfSpeech[i],
                    definitions: [],
                    synonyms: [],
                    antonyms: [],
                };

                comprise[i].forEach(d => {
                    newData.definitions = [
                        ...newData.definitions,
                        ...d.definitions,
                    ];

                    newData.synonyms = [...newData.synonyms, ...d.synonyms];
                    newData.antonyms = [...newData.antonyms, ...d.antonyms];
                });

                return [newData];
            }

            return d;
        });

        let markup = newData
            .map(data => {
                const d = data[0];

                return `
                    <div class="${styles.wrapper}">
                        <div class="${styles.introBox}">
                            <p class="${styles.partOfSpeech}">${
                    d.partOfSpeech
                }</p>
                            <div class="${styles.line}"></div>
                        </div>

                        <p class="${styles.meaning}">Meaning</p>

                        <ul class="${styles.ul}">
                            ${d.definitions
                                .map(d => {
                                    return `<li class="${styles.li}">
                                                ${
                                                    d.definition
                                                        ? `<p class="${
                                                              styles.li__def
                                                          }">${d.definition
                                                              .split(' ')
                                                              .map(d => {
                                                                  return `<span class="word">${d}</span>`;
                                                              })
                                                              .join('')}</p>`
                                                        : ''
                                                }
                                                ${
                                                    d.example
                                                        ? `<span class="${styles.li__ex}">"${d.example}"</span>`
                                                        : ''
                                                }
                                            </li>`;
                                })
                                .join('')}
                        </ul>

                                ${
                                    d.synonyms[0]
                                        ? `${`<div class="${styles.alts}">
                                                    <p><span class="${
                                                        styles.kw
                                                    }">Synonyms</span> ${d.synonyms
                                              .map(s => {
                                                  return `<span class="${styles.term}">${s}</span>`;
                                              })
                                              .join('')}</p>
                                                </div>`}`
                                        : ''
                                }
                    
                                    ${
                                        d.antonyms[0]
                                            ? `${`<div class="${styles.alts}">
                                                    <p><span class="${
                                                        styles.kw
                                                    }">Antonyms</span> ${d.antonyms
                                                  .map(a => {
                                                      return `<span class="${styles.term}">${a}</span>`;
                                                  })
                                                  .join('')}</p>
                                                </div>`}`
                                            : ''
                                    }

                    </div>
                `;
            })
            .join('');

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

        // // // // // // // // // // // // // // //

        markup = `
            <section class="${styles.section}">
                ${markup}
                ${data.source ? footerMarkup : ''}
            </section>
        `;

        DataComponent.innerHTML = markup;

        // // // // // // // // // // // // // // //
    }
};

subscribe(render);

// // // // // // // // // // // // // // //

DataComponent.addEventListener('click', function (e) {
    if (e.target.classList.contains('word')) {
        const word = e.target.textContent.replace(/[^a-zA-Z ]/g, '');
        dispatch(searchTerm(word));
        renderData(word);
    }
});

// // // // // // // // // // // // // // //

export default DataComponent;

// // // // // // // // // // // // // // //
