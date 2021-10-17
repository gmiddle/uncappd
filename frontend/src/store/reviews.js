import { csrfFetch } from './csrf'

const SET_MY_REVIEWS = 'reviews/setMyReviews';
const SET_ALL_REVIEWS = 'reviews/setAllReviews';
const REMOVE_MY_REVIEWS = 'reviews/removeMyReviews';
const POST_REVIEW = 'reviews/postReview';
const DELETE_REVIEW = 'reviews/deleteReview'
const EDIT_REVIEW = 'reviews/editReview'


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

const deleteReview = (reviewToDestroy) => ({
    type: DELETE_REVIEW,
    reviewToDestroy
})

const editReview = (reviewToEdit) => ({
type: EDIT_REVIEW,
reviewToEdit
})

export const removeMyReviews = () => ({
    type: REMOVE_MY_REVIEWS
})

export const getMyReviews = () => async dispatch => {
    const response = await csrfFetch('/api/reviews');
    if (response.ok) {
      const reviews = await response.json();
      dispatch(setMyReviews(reviews));
    }
}

export const getAllReviews = () => async dispatch => {
const response = await csrfFetch('/api/reviews/all');
if (response.ok) {
    const allReviews = await response.json();
    dispatch(setAllReviews(allReviews));
}
}

export const createReview = (newReview) => async dispatch => {
    const { userId, beerId, review, rating } = newReview;
    // console.log('-------------------BEFORE FETCH', review)
    const response = await csrfFetch('/api/reviews', {
      method: 'POST',
      body: JSON.stringify({
        rating,
        review,
        userId,
        beerId,
        
      })
    });
    
    if (response.ok) {
      const createdReview = await response.json();
      dispatch(postReview(createdReview));
    }
    // console.log('------------------- AFTER FETCH', review)
    return response;
}

export const destroyReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews`, {
      method: 'DELETE',
      body: JSON.stringify({
        reviewId
      })
    });
    
    if (response.ok) {
      const reviewToDestroy = await response.json();
      dispatch(deleteReview(reviewToDestroy));
    }
    return response;
}
  
export const updateReview = (reviewObj) => async dispatch => {
    const {reviewId, beerId, rating, review} = reviewObj;
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        body: JSON.stringify({
        beerId, 
        rating, 
        review
        })
    });

    if (response.ok) {
        const updatedReview = await response.json();
        dispatch(editReview(updatedReview));
        return response;
    }
}

const initialState = {
    allReviews: [],
    myReviews: []
};


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
        case POST_REVIEW:
            const newReview = action.reviewToEdit;
            newState.singleBeer.Reviews.unshift(newReview);
            return newState;
        case DELETE_REVIEW:
            // console.log('--------this is the BEFORE newState', newState)
            // const newMyReviews = newState['myReviews'].filter(review => review.id !== action.reviewToDestroy.id)
            // newState['myReviews'] = newMyReviews
            const destroyedReviewIdx = newState.singleBeer.Reviews.findIndex(review => review.id === action.reviewToDestroy.id)
            delete newState.singleBeer.Reviews[destroyedReviewIdx]
            // console.log('--------this is state AFTER delete', newState)
            //
            return newState;
        case EDIT_REVIEW:
            const editedReview = action.reviewToEdit;
            const reviewIdx = newState.singleBeer.Reviews.findIndex(review => review.id === editedReview.id)
            newState.singleBeer.Reviews[reviewIdx] = editedReview;
            return newState;
        default:
            return state;
    }
}

export default reviewsReducer;