import { useDispatch, useSelector } from "react-redux";
// import Navigation from "../Navigation";
import { useHistory, useParams } from "react-router-dom";
import { fetchOneBeer } from "../../store/beers";
import { getAllReviews, destroyReview, updateReview } from "../../store/reviews";
import { useEffect, useState } from "react";
import './SingleBeerPage.css';



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

    useEffect(() => {
        dispatch(fetchOneBeer(id));
        return dispatch(fetchOneBeer(id))
    }, [dispatch, count])

    useEffect(() => {
        dispatch(fetchOneBeer(id));
        return dispatch(fetchOneBeer(id))
    }, [dispatch, count2])

    // console.log('-----this is the single beer from SingleBeerPage Component', singleBeer)

    // const reviewsArray = Object.values(singleBeer.Reviews)
    // console.log('---------------this is the reviews array from SingleBeerPage Component', reviewsArray)


    // console.log("this is the session user ---------------", sessionUser)

    if (sessionUser === undefined) {
        history.push("/");
        return null
    }

    const newBeer = () => {
        history.push("/new-beer")
    }


    const handleDeleteClick = (reviewId) => {
        setCount2(prev => prev + 1)
        return dispatch(destroyReview(reviewId))
        // dispatch(getAllReviews(id))
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
                <div>Description: {singleBeer?.description}</div>
                <div>ABV: {singleBeer?.abv}%</div>
                <div>IBUs: {singleBeer?.ibu}</div>
                <div className="reviews-container">
                    {singleBeer?.Reviews?.map(review => (
                        // <div>{review.review}</div>
                        <li>
                            <span>
                                {review?.User?.username}: 
                            </span>
                            <p>
                                {review?.review}
                            </p>
                            {(sessionUser?.id === review?.User?.id) ? 
                            (<div>
                                <button
                                    onClick={() => setUpdateClicked(true)}
                                >Update Review</button>
                                <button
                                    onClick={() => handleDeleteClick(review.id)}
                                >Delete Review</button>
                                {(updateClicked) ? 
                                (<div>
                                    <form onSubmit={reviewUpdateHandler}>
                                        <select 
                                            className="review-input-field rating-beer"
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