import ReviewForm from './ReviewForm';
import ReviewButton from '../ReviewButton';
import { Modal } from '../../context/Modal';
import { useBeerSelected } from '../../context/BeerSelected';
import './ReviewForm.css';

const ReviewFormModal = () => {
  const { setBeerSelected, setCurrentBeer, showReviewModal, setShowReviewModal } = useBeerSelected();

  if (showReviewModal === true) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';

  }

  const onOpen = (e) => {
    e.preventDefault();
    setShowReviewModal(true);
  };

  const onClose = (e) => {
    e.preventDefault();
    setBeerSelected(false);
    setCurrentBeer({});
    setShowReviewModal(false);
  };

  return (
    <>
      <ReviewButton onOpen={onOpen}/>
      {showReviewModal && (
        <Modal onClose={onClose}>
          <ReviewForm onClose={onClose} />
        </Modal>
      )}
    </>
  )
}

export default ReviewFormModal;