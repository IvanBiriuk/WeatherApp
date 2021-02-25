<template>
    <div>
        <searchHeader :getWeatherCity="getWeatherCity"></searchHeader>
        <weatherDayCard :getWeather="getWeather" :getWeatherCity="getWeatherCity" />
    </div>
</template>

<script>
import {mapGetters, mapActions } from 'vuex'
import searchHeader from '../components/searchHeader'
import weatherDayCard from '../components/weatherDayCard'
export default {
  name: 'Weather',
  data: () => ({

  }),
  components:{
    searchHeader,
    weatherDayCard
  },
  computed: {
    ...mapGetters(['getWeather', 'getWeatherCity'])
    
  }
}
</script>