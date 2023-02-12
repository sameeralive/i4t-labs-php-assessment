const todosModule = {
    state: {
        todos: [],
    },
    getters: {
        todosList: (state) => {
            return state.todos
        }
    },
    actions: {
        async fetchTodos({commit}) {
            axios.get('api/todos').then(res => {
                commit('setTodos', res.data);
            }, err => {
                console.log(err);
            })
        },
        async addTodo({commit}, todo) {
            axios.post('api/todos/', todo).then(res => {
                commit('removeTodo', id);
                router.push({name: 'Home'})
            }).catch(err => {
                console.log(err);
            });
        },
        async removeTodo({commit}, id) {
            axios.delete('api/todos/' + id).then(res => {
                commit('removeTodo', id);
            }).catch(err => {
                console.log(err);
            });
        },
        async updateTodo({commit}, updatedTodo) {
            axios.put('api/todos/' + updatedTodo.id, updatedTodo).then(res => {
                commit('addTodo', res.data.data);
            }).catch(err => {
                error.value = err.response.data.message;
            });
        },

    },
    mutations: {
        setTodos: (state, todos) => (state.todos = todos),
        addTodo: (state, newTodo) => state.todos.unshift(newTodo),
        removeTodo: (state, id) => state.todos = state.todos.filter((todo) => todo.id !== id),
        updateTodo: (state, updatedTodo) => {
           const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
            if (index !== -1) {
                state.todos.splice(index, 1, updatedTodo);
            }
        },
    },
}

export default todosModule;
