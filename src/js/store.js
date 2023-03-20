import { switchDark, switchLight } from './themeSwitcher';

const SWITCH_THEME = 'switchTheme';
const switchTheme = () => ({ type: SWITCH_THEME });

const createStore = reducer => {
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = action => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };

    const subscribe = listener => {
        listener.push(listener);
        return () => (listeners = listeners.filter(l => l !== listener));
    };

    dispatch({});
    return { getState, dispatch, subscribe };
};

const initialState = {
    theme: 'light',
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

        default:
            return state;
    }
};

const store = createStore(reducer);

// store.dispatch(switchTheme());
// store.dispatch(switchTheme());
// store.dispatch(switchTheme());
// store.dispatch(switchTheme());
// store.dispatch(switchTheme());
