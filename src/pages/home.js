import { getTrending, getTopRated, getUpcoming } from '../js/api.js';
import { backdropBaseURL, posterBaseURL } from '../js/config.js';

async function init() {

    try {
    const trendingData = await getTrending();
    const topRatedData = await getTopRated();
    const upcomingData = await getUpcoming(); 
    }
        catch(error) {
            console.error(error);
           }
}

function renderCards(movies, container) {
    movies.forEach(movie => { 
        const wrapper = document.createElement('div');
        wrapper.className= 'movie-card';
         const wrapperImg = document.createElement('img');
        wrapperImg.src = `${posterBaseURL}${movie.poster_path}`;
        wrapperImg.alt = movie.title;
        const metadataWrapper = document.createElement('div');
        metadataWrapper.className = 'movie-metadata'
        const metadataHFour = document.createElement('h4');
        const cardMetaWrapper = document.createElement('div');
        cardMetaWrapper.className = 'card-meta';
        const ratingTag = document.createElement('p');
        const genreTag = document.createElement('p');
        const yearTag = document.createElement('p');

    });

}