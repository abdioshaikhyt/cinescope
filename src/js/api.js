import { apiKey, baseURL } from "./config.js";

async function getTrending() {
    try {   
        const response = await fetch(`${baseURL}/trending/movie/week?api_key=${apiKey}`);
        
        if(response.ok) {
            const data = await response.json();
            return data.results;
        }
    } catch(error) {
        console.log(error);
    }
}

async function getTopRated() {
    try {   
        const response = await fetch(`${baseURL}/movie/top_rated/?api_key=${apiKey}`);
        
        if(response.ok) {
            const data = await response.json();
            return data.results;
        }
    } catch(error) {
        console.log(error); 
    }
}

async function getUpcoming() {
    try {   
        const response = await fetch(`${baseURL}/movie/upcoming/?api_key=${apiKey}`);
        
        if(response.ok) {
            const data = await response.json();
            return data.results;
        }
    } catch(error) {
        console.log(error);
    }
}

export {getTrending, getUpcoming, getTopRated};