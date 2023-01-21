'use strict';
console.log('Yasss our first srver!');

//*****REQUIRES*********************** */

const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');
const getMovies = require('./modules/movies.js')
const getWeather = require('./modules/weather.js')


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

app.get('/weather', getWeather);
 
//*******MOVIE DATA APP */

app.get('/movies', getMovies);




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









