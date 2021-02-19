<template>
  <div class="card-wrapper">
    <router-link tag="v-card"  :to="`/detail/${weatherList.dt}`" :key="weatherList.dt" class="mx-auto" max-width="344" outlined v-for="weatherList in getWeather.list">
                <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-4">
                            Weaher
                        </div>
                        <v-list-item-title class="headline mb-1">
                            {{getWeather.city.name}}
                        </v-list-item-title>
                        <v-list-item-content :key="weather.id" v-for="weather in weatherList.weather">
                            <v-list-item-subtitle>
                                {{weather.main}}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                                {{weather.description}}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle></v-list-item-subtitle>
                            <v-img :src="`http://openweathermap.org/img/wn/${weather.icon}@2x.png`" max-height="100" max-width="100"></v-img>
                        </v-list-item-content>

                    </v-list-item-content>
                </v-list-item>
            </router-link>
      <router-view/>
       <v-card  v-if="getWeather.list" :class="{visible: visibility}" @click="showMoreCity()"  class="mx-auto show-more" max-width="344" outlined >
              + 5 Days
        </v-card>
  </div>
</template>

<script>

export default {
  name: 'weatherDayCard',
  props: ['getWeather'],
  data: () => ({
    count: 1,
    visibility: true
  }),
  mounted(){
    
  },
  computed: {
  },
  methods:{
   showMoreCity(){
      this.visibility = false
      this.$emit('changeCount', 5)
    }
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