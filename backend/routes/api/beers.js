const express = require('express');
const asyncHandler = require('express-async-handler');
const { Beer, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// AWS integration?

const router = express.router();

const validateBeer = [
    check("name")
        .exists({checkFalsy: true})
        .withMessage("Please enter beer name"),
    check('description')
        .exists({checkFalsy: true})
        .withMessage('Please enter a description'),
    check("abv")
        .exists({checkFalsy: true})
        .withMessage("Please enter an ABV Percentage Between 0.0 and 9.9")
        .isFloat({
            min: 0,
            max: 9.9
        })
        .withMessage('ABV must be between 0.0 and 9.9'),
    // TODO add API routes for IBU and breweryId's
    // check("IBU")
    // check("breweryId")
    handleValidationErrors
];

router.post('/',
    fileExists,
    // AWS integration?
    validateBeer,
    asyncHandler(async (req,res) => {
        const { name, description, abv, ibu, beerImg } = req.body;
        // AWS integration?
        const newBeer = Beer.create({
            name,
            beerImg,
            description,
            abv,
            ibu
        });
        res.json(newBeer)
    })
)

module.exports = router;