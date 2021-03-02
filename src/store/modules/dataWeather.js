export default {
    // namespaced: true,
    state: {
        weatherData: [],
        loading: true,
        notFoundCity: ''
    },
    mutations: {
      featchWeather(state, weatherData){
        !state.weatherData.some(element => element.id == weatherData.id) ?
        state.weatherData.unshift(weatherData) :
        null
      }
    },
    getters:{
        getWeather(state){
          return state.weatherData
        }
    },
    actions: {
        async weatherFetch({commit, state}, payload={city: '', lat: '', lon: ''}){
          state.loading = true
          const key = process.env.VUE_APP_WEATHER
          const {city, lat, lon} =  payload
          const resp = 
                city != '' ? await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=40&appid=${key}`) :
                             await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=40&appid=${key}`) 
              await resp.json().then(res => {
                const draftDataWeather = res.list
                const cityData = res.city
                let currentDate = ''
                let dayWeather = []
                const weatherData = []
                for(let i=0; i <= 5; i++){
                  currentDate = draftDataWeather[0].dt_txt.slice(0, 10)
                  dayWeather = draftDataWeather.filter(el => {
                    if(el.dt_txt.slice(0, 10) === currentDate){
                      return el
                    }
                })
                  weatherData.push(dayWeather)
                  draftDataWeather.splice(0, dayWeather.length)
                }
                commit('featchWeather', {id: cityData.id ,cityData, weatherData});
                state.loading=false
                state.notFoundCity = ''
              }).catch(err => {
                city != '' ? state.notFoundCity = `Not Found "${city}"` : null
            })
       }
    }
}