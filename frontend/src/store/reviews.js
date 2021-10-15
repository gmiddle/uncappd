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

export const destroyReview = (reviewId) => async dispatch => {
    const response = await fetch(`/api/reviews`, {
      method: 'DELETE',
      body: JSON.stringify({
        reviewId
      })
    });
    
    if (response.ok) {
      const reviewToDelete = await response.json();
      dispatch(deleteReview(reviewToDelete));
    }
    return response;
}
  
export const updateReview = (reviewObj) => async dispatch => {
    const {reviewId, editBeerId, rating, review} = reviewObj;
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        body: JSON.stringify({
        beerId: editBeerId, 
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
            newState['myReviews'] = [action.newReview, ...newState['myReviews']];
            newState['allReviews'] = [action.newReview, ...newState['allReviews']];
            return newState;
        case DELETE_REVIEW:
            const newMyReviews = newState['myReviews'].filter(review => review.id !== action.reviewToDestroy.id)
            const newAllReviews = newState['allReviews'].filter(review => review.id !== action.reviewToDestroy.id)
            newState['myReviews'] = newMyReviews;
            newState['allReviews'] = newAllReviews;
            return newState;
        case EDIT_REVIEW:
            const editedReview = action.reviewToEdit;
            // update that review in myReviews:
            const myReviewIdx = newState['myReviews'].findIndex(review => review.id === editedReview.id)
            newState.myReviews[myReviewIdx] = editedReview;
            // update that review in allReviews:
            const allReviewIdx = newState['allReviews'].findIndex(review => review.id === editedReview.id)
            newState.allReviews[allReviewIdx] = editedReview;
            return newState;
        default:
            return state;
    }
}

export default reviewsReducer;