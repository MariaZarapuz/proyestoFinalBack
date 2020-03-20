const router = require("express").Router();

const apiUserRouter = require('./api/users');
const apiHousesRouter = require('./api/houses');

router.use('/users', apiUserRouter);

router.use('/houses', apiHousesRouter)



module.exports = router
