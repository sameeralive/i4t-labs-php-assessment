<template>
    <div class="heading">
        <h5 id="title">Todo List
            <router-link to="/todo-create" class="btn btn-primary btn-sm float-end">
                <font-awesome-icon icon="plus"/>
            </router-link>
        </h5>
    </div>

    <div class="mt-2">
        <div v-for="(todo, index) in todoList" :key="index">
            <todo-list-view
                :todo="todo"
                class="item"
                v-on:itemChanged="getList"
            />
        </div>
    </div>

</template>

<script>
import TodoListView from "../components/TodoListView.vue";
export default {
    components: {TodoListView},
    data: function () {
        return {
            todoList: [],
        }
    },

    methods: {
        getList() {
            axios.get('api/todos').then(res => {
                this.todoList = res.data;
            }, err => {
                console.log(err);
            })
        }
    },

    created() {
        this.getList();
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
