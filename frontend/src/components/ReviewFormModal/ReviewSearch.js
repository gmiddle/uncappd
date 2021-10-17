import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './ReviewForm.css';


const ReviewSearch = ({ setCurrentBeer, setBeerSelected }) => {
  const classRef = useRef();
  const [ searchVal, setSearchVal ] = useState('');
  const beers = useSelector(state => state.beers.beerList);
  const beersArr = Object.values(beers);

  const sortedBeersArr = beersArr.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
  
  const matches = () => {
    const inputLength = searchVal.length;
    const matches = [];

    if (inputLength === 0) return sortedBeersArr;

    sortedBeersArr.forEach(beer => {
      const beerSegment = beer.name.slice(0, inputLength);
      if (beerSegment.toLowerCase() === searchVal.toLowerCase()) {
        matches.push(beer);
      }
    });

    return matches;
  }

  const showResults = () => {
    const resultsList = classRef.current;
    resultsList.classList.remove("hidden");
  }

  const showForm = (e) => {
    setBeerSelected(true);
    const beer = beersArr.find(beer => beer.name === e.target.innerText);
    setCurrentBeer(beer);
  }

  return (
    <>
      <label htmlFor="search" hidden></label>
      <input 
        className="review-search"
        placeholder="Search for a brew"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        onFocus={showResults}
      />
      <div className="results-container">
        <ul 
          ref={classRef} 
          className="hidden"
        >
          {matches().length ? matches().map(beer => (
            <div 
              className="beer-result-container" 
              key={beer.id} 
              
            >
              <img className="beer-result-image" src={beer.beerImageUrl} alt="" />
              <div onClick={showForm} className="beer-result-name-container">
                <li className="beer-result-name">{beer.name}</li>
              </div>
            </div>
          )) : (
            <li className="no-match">Don't see the brew you are looking for? <Link to="/new-beer">Create one here</Link></li>
          )
        }
        </ul>
      </div>
    </>
  )
}

export default ReviewSearch;