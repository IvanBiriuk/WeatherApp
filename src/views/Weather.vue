<template>
    <div>
        <NavBar :getWeatherCity="getWeatherCity"></NavBar>
        <weatherDayCard :getWeather="getWeather" :getWeatherCity="getWeatherCity" />
    </div>
</template>

<script>
import {mapGetters, mapActions } from 'vuex'
import NavBar from '../components/NavBar'
import weatherDayCard from '../components/weatherDayCard'
export default {
  name: 'Weather',
  data: () => ({

  }),
  components:{
    NavBar,
    weatherDayCard
  },
  computed: {
    ...mapGetters(['getWeather', 'getWeatherCity'])
    
  }
}
</script>
<style lang="scss">
   
</style>