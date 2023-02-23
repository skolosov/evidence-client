import {apiGet} from "../api";

export default {
    state: () => ({
        storageLocations: [],
        divisions: [],
    }),
    getters: {
        storageLocationsRows(state) {
            return state.storageLocations;
        },
        divisionsOptions(state) {
            return state.divisions;
        },
    },
    mutations: {
        setStorageLocations(state, payload) {
            state.storageLocations = payload;
        },
        setDivisions(state, payload) {
            state.divisions = payload;
        },
    },
    actions: {
        async getStorageLocationsData(context) {
            const {data} = await apiGet('storage-locations');
            context.commit('setStorageLocations', data);
        },
        async getDivisionsData(context) {
            const {data} = await apiGet('divisions');
            context.commit('setDivisions', data);
        },
    },

}