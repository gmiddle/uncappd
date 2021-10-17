import { csrfFetch } from "./csrf";

const SET_BEERS = `beers/setBeers`;
const SET_TOP_10 = `beers/setTop10`;
const POST_BEER = `beers/postBeer`;
const GET_ONE_BEER = `beers/getOneBeer`;

const setBeers = (beers) => ({
    type: SET_BEERS,
    beers
})

const setTop10Beers = (top10Beers) => ({
    type: SET_TOP_10,
    top10Beers
})

const postBeer = (beer) => ({
    type: POST_BEER,
    beer
})

const getOneBeer = (beer) => ({
    type: GET_ONE_BEER,
    beer
})

export const fetchBeers = () => async dispatch => {
    // console.log('---------INSIDE FETCH BEERS ROUTE')
    const response = await csrfFetch(`/api/beers`);

    if(response.ok) {
        const beers = await response.json();
        dispatch(setBeers(beers))
    }
    return response;
}

export const fetchOneBeer = (id) => async dispatch => {
    // console.log('---------INSIDE FETCH ONE ROUTE')
    const response = await csrfFetch(`/api/beers/${id}`)
    // const beer = await response.json()
    if(response.ok) {
        const beer = await response.json();
        // console.log('-------- this is the BEER from STORE', beer)
        dispatch(getOneBeer(beer))
    }
    return response;
}

export const createBeer = (beer) => async dispatch => {
    const { name, description, beerImg, abv, ibu, breweryId } = beer;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description)
    formData.append('abv', abv)
    formData.append('ibu', ibu)

    if (beerImg) formData.append('image', beerImg)
    // TODO - breweryId dropdown on form?
    const response = await csrfFetch('api/beers', {
        method: 'POST',
        headers: {
            // "Content-Type":"multipart/form-data"
            "Content-Type":"application/json"
        },
        // body: formData
        body: JSON.stringify(beer)
    })

    if(response.ok) {
        const newBeer = await response.json()
        dispatch(postBeer(newBeer))
    }
}

const initialState = {};

const beersReducer = (state = initialState, action) => {
    Object.freeze(state);

    const newState = { ...state }

    switch (action.type) {
        case SET_BEERS:
            const normalizedState = {};
            action.beers.forEach((beer) => normalizedState[beer.id] = beer)
            newState['beerList'] = normalizedState;
            return newState;
        case POST_BEER:
            const newBeer = action.beer;
            newState.beerList[newBeer.id] = newBeer;
            return newState
        // case SET_TOP_10:
        case GET_ONE_BEER:
            newState.singleBeer = action.beer
            console.log('---... newState.singleBeer from getOneBeer Reducer', newState.singleBeer)
            console.log('---... this is the newState from getOneBeer Reducer', newState)
            return newState        
        default:
            return state;
    }
}



export default beersReducer;
