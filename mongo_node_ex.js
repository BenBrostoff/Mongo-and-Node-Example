var helpers = require('./helpers');
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


    cursor.each(function(err, doc) {
        // Close out of the database once we've gone through all entries
        if (helpers.closeOut(doc) == true) { 
            return db.close() 
        }

        if(doc.State != state) {
        // Once state changes, we know we're at a temperature high
        // Update needs to be a callback to execute
            db.collection("data").update({'_id': doc._id}, 
            {'$set': {'month_high': true}}, function(err, updated) { 

            });
        }
    });
    
    // Narrow cursor to only include month highs
    cursor = db.collection("data").find({'month_high': true});

    // Iterate through cursor and log info to console
    cursor.each(function(err,doc) {
        if (helpers.closeOut(doc) == true) { 
            return db.close() 
        }

        console.log("The month high for " + doc.State + " was " + doc.Temperature
                    + " and occurred on Day " + doc.Day + " at " + helpers.timeParse(doc.Time) + ".");
    });
});

