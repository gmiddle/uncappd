import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import Navigation from "../Navigation";
import { useHistory } from "react-router";
import { fetchBeers } from "../../store/beers";
import { useEffect } from "react";
import './BeersPage.css';
import BeerCard from "../BeerCard";

const BeersPage = ({ beer }) => {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const beers = useSelector(state => state.beers.beerList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBeers());
    }, [dispatch])

    const beersArray = Object.values(beers);
    const sortedBeers = beersArray.sort((a, b) => a.id < b.id ? 1 : -1)

    // console.log("this is the session user ---------------", sessionUser)

    if (sessionUser === undefined) {
        history.push("/");
        return null
    }

    const newBeer = () => {
        history.push("/new-beer")
    }

    return (
        <>
            <div className="beers-main" />
            {/* <Navigation isLoaded={isLoaded} /> */}
            <h1 className="beers-title" id="beers-main">Beers List</h1>
            <div className="beers-feed-container">
                <div id="beers-upper"></div>
                <div className="beers-divider"></div>
                <div onClick={newBeer} className="new-beer-card">
                    <div className="plus-icon">+</div>
                </div>
                {sortedBeers.map(beer => (
                    <Link key={beer.id} to={`/beers/${beer.id}`}>
                        <div className="beers-divider"></div>
                        <BeerCard key={beer.id} beer={beer} />
                    </Link>
                ))}
            </div>
            
        </>
    )
}

export default BeersPage;