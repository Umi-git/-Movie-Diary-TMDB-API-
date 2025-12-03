# MSDB – Movie Database

MSDB is a personal movie database web application where users can browse popular movies, search for specific titles, save favourites, and maintain personal notes.

## Features

### Homepage (`index.html`)

* Displays **popular movies** fetched from TMDb API.
* **Search bar** in the navbar to search for movies by title.
* Add movies to **Favourites** stored in `localStorage`.
* **Responsive design** with mobile-friendly menu.
* Footer with information, quick links, and contact details.

### Journal (`journal.html`)

* Lists all **favourite movies** saved from the homepage.
* Add **personal notes** for each movie.
* **Delete movies** from favourites with a single click.
* **Search bar** in the navbar for filtering favourite movies.
* Responsive mobile menu with search support.

### Shared Features

* TailwindCSS for **responsive and modern UI**.
* **Mobile menu toggle** for small screens.
* Persistent data using **localStorage**.
* Consistent header, navbar, and footer across pages.

## Project Structure

```
/msdb
│
├─ index.html        # Homepage with popular movies
├─ journal.html      # Favourites journal page
├─ main.js           # Homepage JS: fetch movies, search, add to favourites
├─ journal.js        # Journal JS: display favourites, add notes, delete, search
└─ README.md         # Project documentation
```

## How to Use

1. Open `index.html` in a browser.
2. Browse **popular movies** or use the **search bar**.
3. Click **Add to Favourites** to save a movie.
4. Navigate to `journal.html` to view your **favourite movies**.
5. Add personal notes or **delete movies** from your journal.
6. Both search and mobile menu are **responsive**.

## API

* Movie data is fetched from **The Movie Database (TMDb) API**.


## Notes

* All favourite movies and notes are saved in **localStorage**, so data persists across page reloads.
* No backend is required. All operations run **client-side**.
