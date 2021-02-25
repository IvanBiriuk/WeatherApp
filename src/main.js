import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import VueGeolocationApi from 'vue-geolocation-api'

Vue.use(VueGeolocationApi)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
