<template>
    <div class="heading">
        <h5 id="title">Todo List
            <span @click="toggleModal(true)" class="btn btn-primary btn-sm float-end">
                <font-awesome-icon icon="plus"/>
            </span>
        </h5>
    </div>
    <p class="mt-4" v-if="todosList.length > 0">Double click to complete</p>
    <div v-if="showModal">
        <div class="slide-modal">
        </div>
        <div class="form-section">
            <todo-create-form :todo="todoToUpdate"></todo-create-form>
        </div>
    </div>

    <div class="mt-2">
        <h5 class="text-danger mt-4" v-if="todosList.length === 0">Todo list is empty!</h5>
        <div v-for="(todo, index) in todosList" :key="index">
            <todo-list-view
                :todo="todo"
                :listType="'todoList'"
                class="item"
                v-on:todoData="editTodo($event)"
            />
        </div>

    </div>

</template>

<script>
import TodoListView from "../components/TodoListView.vue";
import {mapActions, mapGetters, mapState} from "vuex";
import TodoCreateForm from "../components/TodoCreateForm.vue";
import store from "../store";

export default {
    components: {TodoListView, TodoCreateForm},
    data: function () {
        return {
            todoToUpdate: {},
        }
    },
    methods: {
        ...mapActions(['fetchTodos']),
        toggleModal(val){
            store.commit( 'showModal', val, {root: true});
        },
        editTodo(todo){
            if (todo) {
                this.todoToUpdate = todo;
                this.toggleModal(true);
            } else {
                this.todoToUpdate = {};
            }
        }
    },
    computed: {
        ...mapGetters(['todosList']),
        ...mapState({
            showModal: state => state.showModal,
        })
    },
    created() {
        this.fetchTodos();
    }
}
</script>

<style lang="scss" scoped>
@import "../style";



</style>
