const searchBar = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
const movieList = document.querySelector(".movie-list");
const startScreen = document.querySelector(".start-screen");
const goToTop = document.querySelector(".go-to-top");


function loadMovies(e) {
  e.preventDefault();
  const searchInput = searchBar.value;
  
  fetch(`http://www.omdbapi.com/?apikey=28c42018&s=${searchInput}`)
  .then(res => res.json())
  .then(data => {
    for (let i = 0; i < data.Search.length; i++) {
      let movieItem = data.Search[i];
      const imdbID = movieItem.imdbID;

      fetch(`http://www.omdbapi.com/?apikey=9298675f&i=${imdbID}&page=10
      `)
      .then(res => res.json())
      .then(data => {
        renderMovieList(data);       
            })
          } 
        })

      
  // function addMovieToWatchlist(e) {
  // }
  
  // addMovie.addEventListener("click", addMovieToWatchlist);
}
searchBtn.addEventListener("click", loadMovies);




function renderMovieList(data) {
  const { Poster, Title, imdbRating, Genre, Plot } = data;
  console.log("Data: ", data)
  movieList.innerHTML += `
  <div class="movie-container">
    <img class="movie-poster" src="${Poster}">
    <div class="movie-content">
      <div class="movie-header">
        <h3 class="movie-title">${Title}</h3>
        <i class="fa-solid fa-star star"></i>
        <p class="movie-rating">${imdbRating}</p>
      </div>
      <div class="movie-details">
        <p class="movie-length">116 min</p>
        <p class="movie-genre">${Genre}</p>
        <div class="watchlist-item">
        <span class="plus-icon">+</span>
        <p>Watchlist</p>
      </div> <!-- end of watchlist-item -->
      </div> <!-- end of movie-details-->
      <p class="movie-plot">${Plot}</p>
    </div>
  </div>
  <hr>
  `
  startScreen.style.display = "none";
  goToTop.style.display = "block";
  searchBar.value = "";
  const addMovie = document.querySelectorAll(".plus-icon");
  const movie = document.querySelectorAll(".movie-container");
    // const target = e.target
    //     console.log(target)
    //     console.log("first")

    // addMovie.addEventListener("click", e.forEach(el => console.log("first")) )
    // addMovie.forEach(plus => plus.addEventListener("click", () => {
    //   movie.forEach(el => el.style.display = "none")
    // }))
    for (let plus of addMovie) {
      plus.addEventListener("click", function (event) {
        console.log(event.target)
        movie.style.display = "none"
      })
    }
}


