import { createApp } from 'vue';
import { createStore } from 'vuex';
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
import VueTheMask from 'vue-the-mask';
import state from "./store/store";
import router from "./routes";

const store = createStore(state);
const app = createApp(App);

app.use(store);
app.use(router);
app.use(vuetify);
app.use(VueTheMask);
app.mount('#app');
