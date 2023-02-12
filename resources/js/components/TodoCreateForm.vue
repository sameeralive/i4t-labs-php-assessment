<template>
    <div class="heading mb-4">
        <h5 id="title">Todo Create</h5>
    </div>
    <form action="#" @submit.prevent="handleTodoCreate">
        <div class="mb-3">
            <input type="text" placeholder="Enter your text" class="form-control" v-model="form.name">
        </div>
        <div class="mb-3">
            <input type="date" class="form-control" v-model="form.date">
        </div>
        <div class="mb-3">
            <input type="time" class="form-control" v-model="form.time">
        </div>
        <div class="mb-3 form-check">
            <input class="form-check-input" type="checkbox" v-model="form.important" id="important">
            <label class="form-check-label" for="important">
                Important
            </label>
        </div>
        <button class="btn btn-outline-success btn-sm float-end ms-1" type="submit" id="button-save">
            Save
        </button>
        <router-link to="/" class="btn btn-outline-secondary btn-sm float-end" id="button-cancel">
            Cancel
        </router-link>
    </form>
</template>

<script>
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

export default {
    mounted() {
        console.log(this.$route.params.id);
        // In edit page get data by id from store
        if (this.$route.params.id) {
            this.getTodoData(this.$route.params.id)
        }
    },
    methods: {
        getTodoData(todoId) {
            console.log(this.store);
        }
    },
    setup() {
        const router = useRouter();

        let form = reactive({
            name: '',
            date: '',
            time: '',
            important: false,
        });

        let error = ref('')

        const handleTodoCreate = async () => {
            await axios.post('api/todos', form).then(res => {
                if (res.data.success) {
                    router.push({name: 'Home'})
                }
            }, err => {
                error.value = err.response.data.message;
            })
        }

        return {
            form,
            handleTodoCreate
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../style";

</style>
