import {createStore} from "vuex";

const tokenModule = {
    state() {
        return {
            token: localStorage.getItem('token') || 0,
        }
    },
    mutations: {
        UPDATE_TOKEN(state, payload) {
            state.token = payload;
        },
    },
    getters: {
        setToken(context, payload) {
            localStorage.setItem('token', payload);
            context.commit('UPDATE_TOKEN', payload)
        },
        removeToken(context) {
            localStorage.removeItem('token');
            context.commit('UPDATE_TOKEN', 0);
        },
    },
    actions: {
        getToken: function (state) {
            return state.token
        },
    }
}


// const store = createStore({
//
//     // define variables
//     state: {
//         token: localStorage.getItem('token') || 0,
//         todos: [],
//     },
//
//     // update variables values
//     mutations: {
//         UPDATE_TOKEN(state, payload) {
//             state.token = payload;
//         },
//         UPDATE_TODOS(state, payload) {
//             state.todos = payload;
//         }
//     },
//
//     // actions to be performed
//     actions: {
//         setToken(context, payload) {
//             localStorage.setItem('token', payload);
//             context.commit('UPDATE_TOKEN', payload)
//         },
//         removeToken(context) {
//             localStorage.removeItem('token');
//             context.commit('UPDATE_TOKEN', 0);
//         },
//     },
//
//     // get state variable value
//     getters: {
//         getToken: function (state) {
//             return state.token
//         },
//         allTodos: (state) => {
//             return state.todos
//         }
//     }
// })

export default tokenModule;
