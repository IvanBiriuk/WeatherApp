<template>
    <div class="weather-wrapper">
        <searchHeader/>
        <weatherDayCard />
    </div>
</template>

<script>
import searchHeader from '../components/searchHeader'
import weatherDayCard from '../components/weatherDayCard'
export default {
  name: 'Weather',
  components:{
    searchHeader,
    weatherDayCard
  }
}
</script>