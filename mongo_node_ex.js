var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/state_weather', function(err, db) {

    if(err) throw err;

    // Create a cursor with all database entries
    var query = {};
    var cursor = db.collection("data").find(query);

    // Sort first by state in alphabetical order (ascending)
    // Sort second by temperature in descending order
    cursor.sort([['State', 1], ['Temperature', -1]]);

    var state = '';

    // Create a function to close out of the database when necessary
    var closeOut = function(doc) {
        if(doc == null) {
            return true;
        };
    }

    cursor.each(function(err, doc) {
        // Close out of the database once we've gone through all entries
        if (closeOut(doc) == true) { 
            return db.close() 
        }

        if(doc.State != state) {
        // Once state changes, we know we're at a temperature high
            // Update needs to be a callback to execute
            db.collection("data").update({'_id': doc._id}, {'$set': {'month_high': true}}, function(err, updated) {
              
            });
        }
    });
    // Log temp highs to the console
    console.log("When the wind blew from the West...")
    // Narrow cursor to only include month highs
    cursor = db.collection("data").find({'month_high': true});

    cursor.each(function(err,doc) {
        if (closeOut(doc) == true) { 
            return db.close() 
        }

        console.log("The month high for " + doc.State + " was " + doc.Temperature
                    + " and occurred on Day " + doc.Day + ".");
    });
});