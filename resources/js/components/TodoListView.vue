<template>
    <div class="item" :class="todo.completed ? 'completed': ''" @dblclick="updateCompleteStatus(todo)">
        <div class="form-check">
            <label class="form-check-label" for="important">
                {{ todo.name }}
            </label>
            <button class="btn btn-sm btn-danger float-end ms-1" @click="removeTodo(todo.id)">
                Delete
            </button>
            <router-link v-if="!todo.completed" :to="{path: '/todo/'+todo.id+'/edit'}" class="btn btn-primary btn-sm float-end ms-1">
                Edit
            </router-link>
            <button v-if="!todo.completed" class="btn btn-secondary btn-sm float-end ms-1" @click="archiveTodo()">
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
        ...mapActions(["removeTodo", "updateTodo"]),
        updateCompleteStatus(todo) {
            let updatedTodo = Object.assign({}, todo);
            updatedTodo.completed = !updatedTodo.completed;
            this.updateTodo(updatedTodo);
        },

        archiveTodo() {
            this.todo.archive = true;
            this.updateCompleteStatus();
        },
        editTodo() {

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
