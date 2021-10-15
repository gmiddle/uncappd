import { csrfFetch } from './csrf'

const SET_MY_REVIEWS = 'reviews/setMyReviews';
const SET_ALL_REVIEWS = 'reviews/setAllReviews';
const REMOVE_MY_REVIEWS = 'reviews/removeMyReviews';
const POST_REVIEW = 'reviews/postReview';
// TODO - edit review
// TODO - POST review
// TODO - DELETE review

const setMyReviews = (myReviews) => ({
    type: SET_MY_REVIEWS,
    myReviews
})
  
  const setAllReviews = (allReviews) => ({
    type: SET_ALL_REVIEWS,
    allReviews
})

const postReview = (newReview) => ({
    type: POST_REVIEW,
    newReview
})

export const removeMyReviews = () => ({
    type: REMOVE_MY_REVIEWS
})

export const getMyReviews = () => async dispatch => {
    const response = await fetch('/api/reviews');
    if (response.ok) {
      const reviews = await response.json();
      dispatch(setMyReviews(reviews));
    }
}

export const getAllReviews = () => async dispatch => {
const response = await fetch('/api/reviews/all');
if (response.ok) {
    const allReviews = await response.json();
    dispatch(setAllReviews(allReviews));
}
}

export const createReview = (newReview) => async dispatch => {
    const { beerId, review, rating } = newReview;
    const response = await csrfFetch('/api/reviews', {
      method: 'POST',
      body: JSON.stringify({
        beerId,
        review,
        rating,
      })
    });
    
    if (response.ok) {
      const createdReview = await response.json();
      dispatch(postReview(createdReview));
    }
    return response;
}

const initialState = {
    allReviews: [],
    myReviews: []
};

// TODO - edit review
// TODO - POST review
// TODO - DELETE review

const reviewsReducer = (state = initialState, action) => {
   Object.freeze(state)
   
   const newState = {...state}

   switch (action.type) {
        case SET_MY_REVIEWS:
            newState['myReviews'] = action.myReviews;
            return newState;
        case SET_ALL_REVIEWS:
            newState['allReviews'] = action.allReviews;
            return newState;
        case REMOVE_MY_REVIEWS:
            newState['myReviews'] = [];
        return newState;
        case SET_ALL_REVIEWS:
            newState['allReviews'] = action.allReviews;
            return newState;
        // TODO - edit review
        // TODO - POST review
        // TODO - DELETE review
        default:
            return state;
   }
}

export default reviewsReducer;