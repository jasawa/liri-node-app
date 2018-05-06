# liri-node-app

### Introduction:
Welcome to the exciting world of the LIRI Bot. LIRI can give you information about a movie, display your tweets, and show you data about a song. LIRI is modeled on iPhone's SIRI. While SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. The amazing LIRI is a command line node app that takes in parameters and gives back appropriate data.

### How to interact with LIRI:
* All interactions will take place in the command line.
* Type `node liri.js my-tweets` and LIRI will respond with twenty of your tweets and the date and time the tweets were created.
* Type `node liri.js spotify-this-song '<put song name here>'` and LIRI will respond with the Artist(s), the song's name, a preview link of the song from Spotify, and the name of the album containing this track. Note: if no song is provided then, LIRI will default to "The Sign" by Ace of Base.
* Type `node liri.js movie-this '<put name of movie here>'` and LIrI will respond with the following information about your movie: 
    * Title of movie
    * Year the movie came out
    * IMDB Rating of the movie
    * Rotton Tomatoes Rating of the movie
    * Country where the movie was produced
    * Language of the movie
    * Plot of the movie
    * Featured Actors in the movie

    Note: if a movie name is not provided, LIRI will default to the movie, 'Mr. Nobody'
* Type `node liri.js do-what-it-says` and LIRI will respond by taking the text inside the random.txt file and following the information therein. Currently the information in the random.txt is spotify-this-song and the song 'I Want it That Way.'  Using the fs Node Package, LIRI will be able to act as if the user typed node liri.js spotify-this-song 'I Want it That Way' and provide the Artist(s), the song's name, a preview link of the song from Spotify, and the name of the album containing this track.

### Before you start:
Before you start you will need to make a .env file and fill it with you twitter and spotifiy credentials. You will also need to install several npm node packages.


