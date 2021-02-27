import Vue from 'vue'
import Vuex from 'vuex'
import dataWeather from './modules/dataWeather'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    dataWeather,
  }
})
