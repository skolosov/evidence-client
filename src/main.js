import { createApp } from 'vue';
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi', // This is already the default value - only for display purposes
    },
})

import './style.css';
import App from './App.vue';
import StorageLocations from "./pages/StorageLocations/StorageLocations.vue";
import Evidences from "./pages/Evidences/Evidences.vue";
import Login from "./pages/Login/Login.vue";
import Registration from "./pages/Registration/Registration.vue";
import VueTheMask from 'vue-the-mask';
import state from "./store/store";


const routes = [
    { path: '/', component: StorageLocations, name: 'storage' },
    { path: '/evidences', component: Evidences, name: 'evi' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/registration', component: Registration, name: 'reg'},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const store = createStore(state);
const app = createApp(App);

app.use(store);
app.use(router);
app.use(vuetify);
app.use(VueTheMask);
app.mount('#app');
