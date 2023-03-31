import {apiDelete, apiGet, apiPatch, apiPost} from "../api";
import {getError} from "../helpers";

export const mutators = {
    setData(state, {module, propertyKey, data}) {
        console.log('setData', state, propertyKey, data);
        state[module][propertyKey] = data ? data : [];
    },
    addRow(state, {module, propertyKey, row}) {
        const data = state[module][propertyKey];
        data.push(row);
        state[module][propertyKey] = data;
    },
    replaceRow(state, {module, propertyKey, id, row}) {
        const data = state[module][propertyKey];
        const key = data.findIndex((item) => item.id === id);
        if (key !== -1) {
            data[key] = row;
        }
        state[module][propertyKey] = data;
    },
    deleteRow(state, {module, propertyKey, id}) {
        const data = state[module][propertyKey];
        const key = data.findIndex((item) => item.id === id);
        if (key !== -1) {
            data.splice(key, 1);
        }
        state[module][propertyKey] = data;
    }
};

export const actions = {
    async index(context, {url, module, propertyKey, props, loader = true}) {
        try {
            loader && context.commit('setLoaded', true);
            const {data: {data}} = await apiGet(url, props || {});
            console.log('index', data);
            context.commit('setData', {module, propertyKey, data});
        } catch (error) {
            context.commit('setError', getError(error));
        } finally {
            loader && context.commit('setLoaded', false);
        }
    },
    async store(context, {url, module, propertyKey, props, loader = true}) {
        try {
            loader && context.commit('setLoaded', true);
            const {data: {data}} = await apiPost(url, props);
            context.commit('addRow', {module, propertyKey, row: data});
        } catch (error) {
            context.commit('setError', getError(error));
        } finally {
            loader && context.commit('setLoaded', false);
        }
    },
    async update(context, {url, module, id, propertyKey, props, loader = true}) {
        try {
            loader && context.commit('setLoaded', true);
            const {data: {data}} = await apiPatch(`${url}/${id}`, props);
            context.commit('replaceRow', {module, id, propertyKey, row: data});
        } catch (error) {
            context.commit('setError', getError(error));
        } finally {
            loader && context.commit('setLoaded', false);
        }
    },
    async destroy(context, {url, module, id, propertyKey, props, loader = true}) {
        try {
            loader && context.commit('setLoaded', true);
            await apiDelete(`${url}/${id}`, props || {});
            context.commit('deleteRow', {module, id, propertyKey});
        } catch (error) {
            context.commit('setError', getError(error));
        } finally {
            context.commit('setLoaded', false);
        }
    }
};