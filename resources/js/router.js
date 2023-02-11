import {createRouter, createWebHistory} from "vue-router";
import home from "./pages/Home.vue";
import register from "./pages/Register.vue";
import login from "./pages/Login.vue";
import store from "./store/index.js";
import todoCreateForm from "./components/TodoCreateForm.vue";

const routes = [
     {
        path: '/login',
        name: 'Login',
        component: login,
         meta: {
             requiresAuth: false,
         }
    }, {
        path: '/register',
        name: 'Register',
        component: register,
        meta: {
            requiresAuth: false,
        }
    },
    {
        path: '/',
        name: 'Home',
        component: home,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/todo-create',
        name: 'TodoCreate',
        component: todoCreateForm,
        meta: {
            requiresAuth: true,
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

// check authentication
router.beforeEach((to, from) => {
    if (to.meta.requiresAuth && store.getters.getToken === 0) {
        return {name: 'Login'}
    }
    if (to.meta.requiresAuth === false && store.getters.getToken !== 0 ) {
        return {name: 'Home'}
    }
})

export default router;
