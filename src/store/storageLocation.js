import {apiDelete, apiGet, apiPatch, apiPost} from "../api";

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
        addDataRow(state, {dataKey, row}) {
            const data = state[dataKey];
            data.push(row);
            state[dataKey] = data;
        },
        replaceDataRow(state, {dataKey, id, row}) {
            const data = state[dataKey];
            const key = data.findIndex((item) => item.id === id);
            if (key !== -1) {
                data[key] = row;
            }
            state[dataKey] = data;
        },
        deleteDataRow(state, {dataKey, id}) {
            const data = state[dataKey];
            const key = data.findIndex((item) => item.id === id);
            if (key !== -1) {
                data.splice(key, 1);
            }
            state[dataKey] = data;
        }
    },
    actions: {
        async getStorageLocationsData(context) {
            context.commit('setLoaded', true);
            const {data} = await apiGet('storage-locations');
            context.commit('setStorageLocations', data);
            context.commit('setLoaded', false);
        },
        async getDivisionsData(context) {
            const {data} = await apiGet('divisions');
            context.commit('setDivisions', data);
        },
        async storeStorageLocationsRow(context, props) {
            context.commit('setLoaded', true);
            const {data: createdRow} = props;
            const {data} = await apiPost(`storage-locations`, createdRow);
            context.commit('addDataRow', {dataKey: 'storageLocations', row: data});
            context.commit('setLoaded', false);
        },
        async updateStorageLocationsRow(context, props) {
            context.commit('setLoaded', true);
            const {id, data: updatedRow} = props;
            const {data} = await apiPatch(`storage-locations/${id}`, updatedRow);
            context.commit('replaceDataRow', {id, dataKey: 'storageLocations', row: data});
            context.commit('setLoaded', false);
        },
        async destroyStorageLocationsRow(context, props) {
            context.commit('setLoaded', true);
            const {id} = props;
            await apiDelete(`storage-locations/${id}`);
            context.commit('deleteDataRow', {id, dataKey: 'storageLocations'});
            context.commit('setLoaded', false);
        }
    },

}