import storageLocation from "./storageLocation";
import login from './login';

export default {
    state: () => ({
        loaded: false,
    }),
    getters: {
        loaded: (state) => state.loaded,
    },
    mutations: {
        setLoaded: (state, payload) => {
            state.loaded = payload !== null
                ? payload
                : state.loaded;
        }
    },
    modules: {
        storageLocation,
        login,
    }
}