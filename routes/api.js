const router = require("express").Router();

const apiUserRouter = require('./api/users');
const apiHousesRouter = require('./api/houses');
const apiContactsRouter = require('./api/contacts');


router.use('/users', apiUserRouter);
router.use('/houses', apiHousesRouter)
router.use('/contacts', apiContactsRouter)



module.exports = router