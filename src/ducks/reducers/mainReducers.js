import * as types from '../actions/actionTypes';

const initialState = {
    movies: [],
    countMovies: 0,
    categories : [],
}

const sortSpecial = (data) => {
    const sorted = [];
    data.forEach(elt => {
      const idx = sorted.findIndex(x => x === elt.category);
      if (idx < 0) sorted.push(elt.category);
    });
    return sorted;
}

const sortByCategories = (data, tableCat) => {
    const sorted = [];
    if(tableCat.length === 0) return data;
    data.forEach(elt => {
        if(tableCat.includes(elt.category)) sorted.push(elt);
    });

    return sorted;
}

const mainReducer = (state = initialState, action) => {
    let movies = [...state.movies];
    let categories = [];
    switch (action.type) {
        case types.GETMOVIES : 
            return {
                ...state,
                movies: action.data.movies,
                countMovies: action.data.movies.length,
            }
        case types.DELETEMOVIES : 
            movies.splice(action.data.id, 1);
            categories = sortSpecial([...movies]);
            return {
                ...state,
                movies,
                categories,
                countMovies: movies.length,
            }
        case types.LIKE : 
            movies[action.data.id].likes += 1;
            return {
                ...state,
                movies
            }
        case types.DISLIKE : 
            movies[action.data.id].dislikes += 1;
            return {
                ...state,
                movies
            }
        case types.GET_CATEGORIE : 
            categories = sortSpecial([...movies]);
            return {
                ...state,
                categories
            }
        case types.GET_MOVIES_BY_CATEGORIE : 
            movies = sortByCategories(action.data.result, action.data.tableCat);
            return {
                ...state,
                movies,
                countMovies: movies.length,
            }
        default:
            return{
                ...state,
            }
    }
}

export default mainReducer;