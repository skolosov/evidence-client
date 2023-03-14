import {apiPost} from "../api";
import Auth from "../Auth";
import router from "../routes";
import {getError} from "../helpers";

export default {
    state: () => ({
        auth: Auth.check(),
    }),
    mutations: {
        setToken(state, {access_token, user}) {
            Auth.login(access_token, user, () => router.push({name: 'storage'}));
            state.auth = true;
        },
        removeToken(state) {
            Auth.logout(() => router.push({name: 'home'}));
            state.auth = false
        }
    },
    getters: {
        auth(state) {
            return state.auth;
        },
    },
    actions: {
        async registerNewUser(context, props) {
            try {
                context.commit('setLoaded', true);
                await apiPost(`auth/registration`, props);
            } catch (error) {
                context.commit('setError', getError(error));
            } finally {
                context.commit('setLoaded', false);
            }
        },
        async loginUser(context, props) {
            try {
                context.commit('setLoaded', true);
                const {data} = await apiPost(`auth/login`, props);
                context.commit('setToken', data)
            } catch (error) {
                context.commit('setError', getError(error));
            } finally {
                context.commit('setLoaded', false);
            }
        },
        async logoutUser(context) {
            try {
                context.commit('setLoaded', true);
                await apiPost(`auth/logout`);
                context.commit('removeToken')
            } catch (error) {
                context.commit('setError', getError(error));
            } finally {
                context.commit('setLoaded', false);
            }
        },
    }
}