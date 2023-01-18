'use strict';
console.log('Yasss our first srver!');

//*****REQUIRES */
const express = require('express');
require('dotenv').config();
const cors = require('cors');

// const { request } = require('express');

// *** FOR LAB DON'T FORGET TO REQUIRE YOUR STARTER JSON FILE ***
let data = require('./Data/weather.json');
const { response } = require('express');

//*******Once express is in need to use it - per express docs
//*****App ==== server 
const app = express();

//****MIDDLEWARE */
// *** cors is middleware - security guard that allows us to share resources across the internet **
app.use(cors());


//****Define port*/
const PORT = process.env.PORT || 3002;

// **** ENDPOINTS ****

//***Base endpoint - proof of life*/
//**1st endpoint quotes */
//***2nd arg - callback which will execute when someone hits that point */
app.get('/', (request, response) => {
  response.status(200).send('Welcome to my server');
})

// *** Callback function - 2 parameters: request, response (req,res)

app.get('/', (request, response) => {
  response.status(200).send('Welcome to my server');
});

app.get('/hello', (request, response) => {
  console.log(request.query);

  let firstName = request.query.firstName;
  let lastName = request.query.lastName;

  response.status(200).send(`Hello ${firstName} ${lastName}! Welcome to my server!`);
});


//****WEATHER */

app.get('/weather', (req, res, next) => {
  let lat = req.query.lat;
  let lon = req.query.lon;
  let searchQuery = req.query.searchQuery;
  res.status(200).send("Hello");
});


app.get('/hello', (request, response) => {
  console.log(request.query);

  let firstName = request.query.firstName;
  let lastName = request.query.lastName;

  response.status(200).send(`Hello ${firstName} ${lastName}! Welcome to my server!`);
});


//*************DATA GROOM ********/

app.get('Data/weather.json', (request, response, next) => {
  try {
    let forcast = request.query.date;

    let dataToGroom = data.find(forcast => forcast.date === forcast);
    let dataToSend = new forcast(dataToGroom);

    response.status(200).send(dataToSend);

  } catch (error) {
    next(error);
  }

});



// **** CLASS TO GROOM BULKY DATA ****

class Forcast {
  constructor(forcastObj) {
    this.date = forcastObj.date;
    this.description = forcastObj.description;
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

