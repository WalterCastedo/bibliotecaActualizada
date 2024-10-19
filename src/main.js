import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import 'vue-chartjs';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'



/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)
/* import font awesome icon component */


/* import specific icons */
import { faBook,faListCheck, faUserLarge , faPenToSquare, faTrashCan, faFilePdf,faFileExcel, faPlus,faPen} from '@fortawesome/free-solid-svg-icons'


/* add icons to the library */
library.add(faBook, faListCheck,faUserLarge,faPenToSquare,faTrashCan,faFilePdf,faFileExcel,faPlus,faPen)
Vue.config.productionTip = false


Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";


Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
Vue.config.devtools = false;


