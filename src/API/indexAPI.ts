import axios from "axios";

export const API_KEY = "cb16c889cb26730cf04918e138034c54"
export const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
})

export const filmsAPI = {
    getPopular() {
        return instance.get(`movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
    },
    getSearchedFilms(text:string) {
        return instance.get(`/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${text}`)
    }
}


