<template>
    <div class="heading">
        <h5 id="title">Archived Todo List</h5>
    </div>
    <div v-if="showModal">
        <div class="slide-modal">
        </div>
        <div class="form-section">
            <todo-create-form :todo="todoToUpdate"></todo-create-form>
        </div>
    </div>

    <div class="mt-2">
        <div v-for="(todo, index) in archivedTodosList" :key="index">
            <todo-list-view
                :todo="todo"
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
        ...mapActions(['fetchArchivedTodos']),
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
        ...mapGetters(['archivedTodosList']),
        ...mapState({
            showModal: state => state.showModal,
        })
    },
    created() {
        this.fetchArchivedTodos();
    }
}
</script>

<style lang="scss" scoped>
@import "../style";




</style>
