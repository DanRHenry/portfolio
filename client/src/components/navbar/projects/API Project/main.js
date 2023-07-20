// Import the key from key.js
import { key } from "./helpers/key.js";

//Personal Plex List Constant Variable
const plexLib = "./plexLib.json";

// TMDB Search URL Components
// const url = `https://api.themoviedb.org/3/movie/550`
const searchUrl = `https://api.themoviedb.org/3/search/movie`;
const apiKey = `?api_key=${key}`;
const query = `&query="`;

//TMDB Image URL Components
const tmdbImgUrlBase = `https://image.tmdb.org/t/p/`;
const tmdbImgSize = `w500/`;

//Placeholder Image Variable (not working)
const placeholderImage = `./images/missing.png`

// Carousel DOM Variable
const carouselInner = document.querySelector(".carousel-inner");
// const lists = document.querySelector(".lists");

// Array of Plex Movie List
const plexList = [];

// Array for the Currently Displayed Movie Synopsis
const currentMoviesSynopsis = [];

//* Search plexLib for 5 Random Movies to Pick From & Push to plexList Array
const getPlexMovies = async () => {
  for (let i = 0; i < 5; i++) {
    let randomNumber = Math.floor(Math.random() * 682+ 1);
    let res = await fetch(plexLib);
    let data = await res.json();
    let movie = await data[randomNumber];
    plexList.push(movie);
  }

  // Invoke the searchTmdbList function
  searchTmdbList();
};

//* Invoke the getPlexMovies function
getPlexMovies();

//* Create a function to Search the TMDB for metadata to describe the movies in plexIndex
const searchTmdbList = async () => {
  let buildURL = searchUrl + apiKey + query;
  for (let i = 0; i < 5; i++) {

    // Create a Search Url Including the PlexList Index
      let search = buildURL + plexList[i];

    // Fetch search data from TMDB, jsonify it, and create a tmdbList Variable to represent the result
      let results = await fetch(search);
      let data = await results.json();
      let tmdbList = data.results[0];

    // Create Variables for Pulling the Backdrop, Poster, and Synopsis
      let backdrop = tmdbImgUrlBase + tmdbImgSize + tmdbList.backdrop_path;
      let poster = tmdbImgUrlBase + tmdbImgSize + tmdbList.poster_path;
      let movieSynopsis = tmdbList.overview;

    // Create DOM Elements to Inject DIV, IMG, and MOV elements
      let div = document.createElement("div");
      let img = document.createElement("img");
      let mov = document.createElement("div");

    // Assign Classnames for Divs in the Carousel (active and inactives)
      if (i === 0) {
        div.className = "carousel-item active img-fluid";
      } else {
        div.className = "carousel-item img-fluid";
      }

    // Check for the Existence of a Poster or Backdrop Image, Replacing with placeholderImage if They are Absent
      if (poster !== null) {
        img.src = poster;
      } else if (backdrop !== null) {
        img.src = backdrop;
      } else {
        img.src = placeholderImage; // add placeholder image
      }

    // Add the Movie Title as alt Image Text
      img.alt = `${tmdbList.title}`;

    // Assign classNames to the Img
      img.className = "d-block w-50 mx-auto imgAttribute";

      // Assign className to Mov
        mov.className = "description";
        mov.style = "font-size: large;"
        // mov.className = "description fs-4";
  
      // Add the movieSynopsis to the Mov
        mov.innerHTML = movieSynopsis;
    
        // Append the Img to a Div
      div.appendChild(img);


    // Append the mov to a Div
      div.appendChild(mov);
    
    // Append the Div to carouselInner
      carouselInner.appendChild(div);
    }
  }
