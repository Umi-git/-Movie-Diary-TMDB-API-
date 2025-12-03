// === Load favourites from localStorage ===
function getFavourites() {
    return JSON.parse(localStorage.getItem("favourites")) || [];
}

let allFavourites = getFavourites();          // Full list
let filteredFavourites = [...allFavourites];  // For search only

const favouritesContainer = document.getElementById("favourites-container");


// === Display favourites (renamed from renderFavourites) ===
function displayFavourites(list = filteredFavourites) {
    favouritesContainer.innerHTML = "";

    if (list.length === 0) {
        favouritesContainer.innerHTML = `
            <p class="text-gray-600 dark:text-gray-300 text-lg mt-6">
                No favourite movies found.
            </p>
        `;
        return;
    }

    list.forEach(movie => {
        const card = document.createElement("div");
        card.className =
            "bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6";

        card.innerHTML = `
            <img 
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
                class="w-full rounded-lg mb-3"
            />

            <h2 class="text-xl font-semibold mb-2">${movie.title}</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
                ${movie.overview || "No description available."}
            </p>

            <textarea
                class="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
                placeholder="Add personal notes..."
                data-id="${movie.id}"
            >${movie.notes || ""}</textarea>

            <button 
                class="mt-3 bg-blue-600 text-white px-3 py-2 rounded-md save-note-btn hover:bg-blue-700 transition"
                data-id="${movie.id}"
            >
                Save Note
            </button>
        `;

        favouritesContainer.appendChild(card);
    });

    attachNoteSaving();  // simplified name matching your style
}


// === Save Notes Logic (renamed to match simpler naming) ===
function attachNoteSaving() {
    const buttons = document.querySelectorAll(".save-note-btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const movieId = Number(btn.dataset.id);
            const textarea = document.querySelector(`textarea[data-id="${movieId}"]`);

            let favourites = getFavourites();
            const movie = favourites.find(m => m.id === movieId);

            movie.notes = textarea.value.trim();
            localStorage.setItem("favourites", JSON.stringify(favourites));

            ale
