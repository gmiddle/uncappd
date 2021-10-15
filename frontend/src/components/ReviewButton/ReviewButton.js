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
        <img 
          ref={modalButtonRef}
          onClick={onOpen}
          className="review-button" 
        //   src="/images/review-button.png" 
          alt="plus symbol for creating a review" 
        />
      )}
    </>
  )
}

export default ReviewButton;