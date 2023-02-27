import storageLocation from "./storageLocation";
import login from './login';

export default {
    state: () => ({
        loaded: false
    }),
    getters: {
        loaded(state) {
            return state.loaded;
        }
    },
    mutations: {
        setLoaded(state, payload) {
            state.loaded = payload;
        }
    },
    modules: {
        storageLocation,
        login,
    }
}