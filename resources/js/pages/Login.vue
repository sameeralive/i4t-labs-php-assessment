<template>
    <div>
        <div class="container">
            <div class="row mt-4 justify-content-center">
                <div class="col-md-6">
                    <h3 class="text-center mb-4">Sign In</h3>
                    <form action="#" @submit.prevent="handleLogin">
                        <div class="form-group mb-3">
                            <input type="email" class="form-control" id="exampleInputEmail1" v-model="form.email"
                                   aria-describedby="emailHelp" placeholder="Enter email">
                        </div>
                        <div class="form-group mb-3">
                            <input type="password" class="form-control" id="exampleInputPassword1"
                                   v-model="form.password" placeholder="Password">
                        </div>
                        <p class="bg-danger text-light text-center py-1 small" v-if="error">{{ error }}</p>
                        <button type="submit" class="btn btn-primary w-100">Sign In</button>
                        <router-link to="/register" class="btn btn-outline-primary w-100 mt-2">Register</router-link>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {reactive, ref} from "vue";
import {useRouter} from 'vue-router'
import {useStore} from "vuex";

export default {
    setup() {
        const router = useRouter();
        const store = useStore();

        let form = reactive({
            email: '',
            password: '',
        });

        let error = ref('')

        const handleLogin = async () => {
            await axios.post('api/login', form).then(res => {
                if (res.data.success) {
                    store.dispatch('setToken', res.data.data.token)
                    router.push({name: 'Home'})
                }
            }, err => {
                error.value = err.response.data.message;
            })
        }
        return {
            form,
            handleLogin,
            error
        }
    },

}
</script>

<style scoped>

</style>
