async function fetchPopularMovies() {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=ef4ccb40d752e020b1a02f65cbb22a01'); // Replace with your TMDB API key
    const data = await response.json();
    displayMovies(data.results);
}

function displayMovies(movies) {
    movieContainer.innerHTML = ''; // Clear previous results

    // Create a container for the grid
    const container = document.createElement('div');
    container.className = 'container mx-auto p-4'; // Center the container and add padding

    // Create the grid for movie cards
    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'; // Tailwind grid classes

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'bg-white rounded-lg shadow-md overflow-hidden'; // Card styling
        movieCard.innerHTML = `
            <img class="w-full h-64 object-cover" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <div class="p-4">
                <h3 class="text-lg font-semibold">${movie.title}</h3>
                <p class="text-gray-700">${movie.overview}</p>
                <button class="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600" onclick="addToFavourites(${movie.id}, '${movie.title}', '${movie.overview}')">Add to Favourites</button>
            </div>
        `;
        gridContainer.appendChild(movieCard);
    });

    // Append the grid container to the main container
    container.appendChild(gridContainer);
    movieContainer.appendChild(container); // Append the main container to the movie container
}

async function searchMovie() {
    const query = document.getElementById('search-input').value; // Changed to match the ID in your HTML
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=ef4ccb40d752e020b1a02f65cbb22a01=${encodeURIComponent(query)}`); // Replace with your TMDB API key
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

// Fetch popular movies when the page loads
fetchPopularMovies();