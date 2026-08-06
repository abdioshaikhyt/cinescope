import { apiKey, baseURL } from "./config.js";

async function getTrending() {
    try {   
        const response = await fetch(`${baseURL}/trending/movie/week?api_key=${apiKey}`);
        
        if(!response.ok) {
          throw new Error("Failed to fetch Trending Movies");
        } 
        const data = await response.json();
        return data.results;
    } catch(error) {
        console.log(error);
    }
}

async function getTopRated() {
    try {   
        const response = await fetch(`${baseURL}/movie/top_rated?api_key=${apiKey}`);
        
        if(!response.ok) {
          throw new Error("Failed to fetch Top Rated Movies");
        } 

        const data = await response.json();
        return data.results;
        } 
        catch(error) {
        console.log(error);
    }
}

async function getUpcoming() {
    try {   
        const response = await fetch(`${baseURL}/movie/upcoming?api_key=${apiKey}`);
        
        
        if(!response.ok) {
          throw new Error("Failed to fetch Upcoming Movies");
        } 
        const data = await response.json();
        return data.results;
    } 
    catch(error) {
        console.log(error);
    }
}

async function getGenres() {
    try {
        const response = await fetch(`${baseURL}/genre/movie/list?api_key=${apiKey}`);
        
        if(!response.ok) {
          throw new Error("Failed to fetch Genres");
        } 
        const data = await response.json();
        return data.genres;
    } 
    catch(error) {
        console.log(error);
    }
}

async function discoverMovies(sortBy,genreId, year, language) {
    let url = '';
   
    if (genreId) {
        url += '&with_genre=' + genreId;

    }
     
    if(year) {
        url += '&year=' + year;

    }

    if(language) {
        url += '&with_original_language=' + language;
    }
    try {
        
        const response = await fetch(`${baseURL}/discover/movie?api_key=${apiKey}&sort_by=${sortBy}${url}`);


        if(!response.ok) {
            throw new Error ("Failed to add optional filter");
        }
        const data = await response.json();
        return data.results;
    } 
    catch (error) {
        console.log(error);
    }
    
}

export {getTrending, getUpcoming, getTopRated, getGenres, discoverMovies};