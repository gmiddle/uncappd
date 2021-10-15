import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { destroyReview, getMyReviews, getAllReviews, updateReview } from '../../store/reviews';
import { fetchTop10 } from '../../store/beers';
import './ReviewCard.css'

const ReviewCard = ({ review }) => {
  const profilePicRef = useRef();
  const beerPicRef = useRef();
  const iconRef = useRef();
  const canRef = useRef();
  const currentUser = useSelector(state => state.session.user.user);
  const dispatch = useDispatch();
  const [beingEdited, setBeingEdited] = useState(false);
  const [editBeerId, setEditBeerId] = useState(review.Beer?.id);
  const [editRating, setEditRating] = useState(review.rating);
  const [editReview, setEditReview] = useState(review.review);


  const beers = useSelector(state => state.beers.beerList);
  const beersArr = Object.values(beers);

  const reviewUser = review?.User;
  const reviewBeer = review?.Beer;
  const reviewDateLongString = review?.createdAt;
  const reviewDate = new Date(reviewDateLongString);
  const reviewDateFormatted = reviewDate.toLocaleString();
  
  const updateDateLongString = review?.updatedAt;
  const updateDate = new Date(updateDateLongString);
  const updateDateFormatted = updateDate.toLocaleString();

  const ownedCard = currentUser?.id === reviewUser?.id

  useEffect(() => {
    const profilePicDiv = profilePicRef.current;
    const beerPicDiv = beerPicRef.current;
    // profilePicDiv.style.backgroundImage = `url(${reviewUser?.profilePicture})`
    // beerPicDiv.style.backgroundImage = `url(${reviewBeer?.beerImageUrl})`
  });

  const deleteReview = (e) => {
    dispatch(destroyReview(review.id))
      .then(() => dispatch(getMyReviews()))
      .then(() => dispatch(getAllReviews()))
      .then(() => dispatch(fetchTop10()));
  }

  const onEdit = (e) => {
    e.preventDefault();
    const editedReview = {
      reviewId: review.id,
      editBeerId,
      rating: editRating,
      review: editReview
    };

    dispatch(updateReview(editedReview))
      .then(() => dispatch(getMyReviews()))
      .then(() => dispatch(getAllReviews()))
      .then(() => setBeingEdited(false))
      .then(() => dispatch(fetchTop10()));
  }

  if (beingEdited) {
    return (
      <div className="reviewCard-container">
        <form onSubmit={onEdit}>
          {review && (<div className="reviewCard-header">
            <div ref={profilePicRef} className="reviewCard-profile-pic"></div>
            <div className="reviewCard-title-container">
              <h2 className="reviewCard-title inline-block"><span className="reviewCard-user-name">{reviewUser?.firstname} {reviewUser?.lastname}</span> is drinking a</h2>
              {/* First form element change - beers */}
              <label htmlFor="beerId" hidden></label>
              <select 
                className="review-input-field edit-beers"
                name="beerId"
                value={editBeerId}
                onChange={(e) => setEditBeerId(e.target.value)}
              >
                <option value="" disabled>--Select Beer--</option>
                {beersArr.map(beer => (
                  <option key={beer.id} value={beer.id}>{beer.name}</option>
                ))}
              </select>
              <p className="reviewCard-rating"><span className="reviewCard-user-name">{reviewUser?.firstname}</span> rated it a</p>
              {/* Second form element change - rating */}
              <label htmlFor="rating" hidden></label>
              <select 
                className="review-input-field edit-rating"
                name="rating"
                value={editRating}
                onChange={(e) => setEditRating(e.target.value)}
              >
                <option value="" disabled>--Rating--</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div ref={beerPicRef} className="reviewCard-beer-pic"></div>
          </div>)}
          {/* Third form elem review */}
          <label htmlFor="review" hidden></label>
            <textarea 
              className="edit-review-field"
              name="review"
              value={editReview}
              onChange={(e) => setEditReview(e.target.value)}
            />
          <p className="reviewCard-time">{reviewDateFormatted}</p>
          <p className="edit-review-button" onClick={() => setBeingEdited(false)}>cancel</p>
          <span ref={iconRef} className="hidden material-icons beer-icon"></span>
          <img ref={canRef} className="hidden can-img beer-icon" src="https://img.icons8.com/material/50/000000/beer-can--v2.png" alt=""/>
          <button className="edit-submit">confirm</button>
          <p className="delete-review-button" onClick={deleteReview}>delete</p>
        </form>
    </div>
    )
  }

  return (
    <>
      <div className="reviewCard-container">
        {review && (<div className="reviewCard-header">
          {/* <div ref={profilePicRef} className="reviewCard-profile-pic"></div> */}
          <div className="reviewCard-title-container">
            <h2 className="reviewCard-title">
              {/* <Link id="user-profile-link" to={`/users/${reviewUser?.id}`} className="reviewCard-user-name">
                {reviewUser?.firstname} {reviewUser?.lastname}
              </Link> is drinking a {reviewBeer?.name} */}
            </h2>
            {/* <p className="reviewCard-rating"><span className="reviewCard-user-name">{reviewUser?.firstname}</span> rated it a {review?.rating}/5!</p> */}
          </div>
          <div ref={beerPicRef} className="reviewCard-beer-pic"></div>
        </div>)}

        <div className="reviewCard-review-container">
          <p className="reviewCard-review">{review?.review}</p>
        </div>
        <p className="reviewCard-time">{reviewDateFormatted}</p>
        {reviewDateFormatted !== updateDateFormatted && <p className="reviewCard-updated-time">(Edited: {updateDateFormatted})</p>}
        {ownedCard && (
          <p className="edit-review-button" onClick={() => {
            setEditBeerId(review.Beer.id)
            setBeingEdited(true)
          }}>edit</p>
        )}
        <span ref={iconRef} className="material-icons beer-icon"></span>
        <img ref={canRef} className="hidden can-img beer-icon" src="https://img.icons8.com/material/50/000000/beer-can--v2.png" alt=""/>
      </div>
    </>
  )
}

export default ReviewCard;
