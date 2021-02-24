<template>
    <div class="card-wrapper">
        <v-card :key="weatherList.dt" v-for="weatherList in getWeather" >
        <router-link :key="weatherDay.dt" :to="`/detail/${weatherDay.dt_txt.slice(0, 10)}`" class="mx-auto" max-width="344" outlined  v-for="(weatherDay, index) in weatherList">
            <v-list-item three-line  v-if="index == 0" >
                <v-list-item-content>
                    <div class="overline mb-4 date-block">
                      <span>
                        {{getWeekDay(weatherDay.dt)}}
                      </span>
                       <span>
                          {{new Date(weatherDay.dt).getDate()}}
                       </span>
                      <span>
                        {{getMounthName(weatherDay.dt)}} 
                      </span>
                    </div>
                    <v-list-item-content :key="weather.id" v-for="weather in weatherDay.weather">
                        <v-list-item-subtitle class="temp-block">
                          <span>
                            min<br>
                            {{minTemperature(weatherList)}}&#7506;
                          </span>
                          <span>
                            max<br>
                            {{maxTemperature(weatherList)}}&#7506;
                          </span>
                        </v-list-item-subtitle>
                        <v-img :src="imageWeather(weatherList)" max-height="100" max-width="100"></v-img>
                    
                        <v-list-item-subtitle >
                          More Info
                        </v-list-item-subtitle>
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
import getMounthName from '../mixins/getMounthName.js'

export default {
  name: 'weatherDayCard',
  props: ['getWeather', 'getWeatherCity'],
  data: () => ({
    draftDataWeather: []
  }),
  mixins: [parseTemperature, getWeekDay, getMounthName],
  async mounted(){
    this.getData
    this.draftDataWeather = this.getWeather.list
  },
  methods:{
    maxTemperature(weatherList){
    const maxTemp = []
      weatherList.filter(day =>{
        maxTemp.push(day.main.temp_max)
      })
      let maxTempCelsius = this.parseTemperature(Math.max(...maxTemp))
            maxTempCelsius = maxTempCelsius  > 0 ? '+' +maxTempCelsius : maxTempCelsius
      return maxTempCelsius
    },
    minTemperature(weatherList){
    const minTemp = []
      weatherList.filter(day =>{
        minTemp.push(day.main.temp_min)
      })
      let minTempCelsius = this.parseTemperature(Math.min(...minTemp))
            minTempCelsius = minTempCelsius  > 0 ? '+' +minTempCelsius : minTempCelsius
      return minTempCelsius
    },
    imageWeather(weatherList){
      let icons = [];
      let currentIcon = '';
        weatherList.filter((day, index) => {
            icons.push(day.weather[0].icon)
        })
      let icon = icons.sort((iconA,iconB) =>
                  icons.filter(icon => icon===iconA).length
                - icons.filter(icon => icon===iconB).length
              ).pop()
      return `http://openweathermap.org/img/wn/${icon}@2x.png`
    }
  }
}
</script>
<style lang="scss">
 .card-wrapper {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-gap: 10px;
        max-width: 1024px;
        margin: 30px auto;
        .v-card{
          .date-block{
            display: flex;
            flex-direction: column;
          }
          .v-list-item__content{
             text-align: center;
          }
          .v-list-item__content{
             justify-content: center;
           }
          .temp-block{
              display: grid;
              grid-template-columns: 1fr 1fr;
              justify-content: space-between;
              align-items: center;
              text-align: center;
            }
        }
    }
</style>