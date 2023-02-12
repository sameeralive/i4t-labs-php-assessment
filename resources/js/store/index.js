import {createStore} from "vuex";
import tokenModule from "../store/modules/token";
import todosModule from "../store/modules/todos";

export default createStore({
    modules: {
        token: tokenModule,
        todos: todosModule,
    },
    state() {
        return {
            showLoading: false,
            showModal: false,
        }
    },
    mutations: {
        showLoadingSpinner: (state, payload) => (state.showLoading = payload),
        showModal: (state, payload) => (state.showModal = payload),
    }
})
