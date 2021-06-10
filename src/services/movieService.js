import http from './httpService';
import { apiUrl } from '../config.json';


const apiEndpoint = apiUrl + '/movies';

export function getMovies(){
   return http.get(apiEndpoint);
}
function movieUrl(id){
    return `${apiEndpoint}/${id}`;
}


export function getMovie(movieId){
    return http.get(movieUrl(movieId));
}

 
 export function saveMovie(movie){
     if(movie._id){
         const body = {...movie};
         delete body._id;
         return http.put(movieUrl(movie._id), body); 
     }

     return http.post(apiEndpoint, movie);


 }

export function deleteMovie(movieId){
    return http.delete(movieUrl(movieId));
}