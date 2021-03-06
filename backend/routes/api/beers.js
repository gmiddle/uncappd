const express = require('express');
const asyncHandler = require('express-async-handler');
const { User, Beer, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// AWS integration?

const router = express.Router();

const validateBeer = [
    check("name")
        .exists({checkFalsy: true})
        .withMessage("Please enter beer name"),
    check('description')
        .exists({checkFalsy: false})
        .withMessage('Please enter a description'),
    // check("abv")
    //     // .exists({checkFalsy: true})
    //     // .withMessage("Please enter an ABV Percentage Between 0.0 and 9.9")
    //     .isFloat({
    //         min: 0,
    //         max: 9.9
    //     })
    //     .withMessage('ABV must be between 0.0 and 9.9'),
    // TODO add API routes for IBU and breweryId's
    // check("IBU")
    // check("breweryId") 
    handleValidationErrors
];

router.get('/', asyncHandler(async (req,res) => {
    const beers = await Beer.findAll({
        include: Review,
        order: [["createdAt", "DESC"]]
        //TODO - fix order of beers page
    });
    res.json(beers)
}))

router.get('/:id', asyncHandler(async (req,res) => {
    // console.log('------------------------<<<<>>>>>>>>----------------------------' )
    const beerId = req.params.id

    const userId = 12;

    const beerToLoad = await Beer.findByPk(beerId, {
        include: 
            {model: Review, include: {model: User}}
    });
    // console.log ('-------beerToLoad from backend route', beerToLoad)
    res.json(beerToLoad)
}))

// models.products.findAll({
//     include: [
//       {model: models.comments, include: [models.comments.users] }
//     ]
//   })



const fileExists = (req, res, next) => {
    if (!req.file) req.file = undefined;
    next();
}

router.post('/',
    fileExists,
    // AWS integration?
    // validateBeer,
    asyncHandler(async (req,res) => {
        const { name, description, abv, ibu, beerImg } = req.body;
        // console.log("this is the name and desc---------", name, description)
        // AWS integration?
        const newBeer = await Beer.create({
            name,
            beerImg,
            description,
            abv,
            ibu
        });
        // const newBeer = await Beer.create(req.body);
        res.json(newBeer)
    })
)

// TODO router.get for top 10

module.exports = router;