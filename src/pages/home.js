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
       const trendingRow = document.querySelector('.trending-row .cards-container');
       const topRatedRow = document.querySelector('.top-rated-row .cards-container');
       const upComingRow = document.querySelector('.upcoming-row .cards-container');
       
        renderCards(trendingData, trendingRow, genreMap);
        renderCards(topRatedData, topRatedRow, genreMap);
        renderCards(upcomingData, upComingRow, genreMap);
    initHero(trendingData.slice(0,5));
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
        ratingTag.textContent = '★  ' + movie.vote_average.toFixed(1);
        ratingTag.className = 'rating';
        const genreTag = document.createElement('p');
        genreTag.textContent = genreMap[movie.genre_ids[0]];
        genreTag.className = 'genre';
        const yearTag = document.createElement('p');
        yearTag.textContent = movie.release_date.slice(0,4);
        yearTag.className = 'year';
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

function initHero(movies) {
    let currentMovie;
    let index = 0;

    const wrapper = document.querySelector('.outer-slideshow');
    const slideWrapper = document.querySelector('.slide');
    const contentWrapper = document.querySelector('.content');
    const metadataWrapper = document.querySelector('.metadata');
    const movieTitle = document.querySelector('.content h2');
    const yearTag = document.querySelector('.year');
    const runTimeTag = document.querySelector('.runtime');
    const ratingTag = document.querySelector('.rating');
    const overviewTag = document.querySelector('.overview');
    const contentButton = document.querySelector('.content-button');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const dotsContainer = document.querySelector('.dots-container');
    const spanElements = dotsContainer.querySelectorAll('span');
     contentButton.addEventListener('click', () => {
            window.location.href = `movie.html?id=${currentMovie.id}`;
              });
    prevButton.addEventListener('click', () => {
        if(index == 0 ) {
            return;
        }
        index --;
           slideWrapper.classList.add('fading-out');
        slideWrapper.style.opacity = 0;
        console.log(index, 'prevButton was clicked');
         

    });
    nextButton.addEventListener('click', () => {
        if(index == 4) {    
            return;
        }
        index++;
           slideWrapper.classList.add('fading-out');
        slideWrapper.style.opacity = 0;
        console.log(index, 'nextButton was clicked');
        
    });
     
    setInterval( () => {
        index++;
        if(index > 4) {
            index = 0;
        }
           slideWrapper.classList.add('fading-out');
        slideWrapper.style.opacity = 0;
        console.log(index, '20s slide transmission');
        
        
    }, 20000);

      slideWrapper.addEventListener('transitionend', () => {
        if(slideWrapper.classList.contains('fading-out')) {
            slideWrapper.classList.remove('fading-out');
            slideWrapper.style.opacity = 1;
            loadMovie(index);
            console.log('transitionend fired', slideWrapper.classList.contains('fading-out'));
        }
            
        });
    function loadMovie(index) {
         currentMovie = movies[index];
        slideWrapper.style.backgroundImage = `url(${backdropBaseURL}${currentMovie.backdrop_path})`;
        movieTitle.textContent = currentMovie.title;
        ratingTag.textContent = currentMovie.vote_average.toFixed(1);
        yearTag.textContent = currentMovie.release_date.slice(0, 4);
        overviewTag.textContent = currentMovie.overview;
        spanElements.forEach(span => span.classList.remove('active'));
        spanElements[index].classList.add('active');   
    }
    loadMovie(0);
}

init();
