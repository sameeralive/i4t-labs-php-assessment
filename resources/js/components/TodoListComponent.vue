<template>
    <div class="heading">
        <h5 id="title">Todo List
            <router-link to="/todo-create" class="btn btn-primary btn-sm float-end">
                <font-awesome-icon icon="plus"/>
            </router-link>
        </h5>
    </div>

    <div class="mt-2">
        <div v-for="(todo, index) in todosList" :key="index">
            <todo-list-view
                :todo="todo"
                class="item"
            />
        </div>

    </div>

</template>

<script>
import TodoListView from "../components/TodoListView.vue";
import {mapActions, mapGetters} from "vuex";

export default {
    components: {TodoListView},
    data: function () {
        return {
            todoList: {},
        }
    },
    methods: {
        ...mapActions(['fetchTodos'])

    },
    computed: mapGetters(['todosList']),
    created() {
        this.fetchTodos();
    }
}
</script>

<style lang="scss" scoped>
@import "../style";


.item {
    background: $clr-5;
    padding: 15px;
    margin-bottom: 5px;
}

</style>
