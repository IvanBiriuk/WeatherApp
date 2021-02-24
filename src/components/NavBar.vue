<template>
    <v-card class="nav-bar" color="grey lighten-4" flat max-width="1024px" tile>
        <v-toolbar height="150px">
            <v-toolbar-title>Weathers </v-toolbar-title>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field label="Search" v-model="city" @keyup.enter="weatherFetch({city})"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="button-block">
                        <v-btn @click="weatherFetch({city})"  ref="search" class="ma-2" color="primary" dark>
                            Search
                            <v-icon dark right>
                                mdi-card-search
                            </v-icon>
                        </v-btn>
                        <v-btn @click="weatherFetch({city:'', lat, lon})" ref="currency" class="ma-2" color="primary" dark>
                            Get Currency Location
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-toolbar>
    </v-card>
</template>

<script>
import { mapActions} from 'vuex'

export default {
    name: 'NavBar',
    data: () => ({
    city: '',
    lat: '',
    lon: ''
  }),
  mounted(){
     this.inRange
  },
  computed: {
      async inRange() {
        const dataCoords = await this.$geolocation.getCurrentPosition()
        this.lat = dataCoords.coords.latitude
        this.lon = dataCoords.coords.longitude
    }
  },
  methods:{
    ...mapActions('dataWeather', ['weatherFetch']),
  }
}
</script>
<style lang="scss">
  .nav-bar{
    margin: 0 auto;
    .v-toolbar__content{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100px;
    }
    .container{
      width: 70%;
      .button-block{
        display: flex;  
        justify-content: space-between;
      }
    }
  }
</style>
