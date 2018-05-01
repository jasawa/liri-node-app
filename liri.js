
require("dotenv").config();
var fs = require("fs");
var request = require("request");

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var Twitter = require("twitter");
var client = new Twitter(keys.twitter);

var whatToSee = process.argv[2];
if (whatToSee === "my-tweets") {
    console.log("What to see -- " + whatToSee);
    client.get('statuses/user_timeline', 'ivy lee', function(error, tweets, response) {
        if(error) {
            console.log(error);
        }
        else {
            //console.log(tweets);
            for (i=0; i<tweets.length; i++) {
                console.log("");
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
            }
        }
    });
}
else {
    console.log("Sorry. LIRI can't do that yet.");
}
