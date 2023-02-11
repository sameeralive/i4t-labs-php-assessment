<template>
    <div class="heading">
        <h5 id="title">Todo List
            <router-link to="/todo-create" class="btn btn-primary btn-sm float-end">
                <font-awesome-icon icon="plus"/>
            </router-link>
        </h5>
    </div>

    <div class="mt-2">
        <div v-for="(todo, index) in todoList.data" :key="index">
            <todo-list-view
                :todo="todo"
                class="item"
                v-on:itemChanged="getList"
            />
        </div>
        <Bootstrap5Pagination
            :data="todoList"
            @pagination-change-page="getList"
        />

    </div>

</template>

<script>
import TodoListView from "../components/TodoListView.vue";
import { Bootstrap5Pagination } from 'laravel-vue-pagination';

export default {
    components: {TodoListView, Bootstrap5Pagination},
    data: function () {
        return {
            todoList: {},
        }
    },

    methods: {
        getList(page = 1) {
            axios.get('api/todos?page=' + page).then(res => {
                this.todoList = res.data;
            }, err => {
                console.log(err);
            })
        }
    },

    mounted() {
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
