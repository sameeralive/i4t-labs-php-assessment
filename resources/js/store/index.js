import {createStore} from "vuex";
import tokenModule from "../store/modules/token";
import todosModule from "../store/modules/todos";

export default createStore({
    modules: {
        token: tokenModule,
        todos: todosModule,
    }
})
