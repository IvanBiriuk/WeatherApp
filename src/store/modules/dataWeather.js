export default {
    // namespaced: true,
    state: {
        weatherData: []
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
        async weatherFetch({commit}, payload={city: '', lat: '', lon: ''}){
          let keyApi = '715e6ecaea229f61952fba7d191d7c22'
          let {city, lat, lon} =  payload
          let resp = 
                city != '' ? await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=40&appid=${keyApi}`) :
                             await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=40&appid=${keyApi}`) 
              let weatherAllDate =  await resp.json()
              let draftDataWeather = weatherAllDate.list
              let cityData = weatherAllDate.city
              let currentDate = ''
              let dayWeather = []
              let weatherData = []
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
       }
    }
}