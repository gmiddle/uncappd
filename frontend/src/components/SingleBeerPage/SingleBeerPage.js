import { useDispatch, useSelector } from "react-redux";
// import Navigation from "../Navigation";
import { useHistory, useParams } from "react-router-dom";
import { fetchOneBeer } from "../../store/beers";
import { getAllReviews, destroyReview, updateReview, createReview } from "../../store/reviews";
import { useEffect, useState } from "react";
import './SingleBeerPage.css';
import {ReviewFormModal} from '../ReviewFormModal'



const SingleBeerPage = ({ beer }) => {
    const history = useHistory();
    const sessionUser = useSelector(state => state?.session?.user);
    const beers = useSelector(state => state?.beers);
    const { id } = useParams();
    const singleBeer = useSelector(state => state?.beers?.singleBeer);
    const dispatch = useDispatch();
    const [updateClicked, setUpdateClicked] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [reviewId, setReviewId] = useState('');
    const [rating, setRating] = useState('');
    const [count, setCount] = useState(1);
    const [count2, setCount2] = useState(1);
    const [addReviewClick, setAddReviewClick ] = useState(false)

    useEffect(() => {
        dispatch(fetchOneBeer(id));
        return dispatch(fetchOneBeer(id))
    }, [dispatch, count, count2])

    // useEffect(() => {
    //     dispatch(fetchOneBeer(id));
    //     return dispatch(fetchOneBeer(id))
    // }, [dispatch, count2])

    // console.log('-----this is the single beer from SingleBeerPage Component', singleBeer)

    // const reviewsArray = Object.values(singleBeer.Reviews)
    // console.log('---------------this is the reviews array from SingleBeerPage Component', singleBeer.Reviews)


    // console.log("this is the session user ---------------", sessionUser)

    if (sessionUser === undefined) {
        history.push("/");
        return null
    }

    // const newBeer = () => {
    //     history.push("/new-beer")
    // }

    const addReviewHandler = (e) => {
        e.preventDefault()
        setCount(prev => prev + 1)
        const newReviewObj = {
            rating,
            review: reviewText,
            userId: sessionUser.id,
            beerId: id, 
        }
        dispatch(createReview(newReviewObj))
        dispatch(getAllReviews(id))
        setAddReviewClick(false)
    }

    const handleDeleteClick = (reviewId) => {
        setCount2(prev => prev + 1)
        return dispatch(destroyReview(reviewId))
    }

    const reviewUpdateHandler = (e) => {
        e.preventDefault()
        setCount(prev => prev + 1)
        const updatedReviewObj = {
            reviewId,
            beerId: id, 
            rating, 
            review: reviewText
        }
        dispatch(updateReview(updatedReviewObj))
        dispatch(getAllReviews(id))
        setUpdateClicked(false)
    }

    // make sure dispatch is connected with db

    return (
        <>
            <div>HELLO FROM SINGLE BEER PAGE</div>
            <div className="single-beer-main" />
            <div className="single-beer-container">
                <div id="single-beer-upper"></div>
                <h1 className="single-beer-title" id="single-beer-main">{singleBeer?.name}</h1>
                <div className="single-beer-description">Description: {singleBeer?.description}</div>
                <div className="single-beer-abv">ABV: {singleBeer?.abv}%</div>
                <div className="single-beer-ibu">IBUs: {singleBeer?.ibu}</div>
                <div className="reviews-container">
                    <div>
                    <button
                        className="review-buttons add-review-button"
                        onClick={() => setAddReviewClick(true)}
                    >Add A Review</button>
                    {(addReviewClick) ? 
                                (<div>
                                    <form className="add-review-form" onSubmit={addReviewHandler}>
                                        <select 
                                            className="review-input-field rating-select"
                                            name="rating"
                                            value={rating}
                                            onChange={(e) => setRating(e.target.value)}
                                        >
                                            <option value="" disabled>--Rating--</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                        <textarea
                                        className="review-input-field review-textarea" 
                                        type="text"
                                        onChange={(e) => {
                                            setReviewText(e.target.value)
                                            // setReviewId(review.id)
                                        }}
                                        value={reviewText}
                                        placeholder="Write your review here"
                                        name="review"
                                        />
                                        
                                        <button type="submit">Submit Review</button>
                                    </form>
                                </div>) : null}
                    </div>
                    
                    {singleBeer?.Reviews?.map(review => (
                        <li className="li-main">
                            <span>
                                {review?.User?.username}: 
                            </span>
                            <div className="displayed-rating-container">
                                <span>Rating: {` `}</span>
                                <span>{review?.rating}</span>
                            </div>
                            <p>
                                {review?.review}
                            </p>
                            {(sessionUser?.id === review?.User?.id) ? 
                            (<div className="review-buttons-container">
                                <button
                                    className="review-buttons update-review-button"
                                    onClick={() => setUpdateClicked(true)}
                                >Update Review</button>
                                <button
                                    className="review-buttons delete-review-button"
                                    onClick={() => handleDeleteClick(review.id)}
                                >Delete Review</button>
                                {(updateClicked) ? 
                                (<div>
                                    <form className="update-review-form" onSubmit={reviewUpdateHandler}>
                                        <select 
                                            className="review-input-field rating-select"
                                            name="rating"
                                            value={rating}
                                            onChange={(e) => setRating(e.target.value)}
                                        >
                                            <option value="" disabled>--Rating--</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                        <textarea
                                        className="review-input-field review-textarea" 
                                        type="text"
                                        onChange={(e) => {
                                            setReviewText(e.target.value)
                                            setReviewId(review.id)
                                            
                                        }}
                                        value={reviewText}
                                        placeholder="Please make your update here"
                                        name="review"
                                        />
                                        
                                        <button type="submit">Submit Update</button>
                                    </form>
                                </div>) : null}
                            </div>) : null
                            }
                        </li>
                    ))} 

                </div>
            </div>
            
        </>
    )
}




export default SingleBeerPage;