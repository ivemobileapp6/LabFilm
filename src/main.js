import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/dist/quasar.css'
import router from './route'
import {createStore} from 'vuex'
// import './assets/main.css'

const sessionStore = createStore({
  state:{
    session: null
  },
  getters: {
    getSession: state => {
      return state.session
    }
  },
  mutations: {
    updateSession(state, keyRole){
      state.session = keyRole
    }
  }
})
// createApp(App).user(router).use(Quasar).mount('#app')
const app = createApp(App);
app.use(router);
app.use(Quasar);
app.use(sessionStore);
app.mount('#app');
