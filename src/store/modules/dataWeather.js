export default {
    // namespaced: true,
    state: {
        weatherData: [],
        weatherDataCity: {}
    },
    mutations: {
      featchWeather(state, weatherData){
        state.weatherData = weatherData
      },
      featchWeatherCity(state, weatherDataCity){
        state.weatherDataCity = weatherDataCity
      }
    },
    getters:{
        getWeather(state){
          return state.weatherData
        },
        getWeatherCity(state){
          return state.weatherDataCity
        }
    },
    actions: {
        async weatherFetch({commit, dispatch}, payload={city: '', lat: '', lon: ''}){
          let keyApi = '715e6ecaea229f61952fba7d191d7c22'
          let {city, lat, lon} =  payload
          console.log('payload', payload)
          let resp = 
                city != '' ? await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=40&appid=${keyApi}`) :
                             await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=40&appid=${keyApi}`) 
            await resp.json().then(res =>{
              console.log('res', res)
              // dispatch('weatchFetchCity', res)
              let draftDataWeather = res.list
              let currentDate = ''
              let dayWeather = []
              let weekDays = []
              let cityWeather = res.city
              for(let i=0; i <= 5; i++){
              currentDate = draftDataWeather[0].dt_txt.slice(0, 10)
              dayWeather = draftDataWeather.filter(el => {
                if(el.dt_txt.slice(0, 10) === currentDate){
                  return el
                }
              })
              weekDays.push(dayWeather)
              draftDataWeather.splice(0, dayWeather.length)

            }
            console.log('weekDays', weekDays);
            
            commit('featchWeather', weekDays);
            commit('featchWeatherCity', cityWeather);
          })
       }
    }
}