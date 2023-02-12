<template>
    <div class="item" :class="todo.completed ? 'completed': ''" @dblclick="updateCompleteStatus(todo)">
        <div class="form-check">
            <label class="form-check-label" for="important">
                {{ todo.name }}
            </label>
            <button class="btn btn-sm btn-danger float-end ms-1" @click="removeTodo(todo.id)">
                Delete
            </button>
            <button v-if="!todo.completed" @click="editTodo(todo)" class="btn btn-primary btn-sm float-end ms-1">
                Edit
            </button>
            <button v-if="!todo.completed" class="btn btn-secondary btn-sm float-end ms-1" @click="archiveTodo(todo)">
                Archive
            </button>

        </div>
    </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {mapActions} from "vuex";

export default {
    components: {FontAwesomeIcon},
    props: ['todo'],
    methods: {
        ...mapActions(["removeTodo", "updateTodo", "archTodo"]),
        updateCompleteStatus(todo) {
            let updatedTodo = Object.assign({}, todo);
            updatedTodo.completed = !updatedTodo.completed;
            this.updateTodo(updatedTodo);
        },

        archiveTodo(todo) {
            let updatedTodo = Object.assign({}, todo);
            updatedTodo.archive = true;
            this.archTodo(updatedTodo);
        },
        editTodo(todo) {
            this.$emit('todoData', todo);
        }
    }
}
</script>

<style lang="scss" scoped>
    .completed {
        opacity: 0.5;
        label {
            text-decoration: line-through;
        }
    }
</style>
