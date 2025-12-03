// === Load favourites from localStorage ===
function getFavourites() {
    return JSON.parse(localStorage.getItem("favourites")) || [];
}

let allFavourites = getFavourites();
let filteredFavourites = [...allFavourites]; 

const favouritesContainer = document.getElementById("favourites-container");

// === Display favourites ===
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
        card.className = "bg-white dark:bg-gray-800 p-4 rounded-lg shadow";

        card.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
                 class="w-full rounded-lg mb-3" 
                 alt="${movie.title}">

            <h2 class="text-xl font-semibold mb-2">${movie.title}</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
                ${movie.overview || "No description available."}
            </p>

            <textarea
                class="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
                placeholder="Add personal notes..."
                data-id="${movie.id}"
            >${movie.notes || ""}</textarea>

            <div class="flex gap-2 mt-3">
                <button 
                    class="bg-blue-600 text-white px-3 py-2 rounded-md save-note-btn hover:bg-blue-700 transition"
                    data-id="${movie.id}"
                >
                    Save Note
                </button>

                <button 
                    class="bg-red-600 text-white px-3 py-2 rounded-md delete-btn hover:bg-red-700 transition"
                    data-id="${movie.id}"
                >
                    Delete
                </button>
            </div>
        `;

        favouritesContainer.appendChild(card);
    });

    attachNoteSaving();
    attachDeleteHandlers();
}

// === Save Notes Logic ===
function attachNoteSaving() {
    const buttons = document.querySelectorAll(".save-note-btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const movieId = Number(btn.dataset.id);
            const textarea = document.querySelector(`textarea[data-id="${movieId}"]`);

            let favourites = getFavourites();
            const movie = favourites.find(m => m.id === movieId);

            if (movie) {
                movie.notes = textarea.value.trim();
                localStorage.setItem("favourites", JSON.stringify(favourites));
                alert("Notes saved!");
            }
        });
    });
}

// === Delete Movie Logic ===
function attachDeleteHandlers() {
    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const movieId = Number(btn.dataset.id);
            let favourites = getFavourites();
            favourites = favourites.filter(m => m.id !== movieId);
            localStorage.setItem("favourites", JSON.stringify(favourites));

            // Update displayed list
            allFavourites = favourites;
            filteredFavourites = [...allFavourites];
            displayFavourites();
        });
    });
}

// === Search Functionality ===
const searchInput = document.getElementById("journal-search");
const searchBtn = document.getElementById("searchJournalBtn");

function filterFavourites() {
    const query = searchInput.value.toLowerCase();
    filteredFavourites = allFavourites.filter(movie =>
        movie.title.toLowerCase().includes(query)
    );
    displayFavourites();
}

// Search on input or button click
searchInput.addEventListener("input", filterFavourites);
searchBtn.addEventListener("click", filterFavourites);

// Mobile search
const searchInputMobile = document.getElementById("journal-search-mobile");
const searchBtnMobile = document.getElementById("searchJournalBtnMobile");

if (searchInputMobile && searchBtnMobile) {
    searchInputMobile.addEventListener("input", () => {
        const query = searchInputMobile.value.toLowerCase();
        filteredFavourites = allFavourites.filter(movie =>
            movie.title.toLowerCase().includes(query)
        );
        displayFavourites();
    });

    searchBtnMobile.addEventListener("click", () => {
        const query = searchInputMobile.value.toLowerCase();
        filteredFavourites = allFavourites.filter(movie =>
            movie.title.toLowerCase().includes(query)
        );
        displayFavourites();
    });
}

// === Mobile Menu Toggle ===
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Initial render
displayFavourites();
