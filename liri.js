
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



var choice = {
    myTweets: function() {
        // user gets 20 tweets from twitter. 20 is the default number of tweets
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

    },
    // if user entered a movie name or LIRI gives the user the movie, Mr. Nobody
    myMovie: function() {
        var movieTitleWithPlus = movieTitle.split(" ").join("+");
        var queryUrl = "https://www.omdbapi.com/?t=" + movieTitleWithPlus + "&y=&plot=short&apikey=trilogy";
        request(queryUrl, function(error, response, body) {
            if(!error && response.statusCode === 200) {
                console.log("");
                console.log("-------------------------------");
                console.log("Title of the movie: " + JSON.parse(body).Title);
                console.log("Year the movie came out: " + JSON.parse(body).Year);
                console.log("IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1].Value);
                console.log("Country where the movie was produced: " + JSON.parse(body).Country);
                console.log("Language of the movie: " + JSON.parse(body).Language);
                console.log("Plot of the movie: " + JSON.parse(body).Plot);
                console.log("Actors in the movie: " + JSON.parse(body).Actors);
                console.log("");
            }
        })
    }
}

// if user wants to see their tweets
if (whatToSee === "my-tweets") {
    choice.myTweets();
}
// if user wants LIRI to get information about a song or song fragment
else if (whatToSee === "spotify-this-song") {
    choice.mySpotify();
}
// if user wants LIRI to display information about a movie
else if (whatToSee === "movie-this") {
    if (process.argv.length<4) {
        console.log("");
        console.log("Since you didn't chose a movie, perhaps you'd like this movie...");
        movieTitle = "Mr. Nobody";
    }
    else {
        movieTitle = argThree;
    }
    choice.myMovie();
}
// user wants LIRI to do what it says in the file, random.txt
else if (whatToSee === "do-what-it-says") {
    // reads random.txt and stores contents in data
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log("There was an error in do-what-it-says");
        }
        // splits data string at comma and makes array of data
        var dataArray = data.split(",");

        if (dataArray[0] === "my-tweets") {
            choice.myTweets();
        }
        else if (dataArray[0] === "spotify-this-song") {
            process.argv.length = 4;  // a work-around because user did not actually input a song
            argThree = dataArray[1];  // will act as if user inputed process.argv[3]
            choice.mySpotify();
        }
        else if (dataArray[0] === "movie-this") {
            movieTitle = dataArray[1];
            choice.myMovie();
        }
    })

}
else {
    console.log("");
    console.log("Sorry. LIRI doesn't understand. Is it possible you made a typo?");
    console.log("");
}


