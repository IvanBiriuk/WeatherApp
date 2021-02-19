<template>
  <div class="card-detail-weather">
      <div v-for="weatherList in getWeather.list" :key="weatherList.dt">
          <v-card v-if="detailId == weatherList.dt">
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
          </v-card>
      </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'weatherDetailDay',
  data: () => ({
    detailId: 0
  }),
  mounted(){
    this.detailId = this.$route.params.date
  },
  computed: {
    ...mapGetters('dataWeather',['getWeather']),
  },
  methods:{
   
  }
}
</script>
<style lang="scss">

</style>