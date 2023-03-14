import {apiDelete, apiGet, apiPatch, apiPost} from "../api";
import {getError} from "../helpers";

export default {
    state: () => ({
        evidences: [],
    }),
    getters: {
        evidenceRows(state) {
            return state.evidences;
        },
    },
    mutations: {
        setEvidences(state, payload) {
            state.evidences = payload ? payload : [];
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
        async getEvidencesData(context, props) {
            try {
                console.log(props);
                context.commit('setLoaded', true);
                const {data} = await apiGet('evidences', {filter: {storage_location_id: props.storage_Location_id}});
                context.commit('setEvidences', data);
            } catch (error) {
                context.commit('setError', getError(error));
            } finally {
                context.commit('setLoaded', false);
            }
        },
        async storeEvidencesRow(context, props) {
            try {
                context.commit('setLoaded', true);
                const {data: createdRow} = props;
                const {data} = await apiPost(`evidences`, createdRow);
                context.commit('addDataRow', {dataKey: 'evidences', row: data});
            } catch (error) {
                context.commit('setError', getError(error));
            } finally {
                context.commit('setLoaded', false);
            }
        },
        async updateEvidencesRow(context, props) {
            try {
                context.commit('setLoaded', true);
                const {id, data: updatedRow} = props;
                const {data} = await apiPatch(`evidences/${id}`, updatedRow);
                context.commit('replaceDataRow', {id, dataKey: 'evidences', row: data});
            } catch (error) {
                context.commit('setError', getError(error));
            } finally {
                context.commit('setLoaded', false);
            }
        },
        async destroyEvidencesRow(context, props) {
            try {
                context.commit('setLoaded', true);
                const {id} = props;
                await apiDelete(`evidences/${id}`);
                context.commit('deleteDataRow', {id, dataKey: 'evidences'});
            } catch (error) {
                context.commit('setError', getError(error));
            } finally {
                context.commit('setLoaded', false);
            }
        }
    },

}