export default {
    namespaced: true,
    state: {
        weatherData: []
    },
    mutations: {
      featchWeather(state, weatherData){
        state.weatherData = weatherData
      }
    },
    getters:{
        getWeather(state){
          return state.weatherData
        }
    },
    actions: {
        async weatherFetch({commit}, payload={city: '', lat: '', lon: '', count}){
          const keyApi = '715e6ecaea229f61952fba7d191d7c22'
          const {city, lat, lon, count} =  payload
          
          let resp = 
                city != '' ? await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=${count ? count : 1}&appid=${keyApi}`) :
                             await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=${count ? count : 1}&appid=${keyApi}`) 
          const weatherData = await resp.json()
          console.log('weatherData', weatherData);

          commit('featchWeather', weatherData);
       }
    }
}