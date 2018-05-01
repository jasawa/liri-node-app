
require("dotenv").config();
var fs = require("fs");
var request = require("request");
// the keys.js holds the keys for both twitter and spotify
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var Twitter = require("twitter");
var client = new Twitter(keys.twitter);

var whatToSee = process.argv[2];
var argThree = process.argv[3];
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
else if (whatToSee === "spotify-this-song") {
    console.log("What to see -- " + whatToSee);

    songName = argThree;
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        else {
                console.log("");
                console.log("-------------------------------");
            for (var j=0; j<data.tracks.items.length; j++) {
                console.log("Artist(s): " + data.tracks.items[j].artists[0].name);
                console.log("Name of Song: " + data.tracks.items[j].name);
                console.log("A preview link for the song: " + data.tracks.items[j].preview_url);
                console.log("The song is on this album: " + data.tracks.items[j].album.name);
                console.log("");
                console.log("");
            }
        }
      
    });

}
else {
    console.log("Sorry. LIRI can't do that yet.");
}
