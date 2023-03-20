import { switchDark, switchLight } from './themeSwitcher';
import { setSansSerif, setSerif, setMono } from './changeFont';

// // // // // // // // // // // // // // //

const SWITCH_THEME = 'switchTheme';
const switchTheme = () => ({ type: SWITCH_THEME });

// // // // // // // // // // // // // // //

const CHANGE_FONT = 'changeFont';
const changeFont = payload => ({ type: CHANGE_FONT, payload: payload });

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

const initialState = {
    theme: 'light',
    currentFont: 'Sans Serif',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'switchTheme':
            if (state.theme === 'light') {
                state.theme = 'dark';
                switchDark();
                return;
            }

            if (state.theme === 'dark') {
                state.theme = 'light';
                switchLight();
                return;
            }

            break;

        case 'changeFont':
            if (action.payload === 'Sans Serif') setSansSerif();
            if (action.payload === 'Serif') setSerif();
            if (action.payload === 'Mono') setMono();

            break;

        default:
            return state;
    }
};

const store = createStore(reducer);

export { switchTheme, changeFont };
export const dispatch = store.dispatch;
export const subscribe = store.subscribe;

// store.dispatch(switchTheme());
// store.dispatch(switchTheme());
// store.dispatch(switchTheme());
// store.dispatch(switchTheme());
// store.dispatch(switchTheme());
