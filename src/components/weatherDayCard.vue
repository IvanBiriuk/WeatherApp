<template>
    <div class="card-wrapper">
        <v-card :key="weatherList.dt" v-for="weatherList in getWeather" >
        <router-link :key="weatherDay.dt" :to="`/detail/${weatherDay.dt}`" class="mx-auto" max-width="344" outlined  v-for="weatherDay in weatherList">
            <v-list-item three-line>
                <v-list-item-content>
                    <div class="overline mb-4">
                        {{getWeekDay(weatherDay.dt)}}
                    </div>
                    <v-list-item-title class="headline mb-1">
                        {{getWeatherCity.name}}
                    </v-list-item-title>
                    <v-list-item-content :key="weather.id" v-for="weather in weatherDay.weather">
                        <v-list-item-subtitle>
                            {{parseTemperature(weatherDay.main.temp)}}&#8451;
                        </v-list-item-subtitle>
                        <v-list-item-subtitle>
                            {{weather.description}}
                        </v-list-item-subtitle>
                        <v-img :src="`http://openweathermap.org/img/wn/${weather.icon}@2x.png`" max-height="100" max-width="100"></v-img>
                    </v-list-item-content>

                </v-list-item-content>
            </v-list-item>
        </router-link>
        </v-card>

        <router-view/>
    </div>
</template>

<script>
import parseTemperature from '../mixins/parseTemperature.js'
import getWeekDay from '../mixins/getWeekDay.js'
export default {
  name: 'weatherDayCard',
  props: ['getWeather', 'getWeatherCity'],
  data: () => ({
    draftDataWeather: []
  }),
  mixins: [parseTemperature, getWeekDay],
  async mounted(){
    this.getData
    this.draftDataWeather = this.getWeather.list
  },
  computed:{
    getData(){
      console.log('getWeather', this.getWeather);
    }
  },
  methods:{
    
  }
}
</script>
<style lang="scss">
 .card-wrapper {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 10px;
        .show-more{
          font-size: 30px;
          font-weight: bold;
          display: none ;
          align-items: center;
          justify-content: center;
          &.visible{
            display: flex;
          }
        }
    }
</style>