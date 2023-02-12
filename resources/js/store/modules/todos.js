const todosModule = {
    state: {
        todos: [],
        archivedTodos: [],
    },
    getters: {
        todosList: (state) => {
            return state.todos
        },
        archivedTodosList: (state) => {
            return state.archivedTodos
        }
    },
    actions: {
        async fetchTodos({commit}) {
            await axios.get('api/todos').then(res => {
                commit('setTodos', res.data);
            }, err => {
                console.log(err);
            })
        },
        async fetchArchivedTodos({commit}) {
            await axios.get('api/archived-todos').then(res => {
                commit('setArchivedTodos', res.data);
            }, err => {
                console.log(err);
            })
        },
        async addTodo({commit}, todo) {
            commit('showLoadingSpinner', true, {root: true});
            await axios.post('api/todos/', todo).then((res) => {
                commit('addTodo', res.data.data);
                commit('showLoadingSpinner', false, {root: false});
                commit('showModal', false, {root: false});
            }).catch(err => {
                commit('showLoadingSpinner', false, {root: false});
                console.log(err);
            });
        },
        async removeTodo({commit}, id) {
            commit('showLoadingSpinner', true, {root: true});
            await axios.delete('api/todos/' + id).then(res => {
                commit('removeTodo', id);
                commit('showLoadingSpinner', false, {root: false});
            }).catch(err => {
                console.log(err);
                commit('showLoadingSpinner', false, {root: false});
            });
        },
        async updateTodo({commit}, updatedTodo) {
            commit('showLoadingSpinner', true, {root: true});
            await axios.put('api/todos/' + updatedTodo.id, updatedTodo).then(res => {
                commit('updateTodo', res.data.data);
                commit('showModal', false, {root: false});
                commit('showLoadingSpinner', false, {root: false});
            }).catch(err => {
                error.value = err.response.data.message;
                commit('showLoadingSpinner', false, {root: false});
            });
        },

        async archTodo({commit}, updatedTodo) {
            commit('showLoadingSpinner', true, {root: true});
            await axios.put('api/todos/' + updatedTodo.id, updatedTodo).then(res => {
                res.data.data.archive ? commit('removeTodo', updatedTodo.id) : '';
                commit('showLoadingSpinner', false, {root: false});
            }).catch(err => {
                error.value = err.response.data.message;
                commit('showLoadingSpinner', false, {root: false});
            });
        },

        async unarchTodo({commit}, updatedTodo) {
            commit('showLoadingSpinner', true, {root: true});
            await axios.put('api/todos/' + updatedTodo.id, updatedTodo).then(res => {
                !res.data.data.archive ? commit('removeArchiveTodo', updatedTodo.id) : '';
                commit('showLoadingSpinner', false, {root: false});
            }).catch(err => {
                error.value = err.response.data.message;
                commit('showLoadingSpinner', false, {root: false});
            });
        },

    },
    mutations: {
        setTodos: (state, todos) => (state.todos = todos),
        setArchivedTodos: (state, todos) => (state.archivedTodos = todos),
        addTodo: (state, newTodo) => {
            state.todos.unshift(newTodo);
        },
        removeTodo: (state, id) => state.todos = state.todos.filter((todo) => todo.id !== id),
        removeArchiveTodo: (state, id) => state.archivedTodos = state.archivedTodos.filter((todo) => todo.id !== id),
        updateTodo: (state, updatedTodo) => {
            const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
            if (index !== -1) {
                state.todos.splice(index, 1, updatedTodo);
            }
        },
        updateArchiveTodo: (state, updatedArchiveTodo) => {
            const index = state.archivedTodos.findIndex((todo) => todo.id === updatedArchiveTodo.id);
            if (index !== -1) {
                state.archivedTodos.splice(index, 1, updatedArchiveTodo);
            }
        },
    },
}

export default todosModule;
