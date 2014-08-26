// Create a function to close out of the database when necessary
var closeOut = function(doc) {
    if(doc == null) {
        return true;
    };
}

// Time parsing
var timeParse = function(time){
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