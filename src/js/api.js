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

export {getTrending, getUpcoming, getTopRated, getGenres};