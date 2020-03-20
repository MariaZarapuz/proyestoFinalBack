const router = require('express').Router();

const apiHousesRouter = require('./api/houses');

router.use('/houses', apiHousesRouter)


module.exports = router;