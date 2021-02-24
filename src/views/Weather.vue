<template>
    <div>
        <NavBar></NavBar>
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
    ...mapGetters('dataWeather',['getWeather', 'getWeatherCity'])
    
  },
  methods: {
    ...mapActions('dataWeather', ['weatherFetch'])
  }
}
</script>
<style lang="scss">
   
</style>