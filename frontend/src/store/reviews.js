import { csrfFetch } from './csrf'

const POST_REVIEW = 'reviews/postReview';
// TODO - edit review
// TODO - POST review
// TODO - DELETE review

const postReview = (newReview) => ({
    type: POST_REVIEW,
    newReview
})

// export const getMyReviews = () => async dispatch => {
//     const response = await fetch('/api/reviews');
//     if (response.ok) {
//       const reviews = await response.json();
//       dispatch(setMyReviews(reviews));
//     }
// }

// export const getAllReviews = () => async dispatch => {
// const response = await fetch('/api/reviews/all');
// if (response.ok) {
//     const allReviews = await response.json();
//     dispatch(setAllReviews(allReviews));
// }
// }

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

// TODO - edit review
// TODO - POST review
// TODO - DELETE review

const reviewsReducer = (state = initialState, action) => {
   Object.freeze(state)
   
   const newState = {...state}

   switch (action.type) {
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