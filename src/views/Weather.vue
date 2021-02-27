<template>
    <div class="weather-wrapper">
        <searchHeader/>
        <weatherDayCard :getWeather="getWeather" />
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
    ...mapGetters(['getWeather'])
    
  }
}
</script>