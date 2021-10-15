import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createReview, getMyReviews, getAllReviews } from '../../store/reviews';
import { fetchBeers, fetchTop10 } from '../../store/beers';
import { useBeerSelected } from '../../context/BeerSelected';
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

        const review = {
            beerId: currentBeer.id,
            review,
            rating
        }

        if ( rating < 0 || rating > 5 ) {
            setReviewErrors([...reviewErrors, 'Your Rating Must Be Between 0 and 5'])
            return
        }

        dispatch(createReview(review))
            // .then(() => dispatch(getMyReviews()))
            .then(() => setShowReviewModal(false))
            .then(() => setBeerSelected(false))
            .then(() => dispatch(fetchBeers()))
            .then(() => setCurrentBeer({}))
            // .then(() => dispatch(getAllReviews()))
            // .then(() => dispatch(fetchTop10()))
            .catch(async (res) => {
                const data = await res.join();
                if(data && data.errors) {
                    setReviewErrors(data.errors)
                    return;
                }
            })   
        
    }

    return(
        <>
        <div className="review-container">
            <h1 className="review-title">Review</h1>
        </div>   
        </>
    )
}

export default ReviewForm;