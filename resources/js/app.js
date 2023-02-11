import './bootstrap';
import {createApp} from "vue";
import App from "./layouts/App.vue";
import router from "./router";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from "./store";
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faPlus, faTrash} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faPlus, faTrash)

createApp(App)
    .use(router)
    .use(store)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount("#app");
