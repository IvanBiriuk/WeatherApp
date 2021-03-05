<template>
  <div class="card-detail-weather-wrapper">
    <router-link tag="button" class="back-button" to="/"><v-icon>mdi-arrow-left-box</v-icon>Home</router-link>
    <div class="header-content-detail-weather" v-if="dayName">
      <h3>{{cityName}}</h3>
      <div class="date-info">
        <span>
          {{dayName}}
        </span>
        <span class="number-day">
          {{numberDay}}
        </span>
        <span>
          {{mounthName}}
        </span>
      </div>
    </div>
    <transition-group name="list" >
    <div class="card-detail-weather" :key="weatherLists.id" v-for="weatherLists in getWeatherData" v-if="weatherLists.cityData.name == cityName">
         <transition name="slide-fade" tag="v-card" v-if="detailDate == weatherDay.dt_txt.slice(0, 10)"   v-for="(weatherDay, index) in weatherLists.weatherData.flat()" :key="index">
              <v-list-item >
                    <v-list-item-content class="weather-info-wrapper">
                        <div class="time-block">
                            <b>{{weatherDay.dt_txt.slice(10, 16)}}</b>
                        </div>
                        <v-list-item-content :key="weather.id" v-for="weather in weatherDay.weather" class="weather-info-block">
                            <v-img :src="`http://openweathermap.org/img/wn/${weather.icon}@2x.png`" max-height="50" max-width="50"></v-img>
                            <v-list-item-subtitle>
                                Pressure: <b>{{weatherDay.main.pressure}} mm</b>
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                               Description: <b>{{weather.description}}</b>
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                               Humidity: <b>{{weatherDay.main.humidity}} %</b>
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                               Temperature: <b>{{parseTemperature(weatherDay.main.temp)}}&#8451;</b>
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                                Wind speed: <b>{{weatherDay.wind.speed}} m/s</b>
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                                Sunrise: <b>{{parseTime(weatherLists.cityData.sunrise)}} </b>
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                                Sunset: <b>{{parseTime(weatherLists.cityData.sunset)}} </b>
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item-content>
                </v-list-item>
          </transition>
    </div>
    </transition-group>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import parseTemperature from '../mixins/parseTemperature.js'
import getWeekDay from '../mixins/getWeekDay.js'
import getMounthName from "../mixins/getMounthName.js"

export default {
  name: 'weatherDetailDay',
  data: () => ({
    detailDate: 0,
    getWeatherData: [],
    cityName: '',
    dayName: '',
    mounthName: '',
    numberDay: ''
  }),
  mixins: [parseTemperature, getWeekDay, getMounthName],
  async mounted(){
    this.detailDate = this.$route.params.date.split('&')[1]
    this.cityName = this.$route.params.date.split('&')[0]
    this.getWeatherData = await this.getWeather
    await this.getDayAndMounth()
  },
  computed: {
    ...mapGetters(['getWeather']),
  },
  methods:{
    getDayAndMounth(){
      this.getWeatherData.filter(days => {
          days.weatherData.flat().filter(day => {
            if(this.detailDate === day.dt_txt.slice(0, 10)){
              this.dayName = this.getWeekDay(day.dt)
              this.mounthName = this.getMounthName(day.dt)
              this.numberDay = new Date(day.dt * 1000).getDate()
            }
        })
      })
    },
    parseTime(date){
        const dateData = new Date(date * 1000)
        const parseDate = `${dateData.getHours()}:${dateData.getMinutes()}`
        return parseDate
    }
  }
}
</script>
 