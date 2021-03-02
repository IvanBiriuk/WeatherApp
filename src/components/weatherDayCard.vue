<template>
    <section class="weather-day-card" v-if="getWeatherData.length">
        <Loader v-if="$store.state.dataWeather.loading"/>

        <div v-else :key="weatherLists.id" class="card-wrapper" v-for="weatherLists in getWeatherData">
            <div class="header-card">
                <h3 class="city-name">
                    {{weatherLists.cityData.name}} 
                </h3>
                <button @click="removeItem(weatherLists.id)"><v-icon>mdi-close</v-icon></button>
            </div>
            
            <v-card :key="weatherList.dt" v-for="weatherList in weatherLists.weatherData" class="day-card">
                <router-link :key="weatherDay.dt" :to="`/detail/${weatherLists.cityData.name}&${weatherDay.dt_txt.slice(0, 10)}`" class="mx-auto" max-width="344" outlined v-for="(weatherDay, index) in weatherList">
                    <v-list-item three-line v-if="index == 0">
                        <v-list-item-content>
                            <div class="overline mb-4 date-block">
                                <span>
                                    {{getWeekDay(weatherDay.dt)}}
                                </span>
                                <span>
                                    {{new Date(weatherDay.dt * 1000).getDate()}}
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
                                <v-img :src="imageWeather(weatherList)" max-height="50" max-width="50"></v-img>

                                <v-list-item-subtitle>
                                    More Info
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
            </v-card>
            <router-view/>
        </div>
    </section>
</template>

<script>
    import parseTemperature from "../mixins/parseTemperature.js"
    import getWeekDay from "../mixins/getWeekDay.js"
    import getMounthName from "../mixins/getMounthName.js"
    import {mapGetters, mapActions } from 'vuex'

    export default {
        name: "weatherDayCard",
        data: () => ({
            getWeatherData: [],
        }),
        mixins: [
            parseTemperature, getWeekDay, getMounthName
        ],
        async mounted(){
            this.getWeatherData = await this.getWeather
            
        },
        computed: {
            ...mapGetters(['getWeather'])
        },
        methods: {
            maxTemperature(weatherList) {
                const maxTemp = []
                weatherList.filter(day => {
                    maxTemp.push(day.main.temp_max)
                })
                let maxTempCelsius = this.parseTemperature(Math.max(... maxTemp))
                maxTempCelsius = maxTempCelsius > 0
                    ? "+" + maxTempCelsius
                    : maxTempCelsius
                return maxTempCelsius
            },
            minTemperature(weatherList) {
                const minTemp = []
                weatherList.filter(day => {
                    minTemp.push(day.main.temp_min)
                })
                let minTempCelsius = this.parseTemperature(Math.min(... minTemp))
                minTempCelsius = minTempCelsius > 0
                    ? "+" + minTempCelsius
                    : minTempCelsius
                return minTempCelsius
            },
            imageWeather(weatherList) {
                let icons = [];
                let currentIcon = "";
                weatherList.filter((day, index) => {
                    icons.push(day.weather[0].icon)
                })
                let icon = icons.sort((iconA, iconB) => icons.filter(icon => icon === iconA).length - icons.filter(icon => icon === iconB).length).pop()
                return `http://openweathermap.org/img/wn/${icon}@2x.png`
            },
            removeItem(id){
              this.getWeatherData.filter((weatherLists, index) =>{
                if(id==weatherLists.id){
                  this.getWeatherData.splice(index,1)
                }
              })
            }
    }
}
</script>