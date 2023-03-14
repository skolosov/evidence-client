import Evidences from "./pages/Evidences/Evidences.vue";
import Login from "./pages/Login/Login.vue";
import Registration from "./pages/Registration/Registration.vue";
import StorageLocations from "./pages/StorageLocations/StorageLocations.vue";
import {createRouter, createWebHistory} from "vue-router";
import Home from "./pages/Home/Home.vue";
import NotFound from "./pages/NotFound/NotFound.vue";
import Auth from './Auth';


const routes = [
    {
        path: '/',
        component: Home,
        name: 'home',
        meta: {requiresAuth: false},
        redirect: Auth.check() ? {name: 'storage'} : null,
    },
    {path: '/storage', component: StorageLocations, name: 'storage', meta: {requiresAuth: true}},
    {path: '/evidences/:id', component: Evidences, name: 'evi', meta: {requiresAuth: true}},
    {path: '/login', component: Login, name: 'login', meta: {requiresAuth: false}},
    {path: '/registration', component: Registration, name: 'reg', meta: {requiresAuth: false}},
    {path: '/:pathMatch(.*)*', component: NotFound, name: 'NotFound', meta: {requiresAuth: false}},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (Auth.check()) {
            next();
            return true;
        } else {
            router.push({name: 'login'});
        }
    } else {
        next();
    }
});

export default router;