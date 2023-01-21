
const axios = require('axios');
let cache = {}


async function getWeather(request, response, next) {

  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let cityName = request.query.searchQuery;
    let key = `${cityName}-weather`
    if (cache[key] && (Date.now() - cache[key].timestamp) < 8.64e+7) {
      console.log('data in cache')
      response.status(200).send(cache[key].Data);

    } else {
      let weatherbiturl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${process.env.WEATHERAPIKEY}&days=7`
      let weatherFromAxios = await axios.get(weatherbiturl)
      console.log('no data in cache')
      let weatherInfo = weatherFromAxios.data.data.map(dayObj => new Forcast(dayObj));
      cache[key]={
        Data:weatherInfo,
        timestamp:Date.now()

      }
      response.status(200).send(weatherInfo);

    }



  } catch (error) {
    next(error)
  }
}

// **** CLASS TO GROOM BULKY DATA ****

class Forcast {
  constructor(forcastObj) {
    this.date = forcastObj.datetime;
    this.description = forcastObj.weather.description;
  }
}

module.exports = getWeather;