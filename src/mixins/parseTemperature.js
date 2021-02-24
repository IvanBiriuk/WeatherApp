export default {
    methods: {
        parseTemperature(temp){
            const temperature = Math.round(temp - 273.15)
            return temperature
        }
    }
}