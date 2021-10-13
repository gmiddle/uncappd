import { csrfFetch as fetch } from "./csrf";

const SET_BEERS = `beers/setBeers`;
// const SET_TOP_10 = `beers/setTop10`;
// const POST_BEER = `beers/postBeer`;

const setBeers = (beers) => ({
    type: SET_BEERS,
    beers
})

// const setTop10Beers = (top10Beers) => ({
//     type: SET_TOP_10,
//     top10Beers
// })

// const postBeer = (beer) => ({
//     type: POST_BEER,
//     beer
// })

export const fetchBeers = () => async dispatch => {
    const response = await fetch(`/api/beers`);

    if(response.ok) {
        const beers = await response.json();
        dispatch(setBeers(beers))
    }
    return response;
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
        
        default:
            return state;
    }
}

export default beersReducer;
