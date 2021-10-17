import { useSelector } from "react-redux";
import { useRef } from "react";
import './ReviewButton.css'

const ReviewButton = ({ onOpen }) => {
  const sessionUser = useSelector(state => state.session.user);
  const sessionExists = !(JSON.stringify(sessionUser) === '{}');
  const modalButtonRef = useRef();

  const pathToBeers = window.location.pathname === '/beers';

  return (
    <>
      {(sessionExists && !pathToBeers) && (
        <button 
          ref={modalButtonRef}
          onClick={onOpen}
          className="review-button" 
        //   TODO src="/images/review-button.png" 
          alt="Add A Review" 
        >Add A Review</button>
      )}
    </>
  )
}

export default ReviewButton;