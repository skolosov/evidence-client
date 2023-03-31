import storageLocations from "./storageLocations";
import login from './login';
import evidences from './evidences';
import {mutators, actions} from "./crudHelpers";

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
        ...mutators,
        setLoaded(state, payload) {
            state.loaded = payload;
        },
        setError(state, payload) {
            state.error = !payload
                ? DEFAULT_ERROR
                : {...DEFAULT_ERROR, ...payload};
        }
    },
    actions: {
        ...actions,
    },
    modules: {
        storageLocations,
        login,
        evidences,
    }
}