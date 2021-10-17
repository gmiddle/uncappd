const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')
const { Review, User, Beer } = require('../../db/models')
const { restoreUser } = require('../../utils/auth');
const router = express.Router();

router.use(restoreUser);

router.get('/', asyncHandler( async (req, res) => {
    const {user} = req

    if (user) {
        const currentUserReviews = await Review.findAll({
            where: { userId: user.id },
            include: [ User, Beer ]
        })
        res.json(currentUserReviews)
    } else {
        res.json({});
    }
}));

router.get('/all', asyncHandler(async (req, res) => {
    const allReviews = await Review.findAll({
        include: [User, Beer],
        order: [['createdAt', 'DESC']]
    })
    res.json(allReviews);
}))

const validateReview = [
    check('beerId')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a beerId"),
    check('rating')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a rating")
        .isFloat({
            min:0,
            max: 5
        })
        .withMessage("Rating must be between 0 and 5"),
        handleValidationErrors
]

router.post('/', validateReview, asyncHandler (async (req, res) => {
    const { userId, beerId, rating, review } = req.body;

    const reviewed = await Review.create({
        userId,
        beerId,
        rating,
        review
    });

    if (!reviewed) {
        const error = new Error('Posting of Review Failed');
        error.status = 401;
        error.title = 'Posting of Review Failed'
        error.errors = ['Something went wrong - Posting of Review Failed']
    }

    res.json(reviewed);
}))

router.put('/:id', validateReview, asyncHandler (async (req, res) => {
    console.log('--------------------------UPDATE PUT ROUTE WAS HIT')
    const { beerId, rating, review } = req.body;
    const reviewId = req.params.id;
    console.log('--------------------------', beerId)
    console.log('--------------------------', rating)
    console.log('--------------------------', review)
    const reviewToEdit = await (Review.findByPk(reviewId))
    
    const updatedReview = await reviewToEdit.update({
        beerId,
        rating,
        review
    })
    console.log('--------------------------updatedReview', updatedReview)
    res.json(reviewToEdit);
}));

router.delete('/', asyncHandler (async (req, res) => {
    const {reviewId} = req.body;
    const reviewToDestroy = await Review.findByPk(reviewId);

    await reviewToDestroy.destroy()

    res.json({reviewToDestroy});
}))

module.exports = router;