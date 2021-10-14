const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
// const asyncHandler = require('express-async-handler');
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
const beersRouter = require('./beers');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});
router.use('/beers', beersRouter);

// // TEST route - setup
// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
// });

// // TEST route - GET /api/set-token-cookie
// router.get('/set-token-cookie', asyncHandler(async (req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       },
//     })
//   setTokenCookie(res, user);
//   return res.json({ user });
// }));

// // TEST route - GET /api/restore-user
// const { restoreUser } = require('../../utils/auth.js');
// router.get(
//   '/restore-user',
//   restoreUser,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// // TEST route - GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );


module.exports = router;