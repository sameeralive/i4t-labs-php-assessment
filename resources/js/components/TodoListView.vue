<template>
    <div class="item"
         :class="todo.completed ? 'completed': '', todo.important ? 'important': ''"
         @dblclick="!todo.archive ? updateCompleteStatus(todo, listType): ''"
    >
        <div class="form-check">
            <label class="form-check-label" for="important">
                {{ todo.name }}
                <span>
                    <small>
                        ({{ todo.date ? todo.date : '' }} {{ todo.time ? todo.time : '' }})
                    </small>
                </span>
            </label>
            <p class="mb-0 float-start me-2" v-if="todo.completed"><small>Completed</small></p>
            <button v-if="!todo.archive" class="btn btn-sm btn-danger float-end ms-1" @click="removeTodo(todo.id)">
                <font-awesome-icon icon="trash"/>
            </button>
            <button v-if="!todo.completed" @click="editTodo(todo)" class="btn btn-primary btn-sm float-end ms-1">
                <font-awesome-icon icon="edit"/>
            </button>
            <button v-if="!todo.archive" class="btn btn-secondary btn-sm float-end ms-1" @click="archiveTodo(todo)">
                <font-awesome-icon icon="archive"/>
            </button>
            <button v-if="todo.archive" class="btn btn-secondary btn-sm float-end ms-1" @click="unarchiveTodo(todo)">
                <font-awesome-icon icon="archive"/>
            </button>

        </div>
    </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {mapActions} from "vuex";

export default {
    components: {FontAwesomeIcon},
    props: ['todo', 'listType'],
    methods: {
        ...mapActions(["removeTodo", "updateTodo", "archTodo", "unarchTodo"]),
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
        unarchiveTodo(todo) {
            let updatedTodo = Object.assign({}, todo);
            updatedTodo.archive = false;
            this.unarchTodo(updatedTodo);
        },
        editTodo(todo) {
            this.$emit('todoData', todo);
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../style";

.completed {
    opacity: 0.5;

    label {
        text-decoration: line-through;
    }
}

.important {
    border-left: 5px solid $clr-3;
}
</style>
