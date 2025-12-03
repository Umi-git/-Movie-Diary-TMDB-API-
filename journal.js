const favouritesContainer = document.getElementById('favourites-container');

function displayFavourites() {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    favouritesContainer.innerHTML = ''; // Clear previous results
    favourites.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.innerHTML = `
            <h3>${movie.title}</h3>
            <p>${movie.overview}</p>
            <input type="text" placeholder="Add a note..." onblur="addNoteToMovie(${movie.id}, this.value)">
            <p>${movie.note ? `Note: ${movie.note}` : ''}</p>
        `;
        favouritesContainer.appendChild(movieCard);
    });
}

function addNoteToMovie(id, note) {
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    const movie = favourites.find(m => m.id === id);
    if (movie) {
        movie.note = note;
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }
}

displayFavourites();