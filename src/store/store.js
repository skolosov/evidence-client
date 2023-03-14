import storageLocation from "./storageLocation";
import login from './login';
import evidence from './evidence';

const DEFAULT_ERROR = {message: null, status: null};

export default {
    state: () => ({
        loaded: false,
        error: DEFAULT_ERROR,
    }),
    getters: {
        error(state) {
            return state.error;
        },
        loaded(state) {
            return state.loaded;
        }
    },
    mutations: {
        setLoaded(state, payload) {
            state.loaded = payload;
        },
        setError(state, payload) {
            state.error = !payload
                ? DEFAULT_ERROR
                : {...DEFAULT_ERROR, ...payload};
        }
    },
    modules: {
        storageLocation,
        login,
        evidence,
    }
}