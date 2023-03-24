// // // // // // // // // // // // // // //

const SEARCH_TERM = 'search';
const searchTerm = payload => ({ type: SEARCH_TERM, payload: payload });

// // // // // // // // // // // // // // //

const RETRIEVE_AUDIO = 'audio';
const retrieveAudio = payload => ({ type: RETRIEVE_AUDIO, payload: payload });

// // // // // // // // // // // // // // //

const RETRIEVE_DATA = 'data';
const retrieveData = payload => ({ type: RETRIEVE_DATA, payload: payload });

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
    data: {
        source: '',
        meanings: '',
        word: '',
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'search':
            return {
                ...state,
                searchTerm: action.payload,
            };

        case 'audio':
            return {
                ...state,
                audio: {
                    word: action.payload[0],
                    phonetic: action.payload[1],
                    audioUrl: action.payload[2],
                },
            };

        case 'data':
            return {
                ...state,
                data: {
                    word: action.payload[2],
                    source: action.payload[0],
                    meanings: action.payload[1],
                },
            };

        default:
            return state;
    }
};

const store = createStore(reducer);

// // // // // // // // // // // // // // //

export { retrieveAudio, searchTerm, retrieveData };
export const dispatch = store.dispatch;
export const subscribe = store.subscribe;

export const selectSearchTerm = () => store.getState().searchTerm;
export const selectAudio = () => store.getState().audio;
export const selectData = () => store.getState().data;

// // // // // // // // // // // // // // //
