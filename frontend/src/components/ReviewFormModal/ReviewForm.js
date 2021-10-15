import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createReview, getMyReviews, getAllReviews } from '../../store/reviews';
import { fetchBeers, fetchTop10 } from '../../store/beers';
import { useBeerSelected } from '../../context/BeerSelected';
import ReviewSearch from './ReviewSearch';
import './ReviewForm.css'

const ReviewForm = ({ onClose }) => {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState('');
    const [reviewErrors, setReviewErrors] = useState([]);
    const { beerSelected, setBeerSelected, currentBeer, setCurrentBeer, setShowReviewModal } = useBeerSelected();
    // TODO - Image adding?

    //TODO - useEffect for images?

    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault();

        const reviewObj = {
            beerId: currentBeer.id,
            review,
            rating
        }

        if ( rating < 0 || rating > 5 ) {
            setReviewErrors([...reviewErrors, 'Your Rating Must Be Between 0 and 5'])
            return
        }

        dispatch(createReview(reviewObj))
            .then(() => dispatch(getMyReviews()))
            .then(() => setShowReviewModal(false))
            .then(() => setBeerSelected(false))
            .then(() => dispatch(fetchBeers()))
            .then(() => setCurrentBeer({}))
            .then(() => dispatch(getAllReviews()))
            // .then(() => dispatch(fetchTop10()))
            .catch(async (res) => {
                const data = await res.json();
                if(data && data.errors) {
                    setReviewErrors(data.errors)
                    return;
                }
            })   
        
    }

    return (
        <>
        <div className="review-container">
          <h1 className="review-title">Review</h1>
          <div className="review-divider"></div>
          {beerSelected ? (
            <>
              <div className="drink-header">
                {/* <div ref={imageRef} className="review-drink-image"/> */}
                <div className="review-beer-name-container">
                  <h2 className="review-beer-name">{currentBeer?.name}</h2>
                </div>
              </div>
              <form onSubmit={onSubmit} className="review-form">
                <ul>
                  {reviewErrors.map(error => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
                <label htmlFor="review"></label>
                <textarea 
                  className="form-row review-input-field review-field"
                  name="review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Would you like to leave a review?"
                />
                <div className="form-row rating-serving-row">
                  <label htmlFor="rating" hidden></label>
                  <select 
                    className="review-input-field serving-style"
                    name="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="" disabled>--Rating--</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div className="form-row review-submit-row">
                  <button className="review-submit-button">Submit Review</button>
                  {/* <span ref={iconRef} className="material-icons" id="beer-icon"></span>
                  <img ref={canRef} className="hidden can-img" id="beer-icon" style={{height: '30px', width: '30px'}} src="https://img.icons8.com/material/50/000000/beer-can--v2.png" alt=""/> */}
                </div>
              </form>
            </>
          )
          : <ReviewSearch setCurrentBeer={setCurrentBeer} setBeerSelected={setBeerSelected}/>}
        </div>
          
        </>
    )
}

export default ReviewForm;