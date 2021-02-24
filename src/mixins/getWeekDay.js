export default {
    methods: {
        getWeekDay(date){
            const arrayOfWeekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            const dateObj = new Date(date * 1000)
            const weekdayNumber = dateObj.getDay()
            return arrayOfWeekdays[weekdayNumber]
        }
    }
}