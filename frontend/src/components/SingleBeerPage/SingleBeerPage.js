import { useDispatch, useSelector } from "react-redux";
// import Navigation from "../Navigation";
import { useHistory, useParams } from "react-router-dom";
import { fetchOneBeer } from "../../store/beers";
import { useEffect } from "react";
import './SingleBeerPage.css';
import BeerCard from "../BeerCard";


const SingleBeerPage = ({ beer }) => {
    const history = useHistory();
    const sessionUser = useSelector(state => state?.session?.user);
    const beers = useSelector(state => state?.beers);
    const { id } = useParams();
    const singleBeer = useSelector(state => state?.beers?.singleBeer);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchOneBeer(id));
    }, [dispatch])

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

    const handleUpdateClick = () => {
        // dispatch update
        // dispatch get all reviews
    }
    const handleDeleteClick = () => {
        // dispatch delete
        // dispatch get all reviews
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
                                    onClick={handleUpdateClick}
                                >Update Review</button>
                                <button
                                    onClick={handleDeleteClick}
                                >Delete Review</button>
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