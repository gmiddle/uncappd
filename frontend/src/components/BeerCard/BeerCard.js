// import { useEffect, useRef } from 'react';
// import { useBeerSelected } from '../../context/BeerSelected';
import "./BeerCard.css";

const BeerCard = ({ beer }) => {
    // const beerImgRef = useRef();
    // const { setBeerSelected, setCurrentBeer, setShowReviewModal } = useBeerSelected();
    // console.log('---------this is the id', id)
    // TODO AVG RATING
    let avgRating;
    const ratingsArray = [];
    if (beer.Reviews.length) {
        beer.Reviews.forEach(review => ratingsArray.push(Number(review.rating)));
        if (beer.Reviews.length > 0) {
          avgRating = (ratingsArray.reduce((a, b) => (a + b)) / ratingsArray.length).toFixed(2);
        } else {
          avgRating = 0;
        }
    }

    // useEffect(() => {
    //     beerImgRef.current.style.backgroundImage = `url(${beer.beerImg})`
    // })

    return (
        <div className="beerCard-container">
            {/* <div ref={beerImgRef} className="beerCard-img">BEER IMAGE GOES HERE</div> */}
            {/* <div className="beerCard-divider"></div> */}
            <div className="beerCard-content"></div>
                <h1 className="beerCard-title">{beer.name}</h1>
                <p className="beerCard-description">{beer.description}</p>
                <div className="beerCard-info">
                    <p className="beerCard-info beerCard-rating-avg">Rating: {beer?.Reviews?.length ? `${avgRating}/5` : 'TBD'}</p>
                    {/* <p className="beerCard-info beerCard-rating-total">Total Ratings: TBD</p> */}
                    <p className="beerCard-info beerCard-abv">ABV %: {beer.abv}</p>
                </div>
        </div>
        // <img>
        // TODO - img tag in beerCard component
        // </img>
    )

}

export default BeerCard;