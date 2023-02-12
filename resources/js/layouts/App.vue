<template>
    <div class="row">
        <div class="col-md-3 left-pannel p-0">
            <div class="user-data">
                <img src="../assets/img/user-icon.jpg" alt="user-icon">
                <h4>Admin</h4>
                <p>sam@gmail.com</p>
            </div>
            <ul class="data-summary">
                <li>
                    <h4>4</h4>
                    <p>To do tasks</p>
                </li>
                <li>
                    <h4>4</h4>
                    <p>Completed tasks</p>
                </li>
                <li>
                    <h4>4</h4>
                    <p>Archived tasks</p>
                </li>
            </ul>

        </div>
        <div class="col-md-9">
            <div v-if="getToken">
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">Navbar</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                                @click="visible = !visible"
                                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="navbar-collapse justify-content-between" :class="!visible?'collapse':''"
                             id="navbarNav">
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

            <div>
                <!--        <router-link class="btn" to="/">Home</router-link>-->
                <!--        <router-link class="btn" to="/login">Login</router-link>-->
                <!--        <router-link class="btn" to="/register">Register</router-link>-->
                <loader v-if="showLoading"></loader>
                <router-view></router-view>
            </div>

        </div>
    </div>


</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import Loader from "../components/Loader.vue";

export default {
    data() {
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

.left-pannel {
    border-right: 1px solid rgba($clr-2, 0.5);
}

.user-data {
    text-align: center;
    padding: 25px;
    img {
        max-width: 120px;
    }
}
.data-summary {
    border-bottom: 1px solid rgba($clr-2, 0.5);
    padding-left: 0;
    text-align: center;
    li{
        display: inline-block;
        width: 80px;
        padding: 15px;
        text-align: center;
        p{
            font-size: 13px;
        }
    }
}
</style>
