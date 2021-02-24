export default {
    namespaced: true,
    state: {
      weatherDataCity: {},
    },
    mutations: {
      featchWeatherCity(state, weatherDataCity){
        state.weatherDataCity = weatherDataCity
      }
    },
    getters:{
      getWeatherCity(state){
        return state.weatherDataCity
      }
    },
    actions: {
      weatchFetchCity({commit}, peyload){
        let {city} =  peyload;
        commit('featchWeatherCity', city);
      }
    }
}