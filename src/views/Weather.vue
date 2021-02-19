<template>
    <div>
        <NavBar :count="count" ></NavBar>
        <weatherDayCard :getWeather="getWeather" @changeCount="changeCount" />
    </div>
</template>

<script>
import {mapGetters, mapActions } from 'vuex'
import NavBar from '../components/NavBar'
import weatherDayCard from '../components/weatherDayCard'
export default {
  name: 'Weather',
  data: () => ({
   count: 1
  }),
 
  components:{
    NavBar,
    weatherDayCard
  },
  computed: {
    ...mapGetters('dataWeather',['getWeather']),
  },
  methods:{
    ...mapActions('dataWeather', ['weatherFetch']),
    changeCount(count){
      this.count = count
    }
  }
}
</script>
<style lang="scss">
   
</style>