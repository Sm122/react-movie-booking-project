
import { put , takeLatest, all } from 'redux-saga/effects';


const API_KEY = "41fdcc8f626c2582cb4c690e91588abc";
const baseURL = "https://api.themoviedb.org/3";

const requestObject = {
    fetchTrending: `${baseURL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchTopRated: `${baseURL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchPopular: `${baseURL}/movie/popular?api_key=${API_KEY}&language=en-US`,

}


function* getTrendingMovies() {
    const records = yield fetch(requestObject.fetchTrending).then(response => response.json());
    yield put({ type: "TRENDING_MOVIES_RECEIVED", movies: records })
}

function* getTopRatedMovies() {
    const records = yield fetch(requestObject.fetchTopRated).then(response => response.json());
    yield put({ type: "TOP_RATED_MOVIES_RECEIVED", movies: records })
}

function* getPopular() {
    const records = yield fetch(requestObject.fetchPopular).then(response => response.json());
    yield put({ type: "POPULAR_MOVIES_RECEIVED", movies: records })
}

function* searchMovies(obj) {
    const apiUrl = `${baseURL}/search/movie?api_key=${API_KEY}=${obj.payload}&language=en-US&sort_by=popularity.desc&include_adult=false`;
    const records = yield fetch(apiUrl).then(response => response.json());
    yield put({ type: "SEARCHED_MOVIES_RECEIVED", movies: records })
}

function* actionWatcher() {
    yield takeLatest('GET_TRENDING_MOVIES', getTrendingMovies)
    yield takeLatest('GET_TOP_RATED_MOVIES', getTopRatedMovies)
    yield takeLatest('GET_POPULAR_MOVIES', getPopular)
    yield takeLatest('SEARCH_MOVIES', searchMovies)

}


export default function* rootSaga() {
    yield all([actionWatcher()])
}