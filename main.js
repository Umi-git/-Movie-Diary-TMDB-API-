const movieContainer = document.getElementById('movie-container'); // Match this ID in your HTML

async function fetchPopularMovies() {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=ef4ccb40d752e020b1a02f65cbb22a01');
    const data = await response.json();
    displayMovies(data.results);
}

function displayMovies(movies) {
    movieContainer.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'container mx-auto p-4';

    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'bg-white rounded-lg shadow-md overflow-hidden';

        movieCard.innerHTML = `
            <img class="w-full h-64 object-cover" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <div class="p-4">
                <h3 class="text-lg font-semibold">${movie.title}</h3>
                <p class="text-gray-700">${movie.overview}</p>
                <button class="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600">Add to Favourites</button>
            </div>
        `;

        // Attach click event safely in JS
        const button = movieCard.querySelector('button');
        button.addEventListener('click', () => addToFavourites(movie));

        gridContainer.appendChild(movieCard);
    });

    container.appendChild(gridContainer);
    movieContainer.appendChild(container);
}


async function searchMovie() {
    const query = document.getElementById('search-bar').value; // <-- match HTML ID
    if (!query) return; // optional: do nothing if empty

    const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=ef4ccb40d752e020b1a02f65cbb22a01&query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    displayMovies(data.results);
}


function addToFavourites(movie) {
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    if (!favourites.some(m => m.id === movie.id)) {
        favourites.push(movie);
        localStorage.setItem('favourites', JSON.stringify(favourites));
        alert(`${movie.title} added to favourites!`);
    } else {
        alert(`${movie.title} is already in favourites.`);
    }
}

// === Mobile Menu Toggle ===
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Optional: close menu when a link is clicked
    const links = mobileMenu.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Fetch popular movies when the page loads
fetchPopularMovies();