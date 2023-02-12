<template>
    <div class="px-3 py-5">
        <div class="mb-4 text-center">
            <h5 id="title" v-if="!form.id">Todo Create</h5>
            <h5 id="title" v-if="form.id">Todo Update</h5>
        </div>
        <form action="#" @submit.prevent="handleTodoCreate">
            <div class="mb-3">
                <input type="text" placeholder="Enter your text" class="form-control" v-model="form.name" required>
            </div>
            <div class="mb-3">
                <input type="date" class="form-control" v-model="form.date">
            </div>
            <div class="mb-3">
                <input type="time" class="form-control" v-model="form.time">
            </div>
            <div class="mb-3 form-check">
                <input class="form-check-input" type="checkbox" :checked="form.important" v-model="form.important"
                       id="important">
                <label class="form-check-label" for="important">
                    Important
                </label>
            </div>
            <div class="col-md-12 text-end">
                <button @click="toggleModal(false)" class="btn btn-outline-secondary btn-sm" id="button-cancel">
                    Cancel
                </button>
                <button class="btn btn-outline-success btn-sm ms-1" type="submit" id="button-save">
                    Save
                </button>
            </div>
        </form>
    </div>
</template>

<script>

import {mapActions, mapState} from "vuex";
import store from "../store";

export default {
    props: ['todo'],
    data() {
        return {
            form: {
                name: '',
                date: '',
                time: '',
                important: false,
            }
        }
    },
    mounted() {
        if (this.todo) {
            this.form = Object.assign({}, this.form, this.todo);
        }
    },
    methods: {
        ...mapState({
            showModal: state => state.showModal,
        }),
        ...mapActions(['addTodo', 'updateTodo']),
        handleTodoCreate() {
            if (this.form.id) {
                this.updateTodo(this.form);
            } else {
                this.addTodo(this.form);
            }
        },
        toggleModal(val) {
            store.commit('showModal', val, {root: true});
        }
    },
}
</script>

<style lang="scss" scoped>
@import "../style";

</style>
