import * as types from './actionTypes';


import {movies$} from '../../containers/movies/movies'

export const getMovies = () => {

    return dispatch => {
        movies$.then(res => {
            dispatch(getMoviesSuccess(res))
            dispatch(getCategories(res))
        });
    }
}

const getMoviesSuccess = (movies) => {
    return {
        type: types.GETMOVIES,
        data: {
            movies: movies,
        }
    }
}
export const deleteMovies = (id) =>{
    return {
        type: types.DELETEMOVIES,
        data: {
            id: id,
        }
    }
}
export const addLikeMovies = (id) =>{
    return {
        type: types.LIKE,
        data: {
            id: id,
        }
    }
}
export const moveLikeMovies = (id) =>{
    return {
        type: types.DISLIKE,
        data: {
            id: id,
        }
    }
}
export const getCategories = () =>{
    return {
        type: types.GET_CATEGORIE,
    }
}

export const getMoviesByCategories = (tableCat) =>{
    return dispatch => {
        movies$.then(res => {
            dispatch(getMoviesByCategoriesSuccess(res, tableCat))
        });
    }
}

export const getMoviesByCategoriesSuccess = (result, tableCat) =>{
    return {
        type: types.GET_MOVIES_BY_CATEGORIE,
        data: {
            result: result,
            tableCat: tableCat,
        }

    }
}