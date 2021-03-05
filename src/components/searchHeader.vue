<template>
    <v-card id="searchBar" class="search-bar" color="grey lighten-4" flat max-width="1024px" tile>
        <v-toolbar height="150px">
            <v-toolbar-title>Weather</v-toolbar-title>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                        :label="labelText"
                        v-model="city"
                        ref="searchInput"
                        class="search-input"
                        :class="{ validate: !validate}"
                        @keyup.enter="validationInput({city})"></v-text-field>
                        <span class="not-found-text" v-if="$store.state.dataWeather.notFoundCity != ''">
                            {{$store.state.dataWeather.notFoundCity}}
                        </span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="button-block">
                        <v-btn @click="validationInput({city})"  ref="search"  color="primary" dark>
                            Search
                            <v-icon dark right>
                                mdi-magnify
                            </v-icon>
                        </v-btn>
                        <v-btn @click="weatherFetch({city:'', lat, lon})" ref="currency" class="ma-2" color="primary" dark>
                            Get Current Location 
                            <v-icon dark right>
                                mdi-map-marker-outline
                            </v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-toolbar>
    </v-card>
</template>

<script>
import { mapActions, mapState} from 'vuex'

export default {
    name: 'searchHeader',
    data: () => ({
    city: '',
    lat: '',
    lon: '',
    labelText: 'Search',
    validate: true
  }),
  mounted(){
     this.inRange
  },
  computed: {
      async inRange() {
        const dataCoords = await this.$geolocation.getCurrentPosition()
        this.lat = dataCoords.coords.latitude
        this.lon = dataCoords.coords.longitude
    },
  },
  methods:{
    ...mapActions(['weatherFetch']),
    validationInput(city){
      if(this.$refs.searchInput.value != ''){
        this.weatherFetch(city)
        this.validate = true
        this.labelText = 'Search'
      }else{
        this.validate = false
        this.labelText = 'Fill in the field'
      }
    }
  }
}
</script>