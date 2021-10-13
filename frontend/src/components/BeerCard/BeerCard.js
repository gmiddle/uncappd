import { useEffect, useRef } from 'react';
import { useBeerSelected } from '../../context/BeerSelected';

import "./BeerCard.css";

const BeerCard = ({ beer }) => {
    const beerImgRef = useRef();
    const { setBeerSelected } = useBeerSelected();

    useEffect(() => {
        beerImgRef.current.style.backgroundImage
    })

    // const showForm = () => {
    //     setBeerSelected(true);
    //     return    
    // }

    return (
        <div className="beerCard-container">
            <div ref={beerImgRef} classNmae="beerCard-img"></div>
            <div className="beerCard-divider"></div>
            <div className="beerCard-content"></div>
                <h1 className="beerCard-title">{beer.name}</h1>
                <p className="beerCard-description">{beer.description}</p>
                <div className="beerCard-info">
                    <p className="beerCard-info beerCard-rating-avg">Rating: ${avgRating ? `${avgRating}/5` : 'N/A'}</p>
                    <p className="beerCard-info beerCard-rating-total">Total Ratings: TBC</p>
                    <p className="beerCard-info beerCard-abv">ABV %: TBC</p>
                </div>
        </div>
        // <img>
        
        // </img>
    )

}

export default BeerCard