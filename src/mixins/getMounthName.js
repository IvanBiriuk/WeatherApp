
export default {
    methods: {
        getMounthName(date){
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const dateObj = new Date(date * 1000)
            const mounthName = monthNames[dateObj.getMonth()]
            return mounthName
        }
    }
}