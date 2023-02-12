<template>
    <div>
        <div class="container">
            <div class="top-bar" v-if="getToken">
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">Navbar</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" @click="visible = !visible"
                                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="navbar-collapse justify-content-between" :class="!visible?'collapse':''" id="navbarNav">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <router-link class="nav-link" to="/">Todo List</router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link class="nav-link" to="/archived-todo-list">Archived List</router-link>
                                </li>
                            </ul>
                            <ul class="navbar-nav  float-end">
                                <li class="nav-item">
                                    <router-link to="#" class="nav-link" @click="removeToken">logout</router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

            <!--        <router-link class="btn" to="/">Home</router-link>-->
            <!--        <router-link class="btn" to="/login">Login</router-link>-->
            <!--        <router-link class="btn" to="/register">Register</router-link>-->
            <loader v-if="showLoading"></loader>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import Loader from "../components/Loader.vue";

export default {
    data(){
        return {
            visible: false
        }
    },
    components: {
        Loader,
    },
    methods: {
        ...mapActions(['getToken', 'removeToken'])
    },
    computed: {
        ...mapGetters(['getToken']),
        ...mapState({
            showLoading: state => state.showLoading
        })
    },
}
</script>

<style lang="scss" scoped>
@import "../style";

</style>
