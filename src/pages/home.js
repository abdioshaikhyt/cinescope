import { getTrending, getTopRated, getUpcoming, getGenres } from '../js/api.js';
import { backdropBaseURL, posterBaseURL } from '../js/config.js';

async function init() {

    try {
    const trendingData = await getTrending();
    const topRatedData = await getTopRated();
    const upcomingData = await getUpcoming(); 
    const genreData = await getGenres();
    const genreMap = {};
        genreData.forEach(genre => {
            genreMap[genre.id] = genre.name;
        })
    }

        catch(error) {
            console.error(error);
           }
}

function renderCards(movies, container, genreMap) {
    movies.forEach(movie => { 
        const wrapper = document.createElement('div');
        wrapper.className= 'movie-card';
         const wrapperImg = document.createElement('img');
        wrapperImg.src = `${posterBaseURL}${movie.poster_path}`;
        wrapperImg.alt = movie.title;
        const metadataWrapper = document.createElement('div');
        metadataWrapper.className = 'movie-metadata'
        const metadataHFour = document.createElement('h4');
        metadataHFour.textContent = movie.title;
        const cardMetaWrapper = document.createElement('div');
        cardMetaWrapper.className = 'card-meta';
        const ratingTag = document.createElement('p');
        ratingTag.textContent = movie.vote_average.toFixed(1);
        const genreTag = document.createElement('p');
        genreTag.textContent = genreMap[movie.genre_ids[0]];
        const yearTag = document.createElement('p');
        yearTag.textContent = movie.release_date.slice(0,4);
        wrapper.appendChild(wrapperImg);
        wrapper.appendChild(metadataWrapper);
        metadataWrapper.appendChild(metadataHFour);
        metadataWrapper.appendChild(cardMetaWrapper);
        cardMetaWrapper.appendChild(ratingTag);
        cardMetaWrapper.appendChild(genreTag);
        cardMetaWrapper.appendChild(yearTag);
        container.appendChild(wrapper);
    }); 

}