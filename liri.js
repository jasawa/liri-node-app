
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

//---------- process.argv[2] choices are in an object --------------------------------

var choice = {
    myTweets: function() {
        console.log("in choice.mytweets...What to see -- " + whatToSee);
        client.get('statuses/user_timeline', function(error, tweets, response) {
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
    },
    mySpotify: function() {
        console.log("What to see -- " + whatToSee);
        // if user did not enter a song 
        if (process.argv.length<4) {
            console.log("");
            console.log("Oops. You didn't enter the name of a song. So LIRI chose one for you. :)");
            console.log("Artist(s): Ace of Base");
            console.log("Name of Song: The Sign");
            console.log("A preview link for the song: https://p.scdn.co/mp3-preview/4c463359f67dd3546db7294d236dd0ae991882ff?cid=fcfd2c6a6b7448389dd0315bd0d39154");
            console.log("The song is on this album: The Sign (US Album) [Remastered]");
            console.log("");
        }
        // if user entered a song
        else {
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

    }


}

// if user wants to see their tweets
if (whatToSee === "my-tweets") {
    choice.myTweets();
}
// if user wants to get information about a song or song fragment
else if (whatToSee === "spotify-this-song") {
    choice.mySpotify();
}
else {
    console.log("Sorry. LIRI doesn't understand. Is it possible you made a typo?");
}






/*
// ---------------- version 1---------------------------------------------
// if user wants to see my tweets
if (whatToSee === "my-tweets") {
    console.log("What to see -- " + whatToSee);
    client.get('statuses/user_timeline', function(error, tweets, response) {
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
// if user wants to get information about a song or song fragment
else if (whatToSee === "spotify-this-song") {
    console.log("What to see -- " + whatToSee);
    // if user did not enter a song 
    if (process.argv.length<4) {
        console.log("");
        console.log("Oops. You didn't enter the name of a song. So LIRI chose one for you. :)");
        console.log("Artist(s): Ace of Base");
        console.log("Name of Song: The Sign");
        console.log("A preview link for the song: https://p.scdn.co/mp3-preview/4c463359f67dd3546db7294d236dd0ae991882ff?cid=fcfd2c6a6b7448389dd0315bd0d39154");
        console.log("The song is on this album: The Sign (US Album) [Remastered]");
        console.log("");
    }
    else {
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
}
else if (whatToSee === "movie-this") {
    console.log("What to see -- " + whatToSee);

}
else {
    console.log("Sorry. LIRI doesn't understand. Is it possible you made a typo?");
}
*/