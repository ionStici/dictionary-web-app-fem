import { switchDark, switchLight } from './themeSwitcher';
import { setSansSerif, setSerif, setMono } from './fontChanger';

// // // // // // // // // // // // // // //

const SWITCH_THEME = 'switchTheme';
const switchTheme = () => ({ type: SWITCH_THEME });

// // // // // // // // // // // // // // //

const CHANGE_FONT = 'changeFont';
const changeFont = payload => ({ type: CHANGE_FONT, payload: payload });

// // // // // // // // // // // // // // //

const RETRIEVE_AUDIO = 'audio';
const retrieveAudio = payload => ({ type: RETRIEVE_AUDIO, payload: payload });

// // // // // // // // // // // // // // //

const createStore = reducer => {
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = action => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };

    const subscribe = listener => {
        listeners.push(listener);
        return () => (listeners = listeners.filter(l => l !== listener));
    };

    dispatch({});
    return { getState, dispatch, subscribe };
};

// // // // // // // // // // // // // // //

const initialState = {
    theme: 'light',
    currentFont: 'Sans Serif',
    searchTerm: '',
    audio: {
        word: '',
        phonetic: '',
        audioUrl: '',
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'switchTheme':
            if (state.theme === 'light') {
                switchDark();
                return {
                    ...state,
                    theme: 'dark',
                };
            }

            if (state.theme === 'dark') {
                switchLight();
                return {
                    ...state,
                    theme: 'light',
                };
            }

            break;

        case 'changeFont':
            if (action.payload === 'Sans Serif') {
                setSansSerif();
                return {
                    ...state,
                    currentFont: action.payload,
                };
            }

            if (action.payload === 'Serif') {
                setSerif();
                return {
                    ...state,
                    currentFont: action.payload,
                };
            }

            if (action.payload === 'Mono') {
                setMono();
                return {
                    ...state,
                    currentFont: action.payload,
                };
            }

            break;

        case 'audio':
            return {
                ...state,
                audio: {
                    word: action.payload[0],
                    phonetic: action.payload[1],
                    audioUrl: action.payload[2],
                },
            };

        default:
            return state;
    }
};

const store = createStore(reducer);

// // // // // // // // // // // // // // //

export { store };
export { switchTheme, changeFont, retrieveAudio };
export const dispatch = store.dispatch;
export const subscribe = store.subscribe;

export const selectFont = () => store.getState().currentFont;
export const selectAudio = () => store.getState().audio;

// // // // // // // // // // // // // // //
