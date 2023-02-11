<template>
    <div class="item">
        <div class="form-check">
            <input class="form-check-input" type="checkbox"
                   :checked="todo.completed"
                   v-model="todo.completed"
                   @change="updateCompleteStatus()"
            >
            <label class="form-check-label" for="important" :class="todo.completed ? 'text-decoration-line-through': ''">
                {{ todo.name }}
            </label>
            <button class="btn btn-sm btn-danger float-end ms-1" @click="removeTodo()">
<!--                <font-awesome-icon icon="trash"/>-->
                Delete
            </button>
            <button class="btn btn-primary btn-sm float-end ms-1" @click="editTodo()">
                Edit
            </button>
            <button class="btn btn-secondary btn-sm float-end ms-1" @click="archiveTodo()">
                Archive
            </button>

        </div>
    </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
export default {
    components: {FontAwesomeIcon},
    props: ['todo'],
    methods: {
        updateCompleteStatus(){
            axios.put('api/todos/' + this.todo.id, this.todo).then(res => {
                if (res.status === 200) {
                    this.$emit('itemChanged');
                }
            }).catch(err => {
                console.log(err);
            });
        },
        removeTodo(){
            axios.delete('api/todos/' + this.todo.id).then(res => {
                if (res.status === 200) {
                    this.$emit('itemChanged');
                }
            }).catch(err => {
                console.log(err);
            });
        },
        archiveTodo(){
            this.todo.archive = true;
            this.updateCompleteStatus();
        },
        editTodo(){

        }
    }
}
</script>

<style scoped>

</style>
