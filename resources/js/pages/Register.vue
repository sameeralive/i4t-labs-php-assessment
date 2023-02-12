<template>
    <div>
        <div class="container">
            <div class="row mt-4 justify-content-center">
                <div class="col-md-6">
                    <h3 class="text-center mb-4">Register</h3>
                    <form action="#" @submit.prevent="handleRegister">
                        <div class="form-group mb-3">
                            <input type="text" class="form-control" id="name" v-model="form.name"
                                   aria-describedby="nameHelp" placeholder="Enter name">
                        </div>
                        <div class="form-group mb-3">
                            <input type="email" class="form-control" id="exampleInputEmail1" v-model="form.email"
                                   aria-describedby="emailHelp" placeholder="Enter email">
                        </div>
                        <div class="form-group mb-3">
                            <input type="password" class="form-control" id="exampleInputPassword1"
                                   v-model="form.password" placeholder="Password">
                        </div>
                        <div class="form-group mb-3">
                            <input type="password" class="form-control" id="exampleInputPassword2"
                                   v-model="form.password_confirmation" placeholder="Confirm Password">
                        </div>
                        <p class="bg-danger text-light text-center py-1 small" v-if="error">{{ error }}</p>
                        <button type="submit" class="btn btn-primary w-100">Register</button>
                        <router-link to="/login" class="btn btn-outline-primary w-100 mt-2">Log In</router-link>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {reactive, ref} from "vue";
import {useRouter} from 'vue-router'
import {mapActions, useStore} from "vuex";

export default {

    setup() {
        const router = useRouter();
        const store = useStore();

        let form = reactive({
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        });

        let error = ref('')

        const handleRegister = async () => {
            await axios.post('api/register', form).then(res => {
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
            handleRegister,
            error
        }
    },

}
</script>

<style scoped>

</style>
