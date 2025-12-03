const movieContainer = document.getElementById('movie-container');

async function fetchPopularMovies() {
    const response = await fetch('   https://api.themoviedb.org/3/movie/popular?api_key=ef4ccb40d752e020b1a02f65cbb22a01'); // Replace with your TMDB API key
    const data = await response.json();
    displayMovies(data.results);
}

function displayMovies(movies) {
    movieContainer.innerHTML = ''; // Clear previous results
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>${movie.overview}</p>
            <button onclick="addToFavourites(${movie.id}, '${movie.title}', '${movie.overview}')">Add to Favourites</button>
        `;
        movieContainer.appendChild(movieCard);
    });
}

async function searchMovie() {
    const query = document.getElementById('search-bar').value;
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=${query}`); // Replace with your TMDB API key
    const data = await response.json();
    displayMovies(data.results);
}

function addToFavourites(id, title, overview) {
    const movie = { id, title, overview };
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    favourites.push(movie);
    localStorage.setItem('favourites', JSON.stringify(favourites));
    alert(`${title} added to favourites!`);
}

fetchPopularMovies();