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

    const movieGrid = document.querySelector('.movies-grid');
    renderCards(moviesData, movieGrid, genreMap);
    }
    //placeholder error while developing the core functionality of the browse.js init function
    catch(error) {
        console.log(error);
    }

    const divFilterPanel = document.querySelector(".filter-panel");
    const filterButton = document.querySelector(".filter-button");

    filterButton.addEventListener('click', () => {
    divFilterPanel.classList.toggle("show");

})
}
    
init();