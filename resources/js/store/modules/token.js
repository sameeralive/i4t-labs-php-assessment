const tokenModule = {
    state: {
        token: localStorage.getItem('token') || 0,
    },
    getters: {
        getToken: (state) => {
            return state.token
        },

    },
    actions: {
        getToken: function (state) {
            return state.token
        },
        setToken(context, payload) {
            localStorage.setItem('token', payload);
            context.commit('updateToken', payload)
        },
        removeToken(context) {
            localStorage.removeItem('token');
            context.commit('updateToken', 0);
        },
    },
    mutations: {
        updateToken(state, payload) {
            state.token = payload;
        },
    },
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
