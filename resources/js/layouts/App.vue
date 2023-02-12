<template>
    <div class="col-md-12">
        <div class="row m-0">
            <div class="col-md-3 left-pannel p-0" v-if="getToken">
                <div class="user-data">
                    <img src="../assets/img/user-icon.jpg" alt="user-icon">
                    <h4>Admin</h4>
                    <p>sameera@gmail.com</p>
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

                <div class="categories-section">
                    <h4>Categories</h4>
                    <ul class="mt-4">
                        <li>Work</li>
                        <li>Personal</li>
                        <li>Important</li>
                    </ul>
                </div>
            </div>
            <div class="px-0" :class="getToken ? 'col-md-9' : 'col-md-12'">
                <div v-if="getToken" class="nav-section px-3">
                    <nav class="navbar navbar-expand-lg bg-body-tertiary">
                        <div class="container-fluid">
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
                                        <router-link class="nav-link" to="/archived-todo-list">Archived List
                                        </router-link>
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

                <div class="p-3">
                  <loader v-if="showLoading"></loader>
                    <router-view></router-view>
                </div>

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
    border-right: 1px solid rgba($clr-2, 0.2);
    min-height: 100vh;
}

.user-data {
    text-align: center;
    padding: 25px;

    img {
        max-width: 120px;
    }
}

.data-summary {
    border-bottom: 1px solid rgba($clr-2, 0.2);
    padding-left: 0;
    text-align: center;

    li {
        display: inline-block;
        width: 80px;
        padding: 15px;
        text-align: center;

        p {
            font-size: 13px;
        }
    }
}

.categories-section {
    padding: 15px;

    h4 {
        text-align: center;
    }

    ul {
        list-style: none;

        li::before {
            content: '';
            display: inline-block;
            width: 40px;
            height: 15px;
            color: $clr-2;
            background: $clr-2;
            margin-right: 10px;
        }
    }
}

.nav-section {
    border-bottom: 1px solid rgba($clr-2, 0.2);
    .nav-link {
        font-weight: 700;
        font-size: 17px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
}

</style>
