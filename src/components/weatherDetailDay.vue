<template>
  <div class="card-detail-weather-wrapper">
    <router-link tag="button"  to="/">Back to Home</router-link>
      <div v-for="weatherList in getWeather" :key="weatherList.dt" class="card-detail-weather">
        <div v-for="weatherDay in weatherList" :key="weatherDay.dt" >
          <v-card v-if="detailId == weatherDay.dt_txt.slice(0, 10)">
              <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-4">
                            {{getWeekDay(weatherDay.dt)}} 
                            {{weatherDay.dt_txt.slice(10, 16)}}
                        </div>
                        <v-list-item-title class="headline mb-1">
                            {{getWeatherCity.name}}
                        </v-list-item-title>
                        <v-list-item-content :key="weather.id" v-for="weather in weatherDay.weather">
                            <v-list-item-subtitle>
                               Temperature {{parseTemperature(weatherDay.main.temp)}}&#8451;
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                               Description {{weather.description}}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                               Humidity {{weatherDay.main.humidity}} %
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                                Pressure {{weatherDay.main.pressure}} mm
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                                Wind speed {{weatherDay.wind.speed}} m/s
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                                Sunrise {{parseTime(getWeatherCity.sunrise)}} 
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                                Sunset {{parseTime(getWeatherCity.sunset)}} 
                            </v-list-item-subtitle>
                            <v-img :src="`http://openweathermap.org/img/wn/${weather.icon}@2x.png`" max-height="100" max-width="100"></v-img>
                        </v-list-item-content>
                    </v-list-item-content>
                </v-list-item>
          </v-card>
        </div>
      </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import parseTemperature from '../mixins/parseTemperature.js'
import getWeekDay from '../mixins/getWeekDay.js'

export default {
  name: 'weatherDetailDay',
  data: () => ({
    detailId: 0
  }),
  mixins: [parseTemperature, getWeekDay],
  mounted(){
    this.detailId = this.$route.params.date
  },
  computed: {
    ...mapGetters(['getWeather', 'getWeatherCity']),
  },
  methods:{
    parseTime(date){
        const dateData = new Date(date * 1000)
        const parseDate = `${dateData.getHours()}:${dateData.getMinutes()}`
        return parseDate
    }
  }
}
</script>