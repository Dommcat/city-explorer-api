
const axios = require('axios');
let cache = {}


async function getMovies(request, response, next) {
  try {
    let citySearch = request.query.searchQuery;
    let key = `${citySearch}-movies`
    if (cache[key] && (Date.now() - cache[key].timestamp) < 2.628e+9) {
        console.log('movie data in cache')
      response.status(200).send(cache[key].Data)
    } else {
      let moviesurl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${citySearch}&language=en-US&page=1&include_adult=false`;

      let moviesFromAxios = await axios.get(moviesurl)
      console.log('no data in cache for movies')

      let moviesArray = moviesFromAxios.data.results;
    
      let newmoviesArray = moviesArray.map(movieObj => new Movie(movieObj));
      cache[key] = {
        Data: newmoviesArray,
        timestamp: Date.now()

      }
      response.status(200).send(newmoviesArray);



    }


  } catch (error) {
    next(error)
  }
}

class Movie {
  constructor(movieObj) {
    this.title = movieObj.title;
    this.description = movieObj.overview;
    this.imageurl = 'https://image.tmdb.org/t/p/original' + movieObj.poster_path;
  }
}


module.exports = getMovies;


