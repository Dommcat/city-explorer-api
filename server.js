'use strict';
console.log('Yasss our first srver!');

//*****REQUIRES*********************** */

const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');

// const { request } = require('express');

// *** FOR LAB DON'T FORGET TO REQUIRE YOUR STARTER JSON FILE ***

// let data = require('./Data/weather.json');
const { response } = require('express');

// ** CREATE OUR SERVER ***
const app = express();

//****MIDDLEWARE */
// *** cors is middleware - security guard that allows us to share resources across the internet **
app.use(cors());

//****Define port*/
const PORT = process.env.PORT || 3002;


// **** ENDPOINTS ****

app.get('/', (request, response) => {
  response.status(200).send('Welcome to my server');
})

// *** Callback function - 2 parameters: request, response (req,res)

app.get('/', (request, response) => {
  response.status(200).send('Welcome to my MuthA FlipN server');
});

app.get('/hello', (request, response) => {
  console.log(request.query);

  let firstName = request.query.firstName;
  let lastName = request.query.lastName;

  response.status(200).send(`Hello ${firstName} ${lastName}! Welcome to my server!`);
});





//*********DEFINE WEATHER ENDPOINT WITH THE FOLLOWING QUERIES -lat, lon searchQuery */

//*******WEATHER APP */

app.get('/weather', async (request, response, next) => {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let cityName = request.query.searchQuery;
    let weatherbiturl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${process.env.WEATHERAPIKEY}&days=7`

    let weatherFromAxios = await axios.get(weatherbiturl)
    console.log(weatherFromAxios)
    let weatherInfo = weatherFromAxios.data.data.map(dayObj => new Forcast(dayObj));


    response.status(200).send(weatherInfo);

  } catch (error) {
    next(error)
  }
});

// **** CLASS TO GROOM BULKY DATA ****

class Forcast {
  constructor(forcastObj) {
    this.date = forcastObj.datetime;
    this.description = forcastObj.weather.description;
  }
}



//*******MOVIE DATA APP */

app.get('/movies', async (request, response, next) => {
  try {
    let citySearch = request.query.searchQuery;
    let moviesurl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${citySearch}&language=en-US&page=1&include_adult=false`;

    let moviesFromAxios = await axios.get(moviesurl)
    console.log(moviesFromAxios)

    let moviesArray = moviesFromAxios.data.results;
    console.log(moviesArray)
    let newmoviesArray = moviesArray.map(movieObj => new Movie(movieObj));

    response.status(200).send(newmoviesArray);

  } catch (error) {
    next(error)
  }
});

class Movie {
  constructor(movieObj) {
    this.title = movieObj.title;
    this.description = movieObj.overview;
  }
}





//***CATCH ALL ENDPOINT
app.get('*', (request, response) => {
  response.status(404).send('This page does not exist');
});

// **** ERROR HANDLING - PLUG AND PLAY CODE FROM EXPRESS DOCS ****
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// ***** SERVER START ******
app.listen(PORT, () => console.log(`we are running on port:${PORT}`));








//TODO /weather?lat=value&lon=value&searchQuery=value









