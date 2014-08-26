module.exports = {    
    //Create a function to close out of the database when necessary
    closeOut: function(doc) {
        if(doc == null) {
            return true;
        };
    },

    // Time parsing
    timeParse: function(time){
        time = Math.round(time / 100)
        if (time == 0){
            return "12 AM"
        }
        if (time <= 12) {
            return time + " AM"
        }
        else {
            if (time - 12 == 0) {return "12 PM"};
            return (time - 12) + " PM";
        }
    }
}