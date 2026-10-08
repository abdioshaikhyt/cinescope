import { discoverMovies, getGenres } from "../js/api.js";
import { renderCards } from "../js/utils.js";

async function init() {
    try {
        const moviesData = await discoverMovies("popularity.desc");
        const genreData = await getGenres();
        const genreMap = {};
        genreData.forEach(genre => {
            genreMap[genre.id] = genre.name;
        });
        async function applyFilters() {
            const activeGenrePills = document.querySelectorAll('.genre-pills button.active');
            const arrayOfActivePills = Array.from(activeGenrePills);
            const genreIds = arrayOfActivePills.map(pill => {
                return pill.dataset.id;
            }).join(",");

            const yearInput = document.getElementById('year-input').value;
            const sortByPill = document.getElementById('sort-by-pill').value;
            const languageInput = document.getElementById('language-input').value;

            const moviesData = await discoverMovies(sortByPill, genreIds, yearInput, languageInput);
            movieGrid.replaceChildren();
                resultsCount.textContent = `Showing ${moviesData.length} results.`;
                renderCards(moviesData, movieGrid, genreMap);
                
                }
        const year = document.getElementById('year-input');
        year.addEventListener('input', () => {
            applyFilters();
        })
        const sortBy = document.getElementById('sort-by-pill');
        sortBy.addEventListener('change', () => {
            applyFilters();
        
        })
        const language = document.getElementById('language-input');
        language.addEventListener('input', () => {
            applyFilters();
            
        });
    const movieGrid = document.querySelector('.movies-grid');
    renderCards(moviesData, movieGrid, genreMap);

     const genrePillsContainer = document.querySelector('.genre-pills');
    genreData.forEach(genre => {
         const genrePill = document.createElement('button');
        genrePill.textContent = genre.name;
        genrePill.dataset.id = genre.id;
        genrePillsContainer.appendChild(genrePill);
        genrePill.addEventListener('click', () => {
            genrePill.classList.toggle("active");
            applyFilters();
        })
    });
        const resultsCount = document.querySelector('.results-count');  
        resultsCount.textContent = `Showing ${moviesData.length} results.`;
    }
    //placeholder error while developing the core functionality of the browse.js init function
    catch(error) {
        console.log(error);
    }

    const divFilterPanel = document.querySelector(".filter-panel");
    const filterButton = document.querySelector(".filter-button");

    filterButton.addEventListener('click', () => {
    divFilterPanel.classList.toggle("show");
}); 

}

init();