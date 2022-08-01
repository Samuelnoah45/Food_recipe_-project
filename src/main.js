import { createApp, provide, h,watch } from 'vue'
import { DefaultApolloClient } from "@vue/apollo-composable";
import App from './App.vue'
import { apolloClient } from "../apollo/config";
import router from './router';
import VueAwesomePaginate from "vue-awesome-paginate";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fab);
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(far);
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();

import fileBase64 from 'vue-file-base64';
import { createPinia } from 'pinia'
import "vue-awesome-paginate/dist/style.css";
import './assets/tailwind.css'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const pinia = createPinia()

if (localStorage.getItem("state")) {
  pinia.state.value=JSON.parse(localStorage.getItem("state"))

}

watch(pinia.state, (state) =>
{
   localStorage.setItem("state",JSON.stringify(state))
}, {
  deep:true
})

library.add(fas)
const app=createApp({
     setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
})
app.use(VueAwesomePaginate)
app.component('font-awesome-icon',FontAwesomeIcon)
app.component('fileBase64',fileBase64)
app.use(pinia)
app.use(router)
app.mount('#app')
